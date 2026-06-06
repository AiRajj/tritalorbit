# Hosting TRITAL Orbit™ at `orbit.tritalcare.com`

Path: **GitHub → Vercel → Cloudflare DNS**.
Apex `www.tritalcare.com` stays where it is. Orbit lives at the `orbit.` subdomain and points at this repo (`AiRajj/tritalorbit`), not the existing `AiRajj/TRITAL-Care` repo.

Time: ~15 minutes if you have the Postgres URL ready. SSL is automatic.

---

## 0. Prerequisites

- GitHub: write access to `AiRajj/tritalorbit` (you already have it).
- Vercel: account with one of your two teams (`trital_team` recommended for a clean Orbit project).
- Cloudflare: DNS authority over `tritalcare.com` (assumed since you said Cloudflare).
- Postgres database. Fastest option: a Neon (https://neon.tech) or Vercel Postgres free tier — takes 60 seconds. You can also use Supabase or RDS.

You'll need three secrets:
- `DATABASE_URL` — Postgres connection string
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- (optional) `OPENAI_API_KEY`, `RESEND_API_KEY`, `STRIPE_SECRET_KEY` — Orbit gracefully falls back to mock responses when missing

---

## 1. Import the repo into Vercel

1. Go to https://vercel.com/new.
2. Select team **trital_team** (or `ranjitrajet-1454's projects` if you want it next to the existing `trital-care` project).
3. Import **`AiRajj/tritalorbit`**.
4. Project name: `trital-orbit` (this becomes part of the default `*.vercel.app` URL).
5. Framework preset: **Next.js** (auto-detected).
6. Root directory: `.` (default).
7. **Build Command** — change from default to:
   ```
   prisma migrate deploy && next build
   ```
   This applies the Mobility Exchange migration (`20260601000000_mobility_exchange`) to the deploy database before building. Without this, every Prisma query 500s on first request because the new tables don't exist yet.
8. **Install Command**, **Output Directory**: leave defaults.

Don't click Deploy yet — env vars go in first.

---

## 2. Environment variables

In the Vercel import screen (or Settings → Environment Variables afterward), add the following. Apply to **Production**, **Preview**, and **Development**.

| Variable | Required | Value |
|---|---|---|
| `DATABASE_URL` | yes | Your Postgres URL (Neon: `postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`) |
| `NEXTAUTH_SECRET` | yes | Output of `openssl rand -base64 32` (treat as a secret) |
| `NEXTAUTH_URL` | yes (prod) | `https://orbit.tritalcare.com` for Production. **Omit for Preview** — NextAuth picks up `VERCEL_URL` automatically per branch. |
| `NEXT_PUBLIC_APP_URL` | recommended | Same as `NEXTAUTH_URL` for Production. |
| `OPENAI_API_KEY` | optional | Real AI when set; mock responses when empty. |
| `RESEND_API_KEY` | optional | Only used by password-reset email today. |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | optional | Billing isn't wired end-to-end yet (next session). |
| Mobility integration keys | optional | `AMADEUS_API_KEY`, `DUFFEL_API_KEY`, `BOOKING_API_KEY`, `EXPEDIA_RAPID_API_KEY`, `GOOGLE_MAPS_API_KEY`. Orbit falls back to mock vendor bids when missing — fine for launch. |

Click **Deploy**. First build takes ~2–3 minutes. You'll get a URL like `https://trital-orbit-xyz.vercel.app`. Open it and confirm the marketing pages render.

---

## 3. (Once) Seed the database

After the first successful deploy, seed the demo data so the dashboards have something to show:

```bash
# locally, against the same DATABASE_URL
DATABASE_URL="<your prod url>" npm run prisma:seed
```

This creates seven demo accounts (`admin@tritalorbit.com` / `Orbit123!`, etc.) plus the Module 12 Mobility Exchange demo: one open-for-bids full-relocation request with 5 vendor bids and one accepted housing booking.

Skip if you're going straight to real users; do it now for an investor-ready demo.

---

## 4. Attach `orbit.tritalcare.com` to the project

In Vercel: **Project → Settings → Domains → Add**.

1. Enter `orbit.tritalcare.com`. Click **Add**.
2. Vercel shows the DNS record you need to create. There are two formats it may suggest:
   - **CNAME (preferred for subdomains):** name `orbit`, value `cname.vercel-dns.com`
   - **A record:** name `orbit`, value `76.76.21.21` (Vercel's anycast IP)

Use the CNAME — cleaner, lets Vercel re-balance automatically.

---

## 5. Cloudflare DNS — add the record

In Cloudflare → **`tritalcare.com` → DNS → Records → Add record**:

| Field | Value |
|---|---|
| Type | `CNAME` |
| Name | `orbit` |
| Target | `cname.vercel-dns.com` |
| Proxy status | **DNS only (gray cloud)** — NOT proxied |
| TTL | Auto |

**Important:** keep the proxy **OFF** (gray cloud). Vercel handles its own edge + SSL. Routing through Cloudflare's proxy on top causes double-edge weirdness and Let's Encrypt issuance can fail. If you want Cloudflare features later (WAF, page rules, caching for static assets), add them at the Vercel level instead, or set up a Cloudflare Worker pointing at Vercel — but for go-live, gray cloud.

Save the record.

---

## 6. Wait for SSL

Back in Vercel → Domains. You'll see:
- "Pending verification" → resolves in <60 seconds once Cloudflare propagates.
- "Issuing certificate" → 1–3 minutes via Let's Encrypt.
- "Valid configuration" with a green checkmark when it's live.

Test:
```bash
curl -I https://orbit.tritalcare.com
# expect: HTTP/2 200, content-type: text/html
```

---

## 7. Lock in `NEXTAUTH_URL`

Now that the canonical URL is `https://orbit.tritalcare.com`:

1. Vercel → Settings → Environment Variables.
2. Make sure `NEXTAUTH_URL` for Production is exactly `https://orbit.tritalcare.com` (no trailing slash).
3. Redeploy from the Deployments tab → ⋯ → **Redeploy**.

If you skip this, NextAuth callbacks will try `https://trital-orbit-xyz.vercel.app` and the OAuth/login redirects will break under the custom domain.

---

## 8. Wire automatic deploys from this PR's branch (already on by default)

Once the project is connected to GitHub, Vercel auto-deploys on every push:

- **Production** ← `main` branch (after PR #5 merges).
- **Preview** ← every other branch, including `claude/elegant-lovelace-wZz1x`. Each preview gets its own `*.vercel.app` URL and a check comment on PR #5.

So the moment PR #5 merges to `main`, the production build of `https://orbit.tritalcare.com` updates itself. Subsequent module work (Wallet, Rewards, etc.) ships the same way: branch → PR → preview URL → merge → live.

---

## 9. Cloudflare-as-proxy (later, if you want it)

If you want Cloudflare's WAF / bot protection / global cache in front of Vercel, do it after launch:

1. Cloudflare DNS → flip the `orbit` record to **Proxied (orange cloud)**.
2. Cloudflare → SSL/TLS → mode: **Full (strict)**. Don't use Flexible — it sends HTTPS-to-HTTP between Cloudflare and Vercel and breaks NextAuth secure cookies.
3. Cloudflare → Rules → Page Rules: cache `/_next/static/*` aggressively (already cache-immutable from Next.js side, just lets Cloudflare serve it from edge).
4. Disable Cloudflare's "Rocket Loader" and "Auto Minify" for this hostname — they break React hydration.

Validate Let's Encrypt cert is still issuing at Vercel. If it stops, flip back to gray cloud, wait for issuance, then flip back to orange.

---

## 10. Domain rollback / disaster

If something breaks and you need to point `orbit.tritalcare.com` somewhere else fast:

1. Cloudflare DNS → edit the `orbit` CNAME → point at the fallback host (or change to a maintenance page CNAME).
2. Lower TTL beforehand if you want faster propagation (set to 60 seconds before launch, raise back to Auto once stable).

You can also keep a paused Vercel project on the side as a hot rollback — Vercel's "Promote to Production" makes any prior deployment live in seconds.

---

## Quick reference

| What | Where |
|---|---|
| Repo | https://github.com/AiRajj/tritalorbit |
| Active PR | https://github.com/AiRajj/tritalorbit/pull/5 |
| Vercel project | https://vercel.com/trital_team/trital-orbit *(after step 1)* |
| Production URL | https://orbit.tritalcare.com |
| Default Vercel URL | https://trital-orbit-*.vercel.app |
| Demo accounts | See `README.md` § Seed Credentials |
| Mobility Exchange landing | `/mobility-exchange` |
| Admin mobility monitor | `/admin/mobility-exchange` |
