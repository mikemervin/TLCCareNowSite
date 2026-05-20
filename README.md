# TLC CareNow Site

A Next.js recreation of [tlccarenow.com](https://www.tlccarenow.com/).

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage (hero, features carousel, blog preview, contact) |
| `/campus-care` | TeamLife Campus Care |
| `/book-carenow` | Book / app CTA |
| `/blog` | Blog listing |
| `/blog/depression-in-elderly-people` | Sample blog post |
| `/contact` | Contact form |
| `/about` | About TLC CareNow |

## Contact form email

Submissions POST to `/api/contact` and are sent with [Resend](https://resend.com) to `info@teamlifecares.com` (or `CONTACT_TO_EMAIL`).

1. Copy `.env.example` to `.env.local`.
2. Create a Resend API key and add `RESEND_API_KEY`.
3. In Resend, verify your domain (e.g. `teamlifecares.com`) and set `CONTACT_FROM_EMAIL` to an address on that domain.
4. In Vercel → Project → Settings → Environment Variables, add the same variables for Production.

Until `RESEND_API_KEY` is set, the form shows a friendly error and suggests emailing directly.
