# Cloudflare Workers Setup Guide

Step-by-step instructions to deploy mascoprint-web on Cloudflare using `@opennextjs/cloudflare`.

---

## Prerequisites

- A Cloudflare account (free): https://dash.cloudflare.com/sign-up
- Your domain (mascoprint.co.uk) added to Cloudflare as a zone
- A Resend API key: https://resend.com/api-keys
- A Turnstile widget: https://dash.cloudflare.com → Turnstile

---

## Step 1: Install dependencies locally

```bash
npm install
```

This pulls in `@opennextjs/cloudflare` and `wrangler` which are now in devDependencies.

---

## Step 2: Create the Workers project

### Option A: Deploy via CLI (quickest)

```bash
npm run build:cloudflare   # runs next build + bundles for Cloudflare Workers
npm run deploy             # deploys to Cloudflare Workers via wrangler
```

Wrangler will prompt you to log in on first use (`wrangler login`).

### Option B: Connect via Git (CI/CD)

1. Go to **Cloudflare Dashboard → Workers & Pages → Create**
2. Click **Connect to Git** and select your GitHub/GitLab repo
3. Configure the build:
   - **Build command:** `npm run build:cloudflare`
   - **Deploy command:** `npm run deploy`
4. Click **Save and Deploy**

Alternatively, add a GitHub Action — see the `opennextjs/cloudflare` docs for a template.

> **Important:** Use `build:cloudflare`, not `build`. The `opennextjs-cloudflare` CLI
> internally calls `npm run build` (which runs `next build`), then bundles the output
> for Workers. Using `build` directly avoids an infinite recursion.

---

## Step 3: Set environment variables

Go to **Cloudflare Dashboard → Workers & Pages → mascoprint-web → Settings → Variables and Secrets**.

Add the following:

| Variable                          | Value                                 | Type       |
|-----------------------------------|---------------------------------------|------------|
| `RESEND_API_KEY`                  | `re_xxxxxxxx` (from Resend dashboard) | Secret     |
| `CONTACT_EMAIL_TO`                | `office@mascoprint.co.uk`             | Plain text |
| `TURNSTILE_SECRET_KEY`            | Your Turnstile secret key             | Secret     |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`  | Your Turnstile site key               | Plain text |
| `NEXT_PUBLIC_SITE_URL`            | `https://mascoprint.co.uk`            | Plain text |
| `NEXT_PUBLIC_GA_ID`               | `G-XXXXXXXXXX` (if using analytics)   | Plain text |
| `NODE_VERSION`                    | `20`                                  | Plain text |

> **Note:** `NEXT_PUBLIC_*` variables are baked in at build time. After changing them, trigger a new deployment.

---

## Step 4: Set up custom domain

1. Go to **Workers & Pages → mascoprint-web → Settings → Domains & Routes**
2. Click **Add → Custom domain**
3. Enter `mascoprint.co.uk`
4. Cloudflare will automatically configure DNS (CNAME record)
5. Repeat for `www.mascoprint.co.uk` if desired
6. SSL is automatic — no configuration needed

---

## Step 5: Configure rate limiting (replaces in-memory rate limiter)

The in-memory rate limiter has been removed since it doesn't work on edge workers.
Use Cloudflare's built-in rate limiting instead:

1. Go to **Cloudflare Dashboard → mascoprint.co.uk → Security → WAF**
2. Click **Rate limiting rules → Create rule**
3. Configure:
   - **Rule name:** `Contact form rate limit`
   - **If incoming requests match:** URI Path equals `/api/contact`
   - **Rate:** 5 requests per 1 hour
   - **With the same:** IP address
   - **Then take action:** Block (with 429 response)
4. Click **Deploy**

This gives you rate limiting at the network edge — more effective than application-level limiting.

---

## Step 6: Set up redirects (optional — for WordPress migration)

The Next.js redirects in `next.config.mjs` will work as-is. However, for better performance
you can also add them as Cloudflare redirect rules (they execute at the edge before hitting
your Worker):

1. Go to **Rules → Redirect Rules**
2. Add bulk redirects for the WordPress paths (`/wp-admin`, `/wp-login.php`, etc.)

This is optional — the Next.js redirects already handle everything.

---

## Step 7: Verify deployment

After deployment:

1. Visit your Workers URL (e.g. `mascoprint-web.<your-subdomain>.workers.dev`) to check the site loads
2. Test the contact form — check that emails arrive
3. Once verified, point your custom domain

---

## Local development

```bash
npm run dev          # Standard Next.js dev server
npm run preview      # Preview with Wrangler (simulates Cloudflare Workers locally)
```

For local development, use Cloudflare's Turnstile test keys in `.env.local`:
```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

---

## Notes

- **Images:** `next/image` optimisation is disabled (`unoptimized: true` in next.config.mjs)
  since the `sharp` library doesn't run on Cloudflare's edge runtime. Images are served as-is.
  If you need on-the-fly image resizing, enable Cloudflare Image Resizing (requires a paid plan)
  or pre-optimise images at build time.

- **Docker files:** The existing `Dockerfile` and `docker-compose.yml` are no longer needed
  for Cloudflare deployment. You can keep them if you want a Docker option as a fallback,
  or remove them to simplify the repo.

- **Build output:** `@opennextjs/cloudflare` outputs to `.open-next/`. This directory is
  in `.gitignore`.
