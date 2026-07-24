# Wetzel MC — Next.js Rebuild

Rebuild of [wetzelmc.com](https://www.wetzelmc.com) on Next.js 16 (App Router, TypeScript, Tailwind v4) with Contentful as the CMS, deployed on Vercel.

See **`../wetzelmc-site-rebuild-plan.md`** for the full plan: architecture, Contentful content model, migration steps, and launch checklist.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

The site runs without a CMS connected — CMS-driven sections (news, events, flyers, FAQ) show placeholder notices until Contentful is set up.

## Connect Contentful

Content managed in the CMS: **Events** (calendar), **Posts** (news), **Flyers**, and **FAQ Items**.

1. Log in to Contentful (club account) and create an empty space, e.g. "Wetzelland".
2. Grab two values:
   - **Space ID**: Settings → General settings
   - **Management token**: Settings → API keys → Content management tokens → Generate personal token (starts with `CFPAT-`; used once by the setup script — don't commit or share it)
3. Run the setup script (creates all four content types + a delivery API key; add `-- --seed` to also load the 2026 sample events):

   ```bash
   CONTENTFUL_SPACE_ID=xxx CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx npm run setup:contentful -- --seed
   ```

4. The script prints `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` — copy them into `.env.local` (see `.env.example`) and later into Vercel's environment variables.
5. Restart `npm run dev` — published entries appear on the site.
6. Invite club members in Contentful as **Editors** (they manage content; they never need API keys).

## Instant publishing (production)

Pages statically regenerate hourly. For instant updates when an editor hits Publish, add a Contentful webhook (Settings → Webhooks) pointing to:

```
https://<your-domain>/api/revalidate?secret=<CONTENTFUL_REVALIDATE_SECRET>
```

triggered on Entry publish/unpublish, and set the same secret in Vercel's environment variables.

## Deploy

Push to GitHub → import the repo on vercel.com → add the four env vars → deploy. Then point wetzelmc.com DNS at Vercel.

## Static assets still to add

- `/public/site-map.jpg` — grounds site-map image (shown on `/directions`)
- `/public/vendor-forms.pdf` — vendor forms PDF (linked from `/contact`)
- Hero/background photography, logo, and past flyer images (upload flyers to Contentful)
