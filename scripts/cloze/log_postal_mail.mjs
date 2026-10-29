#!/usr/bin/env node
// Log mailed cards/letters as Postal Mail communications in Cloze.
// Usage:
//   node log_postal_mail.mjs --date 2026-10-29 --subject "Handwritten El Niño card" \
//     [--body "Mailed a handwritten ..."] [--dry-run] dougfaunt@gmail.com "Diane Espana" ...
// Recipients are emails or full names. A name has to resolve to exactly one Cloze person,
// or the script stops before it writes anything.
//
// Env (required):
//   CLOZE_API_KEY       Cloze API key (the same one the Cloudflare Workers use)
//   CLOZE_USER          Cloze account email (patrick@realtor510.com)
//   CLOZE_POSTAL_STYLE  the exact `style` value Cloze's API uses for postal mail, copied from
//                       https://api.cloze.com/api-docs. There is no default on purpose: if the
//                       style is wrong, the record gets logged as some other type.
//
// Run with --dry-run first. It resolves every recipient and prints each payload without posting.
// Run it for real on one contact, check that contact's timeline in Cloze, then run the rest.

const API = "https://api.cloze.com/v1";
const FROM = "patrick@realtor510.com";

function parseArgs(argv) {
  const opts = { recipients: [], dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--date") opts.date = argv[++i];
    else if (a === "--subject") opts.subject = argv[++i];
    else if (a === "--body") opts.body = argv[++i];
    else if (a === "--dry-run") opts.dryRun = true;
    else if (a.startsWith("--")) throw new Error(`Unknown flag ${a}`);
    else opts.recipients.push(a);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(opts.date || "")) throw new Error("--date YYYY-MM-DD is required");
  if (!opts.subject) throw new Error("--subject is required");
  if (!opts.recipients.length) throw new Error("Give at least one recipient email or name");
  opts.body ??= opts.subject;
  return opts;
}

function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set (see header of this script)`);
  return v;
}

async function cloze(method, path, { query = {}, body } = {}) {
  const url = new URL(API + path);
  url.searchParams.set("user", env("CLOZE_USER"));
  url.searchParams.set("api_key", env("CLOZE_API_KEY"));
  for (const [k, v] of Object.entries(query)) url.searchParams.set(k, v);
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  // Cloze reports most failures as HTTP 200 with a non-zero errorcode.
  if (!res.ok || (json.errorcode && json.errorcode !== 0)) {
    throw new Error(`${method} ${path} failed: HTTP ${res.status} ${JSON.stringify(json)}`);
  }
  return json;
}

async function resolve(recipient) {
  const isEmail = recipient.includes("@");
  const { people = [] } = await cloze("GET", "/people/find", { query: { freeformquery: recipient } });
  const matches = people.filter((p) => {
    if (isEmail) return (p.emails || []).some((e) => e.value?.toLowerCase() === recipient.toLowerCase());
    return p.name?.toLowerCase() === recipient.toLowerCase();
  });
  if (matches.length !== 1) {
    throw new Error(`"${recipient}" matched ${matches.length} Cloze people; need exactly 1. ` +
      `New contacts sync to Brevo/Mailchimp, so this script never creates them.`);
  }
  const p = matches[0];
  const email = isEmail ? recipient : p.emails?.[0]?.value;
  if (!email) throw new Error(`"${recipient}" has no email in Cloze to address the record to`);
  return { name: p.name, email };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const style = env("CLOZE_POSTAL_STYLE");
  env("CLOZE_API_KEY");
  env("CLOZE_USER");

  // Resolve everyone up front so a typo stops the run before anything is written.
  const people = [];
  for (const r of opts.recipients) people.push(await resolve(r));

  for (const p of people) {
    const payload = {
      style,
      // Midday Pacific (20:00Z) so the record stays on the same calendar day whether or not DST is on.
      date: `${opts.date}T20:00:00.000Z`,
      from: FROM,
      recipients: [{ value: p.email, name: p.name }],
      subject: opts.subject,
      body: opts.body,
      bodytype: "text",
      // Stable id per card/person/day, so Cloze can match a re-run to the record it already has
      // (check that on the first live run before trusting it).
      uniqueid: `postal:${opts.date}:${p.email.toLowerCase()}:${opts.subject}`,
    };
    if (opts.dryRun) {
      console.log(`[dry-run] ${p.name} <${p.email}>\n${JSON.stringify(payload, null, 2)}`);
      continue;
    }
    await cloze("POST", "/timeline/communication/create", { body: payload });
    console.log(`logged  ${p.name} <${p.email}>`);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
