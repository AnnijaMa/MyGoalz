# MyGoalz

A personal iPhone web app for logging daily goals from **4 Nov to 25 Dec 2026**:

- 💉 Ozempic injection, every Wednesday
- 💊 Supplements, daily
- 🥤 Protein shake, daily
- 🏃 45 minutes of movement, daily (tap to tick it off, or log minutes in steps of ±5 / ±15)

**Food log:** tap **📷 Take photo** (camera or photo library) or **✏️ Type it**, add a comment about what you ate,
and log calories, protein, carbs, fat, fiber and sugar. The app shows daily totals (calories and protein against your own targets).
Optional: add a Claude API key (⚙️ *Food targets & AI*) and every photo you take is calculated automatically (or tap **✨ Calculate with AI**; add a comment and tap again to refine).
The key and photos stay on the phone; the photo and comment are sent to Anthropic only when you tap the button.

It also shows a countdown to Christmas, your streak, totals and a calendar (tap any day to edit it).
Your data stays on your phone (local storage + IndexedDB for photos). Use **Export** now and then to keep a backup.

## Put it on your iPhone

1. On GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Re-run the "Deploy to GitHub Pages" workflow (Actions tab), or push any change.
3. Open the Pages URL (e.g. `https://annijama.github.io/MyGoalz/`) in **Safari** on the iPhone.
4. Tap **Share → Add to Home Screen**.

After that it opens full screen like a normal app and works offline.

`vendor/anthropic-sdk-0.137.0.js` is the official Anthropic TypeScript SDK (MIT), bundled for the browser with esbuild.
