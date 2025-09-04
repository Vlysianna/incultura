# Incultura — Gamifikasi Budaya Indonesia

This project is a Next.js app (App Router + some /src/pages APIs) implementing a simple gamification flow: users read articles, participate in quizzes, earn coins, and redeem merchandise.

For detailed project analysis and documentation, please see [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md).

Quick setup (local):

1. Install deps

```powershell
npm install
```

2. Set up database (MySQL) and update `.env` `DATABASE_URL`.

3. Run Prisma migrate & seed:

```powershell
npx prisma db push
node prisma/seed.js
```

4. Run dev server:

```powershell
npm run dev
```

Notes:
- Authentication via NextAuth (credentials + Google). For demo pages many calls use `userId=1` as a placeholder. Integrate session user ID where needed.
- TailwindCSS is used for styling. shadcn/ui integration not fully implemented but the layout uses Tailwind classes and cultural color scheme.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
