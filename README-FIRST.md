# Rajat & Sneha — Cloudflare Pages Package

This package gives you two ways to publish the same responsive invitation on Cloudflare Pages.

## Option 1 — Fastest: drag and drop

1. Open the Cloudflare dashboard and go to **Workers & Pages**.
2. Choose **Create application → Get started → Drag and drop your files**.
3. Drag the complete `cloudflare-direct-upload` folder into Cloudflare.
4. Enter a project name, such as `rajat-sneha-wedding-2026`, and select **Deploy site**.

Cloudflare will provide a public address ending in `.pages.dev`.

## Option 2 — GitHub with automatic updates

1. Upload the **contents** of `source-code` to the root of your GitHub repository.
2. In Cloudflare Pages, connect that GitHub repository.
3. Use:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
4. Deploy. Every later GitHub update will create a new Cloudflare deployment.

## Important

- A Cloudflare project created through Direct Upload cannot later be converted to Git integration. If you want automatic GitHub deployments, start with Option 2.
- The RSVP form still submits directly to your connected Google Form.
- No environment variables, database, or paid server are required.
- The website remains responsive on phones, tablets, and desktop screens.

Official Cloudflare instructions: https://developers.cloudflare.com/pages/get-started/direct-upload/
