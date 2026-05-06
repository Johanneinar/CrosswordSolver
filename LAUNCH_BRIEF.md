# Launch prep for Croosly crossword site

Goal: Take this existing crossword project from a personal GitHub repo
to a polished public site at croosly.com. Mini + Midi only at launch
— the Daily 15×15 stays in the codebase but is hidden from the UI and
not linkable from the home page.

Brand decisions (locked, do not bikeshed):
- Name: Croosly                                    (spelled C-R-O-O-S-L-Y with two o's)
- Domain: croosly.com
- Tagline: "Two crosswords a day. No app, no signup."
- Author footer: "Made by Jóhann Ísaksson in Reykjavík."
- Contact email: [FILL IN BEFORE STARTING]

Constraints:
- Keep the React-via-UMD + Babel Standalone architecture. NO migration to
  Next.js, Vite, or any build system. The "no build step" is a feature.
- Keep the existing visual design (Playfair Display, Libre Baskerville,
  cream background). Do not redesign.
- Pure static files. GitHub Pages hosting. No backend.
- The brand name is "Croosly" — two o's. Do NOT auto-correct this to
  "Crossly", "Crossley", or any other spelling. Verify every replacement.

# Stage 1 — Brand rename

Search and replace "CrosswordSolver" with "Croosly" across all files:
- index.html, mini.html, midi.html, daily.html, editor.html
- README.md
- All <title> tags
- All meta descriptions
- Any visible UI text

Update the README to reflect the new positioning. Drop language about
the project being a "solver" — it's a player. New short description:
"Croosly — daily Mini and Midi crosswords inspired by The New Yorker.
Free, no signup, no app."

After this stage, show me the diff of every changed file and wait for
my approval before moving on.

# Stage 2 — Hide the Daily 15×15

The Daily 15×15 is not ready for launch (content/IP not yet sorted).
Hide it from users without deleting the code:

- Remove the Daily option from the index.html selection screen.
- Leave daily.html and puzzles-daily.js in the repo for future use.
- If anyone navigates directly to /daily.html, redirect them to the
  home page (or show a "coming soon" placeholder — your call, ask me).

After this stage, confirm the home page shows ONLY Mini and Midi options.

# Stage 3 — SEO and social meta tags

Add proper meta tags to every HTML file. Each page needs:
- <title> with the brand name and what the page is
  (e.g. "Croosly — Daily Mini Crossword")
- <meta name="description"> — 150-160 chars, human-written, not keyword-stuffed
- Open Graph tags: og:title, og:description, og:image, og:url, og:type
  - All og:url values must use https://croosly.com/ as the base
- Twitter card tags: twitter:card="summary_large_image", twitter:title, etc.
- Canonical URL pointing at https://croosly.com/<page>
- <meta name="theme-color"> matching the site's accent color
- A real <h1> on the home page (currently the title might be in a <div>
  or only in <title> — fix this for SEO).

I will provide og-image.png at /og-image.png separately (1200×630). Just
reference it in the meta tags as https://croosly.com/og-image.png.

# Stage 4 — Favicon and app icons

Add a complete favicon set to the repo root:
- favicon.ico (16×16 + 32×32 multi-size)
- favicon-16x16.png, favicon-32x32.png
- apple-touch-icon.png (180×180)
- A web manifest (site.webmanifest) for Android home-screen adds
  - manifest "name": "Croosly"
  - manifest "short_name": "Croosly"
  - manifest "start_url": "/"
  - manifest "theme_color" matching the site's accent

I'll provide source PNGs. Generate <link> tags in every HTML file's
<head>. Use realfavicongenerator.net's tag pattern.

# Stage 5 — Footer and About

Add a small footer to index.html, mini.html, midi.html:
- "Made by Jóhann Ísaksson in Reykjavík"
- Link to a new /about.html page (create this — keep it short, ~150
  words, first-person, mentions it started as a project for my girlfriend,
  describes Croosly as "a daily mini and midi crossword inspired by
  The New Yorker")
- Link to a new /privacy.html page (create this — explain that stats
  are stored in localStorage on the user's browser, no tracking, no
  third-party services beyond Google Fonts and the React CDN, contact
  email for any questions)
- Year + "Croosly"

Keep the footer styling minimal and consistent with the existing aesthetic.

# Stage 6 — Stats disclaimer

In each game (mini.html, midi.html), find where the stats panel is
displayed (the 📊 button in the header). Add a small italic line at
the bottom of the stats modal:

  "Stats are stored in your browser. They won't sync across devices
   and may be cleared if you clear browsing data."

One line, muted color, no panic.

# Stage 7 — Custom domain config

Create a CNAME file at the repo root containing exactly one line:
  croosly.com

Then list out (don't execute — I'll do this part) the steps I need to
take in:
- Cloudflare/registrar DNS settings — the four GitHub Pages A records
  for the apex (croosly.com) and a CNAME for www.croosly.com pointing
  at johanneinar.github.io
- GitHub repo Settings → Pages → Custom domain field set to croosly.com
- The "Enforce HTTPS" checkbox (only check this AFTER GitHub has issued
  the certificate, which can take up to 24 hours)

Include the specific A record IP addresses GitHub Pages currently
documents at https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
so I can copy/paste them into my registrar.

# Stage 8 — Pre-launch checklist

Generate a checklist file (LAUNCH_CHECKLIST.md) covering:
- 2FA enabled on GitHub account
- Repo audit for any committed secrets/keys
- Puzzle content audit (every puzzle in puzzles-mini.js and
  puzzles-midi.js — confirm origin is either self-written or
  legally clean)
- Test on real iPhone (Safari) and Android (Chrome) at croosly.com
- Test the share button copies the right URL with croosly.com domain
- Test deep links (croosly.com/mini, croosly.com/midi) work correctly
- Open Graph preview test on opengraph.xyz with croosly.com URL
- Lighthouse audit, target score 90+ on all four metrics
- Repo renamed from "CrosswordSolver" to "croosly" (do this LAST,
  AFTER croosly.com is live and serving — renaming the repo earlier
  breaks the johanneinar.github.io/CrosswordSolver/ URL my girlfriend
  has bookmarked, but is safe once everyone is hitting the custom
  domain instead)

# Working rules

- Do each stage one at a time, in order.
- After every stage, show me the diff and what to test, then WAIT.
- Don't refactor unrelated files. Don't "improve" the existing game logic.
- Don't add dependencies. Don't add a build step. Don't add tests.
- Ask before deleting anything.
- The brand name is "Croosly" with two o's — never auto-correct to
  "Crossly", "Crossley", or any other variant. Re-verify spelling on
  every search-and-replace.
- If you find something genuinely broken in the existing code, mention
  it but don't fix it as part of launch prep — log it as a TODO.

Start with Stage 1.