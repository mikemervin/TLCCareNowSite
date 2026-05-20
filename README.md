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

## Notes

- Images are loaded from the original Wix CDN for visual fidelity. For production, download assets into `public/` and update `src/lib/images.ts`.
- The contact form is UI-only; wire it to your email/API service when ready.
