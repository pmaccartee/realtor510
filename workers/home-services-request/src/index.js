// home-services-request — receives Home Services Guide requests from realtor510.com,
// files the lead in Cloze (create or tag existing), and emails Patrick.
// Endpoint: https://home-services-request.maccartee.workers.dev/
// Secrets: CLOZE_USER, CLOZE_API_KEY (same values as ri-cloze-sync).
// Binding: EMAIL (send_email) — same sender domain as ri-cloze-sync.
import { EmailMessage } from "cloudflare:email";

const CLOZE = "https://api.cloze.com/v1";
const TAG = "home-services-guide-request";
const ALLOWED_ORIGINS = ["https://realtor510.com", "https://www.realtor510.com"];
const PREVIEW_ORIGIN = /^https:\/\/[a-z0-9-]+\.realtor510\.pages\.dev$/;

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const okOrigin = ALLOWED_ORIGINS.includes(origin) || PREVIEW_ORIGIN.test(origin);
    const cors = {
      "Access-Control-Allow-Origin": okOrigin ? origin : ALLOWED_ORIGINS[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };
    const reply = (obj, status = 200) =>
      new Response(JSON.stringify(obj), { status, headers: { ...cors, "content-type": "application/json", "cache-control": "no-store" } });

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return reply({ ok: false, error: "POST only" }, 405);
    if (!okOrigin) return reply({ ok: false, error: "origin not allowed" }, 403);

    let d;
    try { d = await request.json(); } catch { return reply({ ok: false, error: "bad json" }, 400); }

    // Honeypot: pretend success so bots move on.
    if (d.website) return reply({ ok: true });

    const clean = (v, n = 300) => String(v || "").replace(/[\r\n]+/g, " ").trim().slice(0, n);
    const lead = {
      delivery: "drop-off",
      name: clean(d.name, 120),
      email: clean(d.email, 200).toLowerCase(),
      phone: clean(d.phone, 40),
      street: clean(d.street, 200),
      city: clean(d.city, 80),
      notes: String(d.notes || "").trim().slice(0, 1000),
      page: clean(d.page, 200),
    };
    if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return reply({ ok: false, error: "name and email required" }, 400);
    if (lead.delivery === "drop-off" && (!lead.street || !lead.city)) return reply({ ok: false, error: "address required for drop-off" }, 400);

    const results = { cloze: null, email: null };
    try { results.cloze = await fileInCloze(env, lead); } catch (e) { results.cloze = { error: e.message }; }
    results.email = await notifyPatrick(env, lead, results.cloze);

    // Success if the lead landed anywhere Patrick will see it.
    const landed = (results.cloze && !results.cloze.error) || (results.email && results.email.sent);
    if (!landed) return reply({ ok: false, error: "could not record request" }, 502);
    return reply({ ok: true });
  },
};

const auth = (env) => `user=${encodeURIComponent(env.CLOZE_USER)}&api_key=${encodeURIComponent(env.CLOZE_API_KEY)}`;

async function fileInCloze(env, lead) {
  if (!env.CLOZE_USER || !env.CLOZE_API_KEY) throw new Error("Cloze secrets not set");
  const tags = [TAG, "website-lead"];
  const note = `Source: realtor510.com ${lead.page || ""} — requested Home Services Guide (${lead.delivery}).` +
    (lead.notes ? ` On their list: ${lead.notes}` : "");

  const find = await fetch(`${CLOZE}/people/find?${auth(env)}&pagesize=10&freeformquery=${encodeURIComponent(lead.email)}`);
  const found = find.ok ? await find.json() : {};
  const hit = (found.people || []).find((p) => (p.emails || []).some((e) => (e.value || "").toLowerCase() === lead.email));

  if (hit) {
    const body = { syncKey: hit.syncKey, tags };
    if (lead.phone && !(hit.phones || []).some((p) => p && p.value)) body.phones = [{ value: lead.phone }];
    const r = await fetch(`${CLOZE}/people/update?${auth(env)}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (j.errorcode !== 0) throw new Error(`update errorcode ${j.errorcode}: ${j.message || ""}`);
    return { action: "updated", syncKey: hit.syncKey };
  }

  const body = { name: lead.name, emails: [{ value: lead.email }], tags, notes: note };
  if (lead.phone) body.phones = [{ value: lead.phone }];
  if (lead.street || lead.city) body.addresses = [{ type: "home", street: lead.street, city: lead.city, state: "CA" }];
  const r = await fetch(`${CLOZE}/people/create?${auth(env)}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (j.errorcode !== 0) throw new Error(`create errorcode ${j.errorcode}: ${j.message || ""}`);
  return { action: "created", syncKey: j.syncKey || (j.person && j.person.syncKey) || null };
}

async function notifyPatrick(env, lead, cloze) {
  const to = env.NOTIFY_TO || "patrick@realtor510.com";
  const from = env.NOTIFY_FROM || "home-services@cc-realtor510.com";
  if (!env.EMAIL) return { sent: false, error: "EMAIL binding missing" };
  const subject = `Home Services Guide request — ${lead.name} (${lead.delivery === "drop-off" ? "DROP-OFF" : "email"})`;
  const text = [
    `${lead.name} wants your Home Services Guide.`,
    "",
    `Delivery: ${lead.delivery === "drop-off" ? "Drop off a printed copy" : "Email it"}`,
    `Email:    ${lead.email}`,
    lead.phone ? `Phone:    ${lead.phone}` : null,
    lead.delivery === "drop-off" ? `Address:  ${lead.street}, ${lead.city}` : null,
    lead.notes ? `\nOn their list: ${lead.notes}` : null,
    "",
    `Page: https://realtor510.com${lead.page || ""}`,
    `Cloze: ${cloze && !cloze.error ? `${cloze.action} and tagged ${TAG}` : `NOT filed (${cloze && cloze.error}) — add manually`}`,
    lead.delivery === "drop-off" ? "\nReminder: log the drop-off in Cloze as Postal Mail when delivered." : null,
  ].filter((l) => l !== null).join("\n");
  const domain = from.split("@")[1];
  const raw = [
    `From: realtor510.com <${from}>`,
    `To: ${to}`,
    `Reply-To: ${lead.email}`,
    `Subject: ${/^[\x20-\x7e]*$/.test(subject) ? subject : `=?UTF-8?B?${btoa(String.fromCharCode(...new TextEncoder().encode(subject)))}?=`}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    text.replace(/\r?\n/g, "\r\n"),
  ].join("\r\n");
  try {
    await env.EMAIL.send(new EmailMessage(from, to, raw));
    return { sent: true };
  } catch (e) {
    return { sent: false, error: e.message };
  }
}
