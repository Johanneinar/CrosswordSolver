# Croosly launch checklist

Roughly ordered: anything → assets → DNS → live → rename. Items marked **LAST** must wait until the custom domain has been live and serving for at least a few days.

---

## Account hygiene

- [ ] **2FA enabled on GitHub account.** [Settings → Password and authentication](https://github.com/settings/security). Use an authenticator app (1Password, Authy, Bitwarden, etc.) — SMS-only is weaker. Save recovery codes somewhere durable.
- [ ] **2FA on the domain registrar.** A hijacked registrar account can move croosly.com away in minutes. Worth more than 2FA on most things.
- [ ] **2FA on Cloudflare** (if Cloudflare holds the DNS).

## Repo audit

- [ ] **Scan repo for committed secrets / API keys.** This project has no backend, so the risk is low — but verify before going public:
  ```
  git log --all -p | grep -iE "api[_-]?key|secret|token|password|bearer|aws_|sk_live" | head
  git log --all -p | grep -E "[A-Za-z0-9_-]{32,}" | head
  ```
  Visually skim the output. False positives are normal (font hashes, base64-encoded SVGs, etc.); look for things that look like credentials. If something is found, **rotate it first**, then rewrite history with `git filter-repo` (or accept that the repo is compromised and start over).
- [ ] **`.gitignore` sanity.** `git status --ignored` — make sure no `.env`, `node_modules/`, or editor temp files are tracked.

## Puzzle content audit

For every puzzle in `puzzles-mini.js` and `puzzles-midi.js`:

- [ ] Open `puzzles-mini.js`. Confirm each puzzle is **self-written** or sourced from a **legally clean** origin (CC-licensed, public domain, explicit permission). Add a one-line origin comment on each entry if not already present.
- [ ] Same for `puzzles-midi.js`.
- [ ] If any entry's origin is unclear or potentially copyrighted (e.g., transcribed from a paid puzzle): **delete it before launch**. Replace with a self-written one if needed to keep the rotation full.
- [ ] `puzzles-daily.js` — Daily is hidden from the UI as of Stage 2 but the file is still in the repo and shipped to GitHub Pages. Either (a) audit it too, or (b) leave it alone since it's not linked from anywhere user-visible.

## Assets to deliver

These were referenced in Stages 3–5 but not provided yet:

- [ ] **Favicon set at repo root** (Stage 4):
  - `favicon.ico` (multi-size: 16×16 + 32×32)
  - `favicon-16x16.png`, `favicon-32x32.png`
  - `apple-touch-icon.png` (180×180)
  - `android-chrome-192x192.png`, `android-chrome-512x512.png`

  Fastest path: drop a square PNG into [realfavicongenerator.net](https://realfavicongenerator.net) → keep just the PNGs (the HTML and `site.webmanifest` are already wired up).
- [ ] **`og-image.png` at repo root** (Stage 3): 1200×630, contains "Croosly" + tagline. Used by every page's OG / Twitter card.
- [ ] **Cloudflare Email Routing for `hello@croosly.com`** (Stage 5). The privacy page promises mail to this address works:
  - Cloudflare dashboard → croosly.com → Email → Email Routing
  - Add custom address: `hello@croosly.com` → forward to your primary inbox
  - Verify the destination inbox confirmation email
  - Send a test from another email account

## Domain & TLS (Stage 7)

- [ ] DNS records added (4× A on apex; CNAME `www` → `johanneinar.github.io`; optional 4× AAAA for IPv6).
- [ ] Cloudflare records set to **DNS only** (gray cloud) until cert issues. Can flip to proxied later.
- [ ] `CNAME` file pushed to `main`.
- [ ] GitHub repo → Settings → Pages: custom domain `croosly.com`, save.
- [ ] Wait for Let's Encrypt cert (5 min – 24 hours).
- [ ] **Enforce HTTPS** checkbox checked (only after cert issues — verify `https://croosly.com` loads cleanly first).

## Live functional tests (after croosly.com is serving)

Run on a real iPhone (Safari) AND a real Android phone (Chrome). Emulators miss things.

### Home & navigation
- [ ] `https://croosly.com/` loads, shows Mini and Midi cards (no Daily).
- [ ] Tab title: "Croosly — Daily Mini and Midi Crosswords".
- [ ] Click Mini card → `/mini.html` loads.
- [ ] Click Midi card → `/midi.html` loads.
- [ ] Footer shows "Made by Jóhann Ísaksson in Reykjavík", About / Privacy links work, "© 2026 Croosly".
- [ ] About and Privacy pages render correctly. Email link `mailto:hello@croosly.com` opens mail client.
- [ ] Direct nav to `https://croosly.com/daily.html` → silently redirects to `/`.
- [ ] Direct nav to `https://croosly.com/editor.html` → editor loads.

### Game flow
- [ ] Solve a Mini puzzle. Timer runs, completion overlay shows, stats update.
- [ ] Reload the page → stats persist (`localStorage` writes worked).
- [ ] Click 📊 → stats modal shows the disclaimer line ("Stats are stored in your browser..."), small italic, muted.
- [ ] Same for Midi.
- [ ] On mobile: fixed-bottom keyboard works, footer is hidden (correct), keyboard doesn't double-type.

### Share button
- [ ] Solve a Mini puzzle, click Share. Paste the clipboard somewhere — text reads `Croosly Mini\n<date>\nSolved in <time> 🎉\n\nhttps://croosly.com/mini.html`.
- [ ] Repeat for Midi → URL is `https://croosly.com/midi.html`.
- [ ] **Critical:** the URL says `croosly.com`, NOT `johanneinar.github.io`.

### Deep-link decision
The brief mentions testing `croosly.com/mini` and `croosly.com/midi` (without `.html`). GitHub Pages does **not** serve `.html` extensionless by default — `/mini` will 404.
- [ ] **Decide:** is `croosly.com/mini.html` (current) good enough, or do you want extension-less URLs?
  - **Yes, .html is fine** → no action; share text and links already use `.html`.
  - **No, want clean URLs** → add `mini/index.html` and `midi/index.html` (each one-line redirects to the respective `.html`), or set up a `404.html` that redirects on miss. This is a small follow-up — flag and ship without it for now if you want to launch sooner.

### Favicon / PWA
- [ ] Browser tab shows the favicon on every page.
- [ ] iOS: "Add to Home Screen" → uses `apple-touch-icon.png`, name "Croosly".
- [ ] Android: "Add to Home Screen" → uses 192×192 from manifest, opens standalone (chrome-less) per `display: standalone`.

## SEO & social

- [ ] **Open Graph preview** at [opengraph.xyz](https://www.opengraph.xyz). Test each:
  - `https://croosly.com/`
  - `https://croosly.com/mini.html`
  - `https://croosly.com/midi.html`
  - `https://croosly.com/about.html`
  - `https://croosly.com/privacy.html`
  - `https://croosly.com/editor.html`

  Each should render with: correct page-specific title, description, the `og-image.png`, no missing-image placeholder.
- [ ] **Lighthouse audit** in Chrome DevTools (Incognito mode for clean baseline). Run on `https://croosly.com/` AND `https://croosly.com/mini.html`. Target **≥ 90 on all four metrics:**
  - Performance
  - Accessibility
  - Best Practices
  - SEO

  Common quick wins if you fall short: alt text on images (none here), explicit `<html lang="en">` (already set), correct headings hierarchy, content-security headers.

## Renames (LAST — only after the above is green)

These break old URLs and bookmarks. Hold them until `croosly.com` has been live for at least a few days so traffic has migrated.

- [ ] **GitHub repo rename:** `johanneinar/CrosswordSolver` → `johanneinar/croosly` (lowercase). Settings → General → Repository name. GitHub auto-redirects the old URL to the new one for a while, but it's not eternal. **Per the brief, this breaks the bookmark `johanneinar.github.io/CrosswordSolver/` your girlfriend has — only do it once she (and anyone else) is reliably hitting `croosly.com` instead.**
- [ ] **README cleanup** (deferred from Stage 1 per agreed scope):
  - `README.md` line 5 (`**Play:** https://johanneinar.github.io/CrosswordSolver/`) → update to `https://croosly.com/`
  - `README.md` line 74 (editor URL) → update to `https://croosly.com/editor.html`
  - Three Sizes section still lists Daily 15×15 — decide whether to strip Daily, soft-note it, or leave it (`puzzles-daily.js` is still in the repo and the editor still authors Daily content, so leaving it is defensible).
- [ ] **Header eyebrow text** (small TODO surfaced from earlier stages, optional polish):
  - `index.html` line 130: `<div class="eyebrow">The Daily Crossword</div>` — reads ambiguously now that Daily is hidden. Reads fine as "the daily-published crossword [site]"; only change if it bothers you.
  - `mini.html` and `midi.html` header eyebrow `The Daily Crossword` (line ~494 each) — same call.
- [ ] **Year roll** — `© 2026 Croosly` is hardcoded in 5 places (`index.html`, `mini.html`, `midi.html`, `about.html`, `privacy.html`). 30-second annual edit; not worth a JS solution.

## Final go / no-go

- [ ] All boxes above checked (or consciously skipped with a note why).
- [ ] You've shown the live site to one or two friends and they got it without explanation.
- [ ] Tweet / share / however you're announcing — has the croosly.com URL, not the github.io one.

🎉
