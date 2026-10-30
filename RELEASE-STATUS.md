# Release status

## Complete locally

- Vite + React flow, mobile-first English design, no accounts/database/payment.
- Real YouCam Skin AI and Makeup VTO REST adapters; vendor-sample live verification passed in milestone 2.
- No-key sample mode with clearly separated sample/live results.
- Eight real products with local photographs, source links, variants and reference USD prices.
- Optional age at matches only; all four choices and skipping verified.
- Curated ritual, quantity/removal controls, totals and demo completion.
- Vercel API function and Netlify function adapter with deployment configuration.
- README, demo guide, asset credits and 7 final screenshots.
- Six unit/adapter tests and production build passed. Local secrets ignored by Git and excluded from build/release.

## Verified browser checks

390 × 844 and 1280 × 900: no horizontal overflow. All eight product photos load. 20s prioritizes Glow Serum; 30s prioritizes Eye Serum; 40s/50s+ prioritize Dynasty Cream; skipping restores original matches. Sample ritual total is $57.30. Lip/blush duo reference total is $26.50. Bag traps keyboard focus and locks background scrolling.

Physical-device camera behavior has not been tested. The makeup API uses approximate colors, not brand-certified shade matching. Product prices are a fixed reference snapshot and can change.

## Production deployment

Language update: EN / KO / ES UI, device persistence, translated accessible labels and errors. Skin age displays explicit vendor data only, with an unavailable explanation otherwise. Eleven automated tests cover request preservation, age extraction, translation, device language fallback and existing functionality. Mobile browser checks confirm translated flows and unchanged cart totals.

Live app: https://k-glow-match.vercel.app

Deployed to the owner's Vercel Hobby team. The production API key is stored as a server-side Secret; `.env` is excluded from Git and deployment uploads. Public homepage and configuration endpoint return HTTP 200. Hosted Skin AI and Makeup VTO both completed with the vendor's public sample. Browser checks on the production URL confirmed the sample report, optional age selector, product matches, and $57.30 ritual bag total.

Public repository: https://github.com/Joyleesales/k-glow-match . Source and three reviewed illustrated sample screenshots are published. Actual credentials and owner private selfies were excluded. A silent English review MP4 is prepared locally; owner review, public YouTube/Vimeo upload and final contest submission remain. Never publish `.env`.
