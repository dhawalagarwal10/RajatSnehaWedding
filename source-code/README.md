# Rajat & Sneha — Cloudflare Pages

This source project is configured for Cloudflare Pages and keeps the complete responsive invitation, animations, music, photos, venue directions, and Google Form RSVP.

## Deploy through GitHub

1. Upload the **contents of this folder** to the root of a GitHub repository.
2. In Cloudflare, open **Workers & Pages**, create a Pages application, and connect the repository.
3. Select the Vite framework preset, or enter:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
4. Deploy. No environment variables are required.

## Deploy with Wrangler

```bash
npm install
npx wrangler login
npm run deploy:cloudflare
```

The included `wrangler.jsonc` identifies `dist` as the Cloudflare Pages output directory.

## Edit the invitation

- Text, events, RSVP mapping, and links: `src/App.tsx`
- Styling, responsive layouts, and animation: `src/styles.css`
- Photos, music, envelope, and logo: `public/`

After editing, run `npm run build` before uploading the `dist` folder manually.
