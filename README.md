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

1. Create a space at contentful.com and add the four content types described in the plan (§4): `post`, `event`, `flyer`, `faqItem`. Field IDs must match those names (camelCase, e.g. `publishDate`, `startDate`, `ticketUrl`).
2. Copy `.env.example` → `.env.local` and fill in the Space ID and Content Delivery API token (Contentful → Settings → API keys).
3. Restart `npm run dev` — published entries appear on the site.

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
