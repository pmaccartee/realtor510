# home-services-request

Form backend for the Home Services Guide request on
`/blog/el-nino-home-prep-checklist-east-bay/` (and any future page that reuses it).

On submit it: creates or updates the person in Cloze (tags `home-services-guide-request`,
`website-lead`, address for drop-offs) and emails Patrick with Reply-To set to the requester.
If the Worker is down, the page falls back to a pre-filled email to Patrick, so no lead is lost.

## Deploy (one time)
```bash
cd workers/home-services-request
npx wrangler deploy
npx wrangler secret put CLOZE_USER      # same value as ri-cloze-sync
npx wrangler secret put CLOZE_API_KEY   # same value as ri-cloze-sync
```
If `home-services@cc-realtor510.com` isn't an allowed sender, set NOTIFY_FROM to the
address ri-cloze-sync uses (`ri-cloze-sync@cc-realtor510.com`).

## Test
```bash
curl -s -X POST https://home-services-request.maccartee.workers.dev/ \
  -H 'Origin: https://realtor510.com' -H 'Content-Type: application/json' \
  -d '{"delivery":"email","name":"Test Lead","email":"test@example.com","page":"/test"}'
```
Expect `{"ok":true}`, an email to patrick@realtor510.com, and a "Test Lead" in Cloze (delete it after).
