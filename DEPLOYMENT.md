# Deployment Guide

## Required environment variables

Set these in your hosting provider:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`

Optional production integrations:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `RESEND_API_KEY`
- `RESEND_FROM`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Database

TRITAL Orbit is configured for PostgreSQL through Prisma.

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## Build

```bash
npm run build
npm run start
```

## Security checklist

- Use a long random `NEXTAUTH_SECRET`.
- Restrict database network access to the application runtime.
- Configure HTTPS-only cookies at the platform edge.
- Store all API keys in encrypted environment variable storage.
- Review `/privacy` and `/terms` with counsel before production launch.
- Connect Stripe webhooks before charging subscriptions.
- Connect Resend before enabling password reset email delivery.

## Operational notes

If PostgreSQL or OpenAI credentials are missing, the UI remains usable with professional fallback states. This is intentional for demos and investor review, but production launch should configure all required services.
