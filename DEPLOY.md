# Portfolio: edit & deploy guide

## 1. What's in this folder
```
index.html          ← ALL your content lives here (look for the sections + "EDIT" comments)
banna.js            ← the cursor "build" effect (MIT, by Mohammadreza Rokhbin) – don't edit
assets/style.css    ← colors/fonts (change the variables at the top of :root)
assets/main.js      ← starts the effect, replay + copy-email buttons
assets/profile.jpg  ← your photo (already added)
assets/resume.pdf   ← your resume (already added; replace the file whenever you update it)
_headers            ← caching headers (Cloudflare Pages / Netlify)
.nojekyll           ← tells GitHub Pages to serve files as-is
```

## 2. Edit locally
Everything (resume content, photo, GitHub and LinkedIn links) is already in place. Optional:
- **Phone number:** deliberately not shown on the page, but `assets/resume.pdf` contains it. Swap in a version without it if you prefer.
- **Sharper photo:** the supplied photo was small (572 px). If you have the original, save it as 800×1000 `assets/profile.jpg`.
- **Preview** (any static server):
  ```bash
  cd portfolio
  python3 -m http.server 8080
  # open http://localhost:8080
  ```
  Add `?nobanna` to the URL to disable the animation while editing. The animation also
  turns itself off for visitors who set "reduce motion" in their OS.

## 3. Put it on GitHub (needed for all three hosts)
```bash
cd portfolio
git init -b main
git add .
git commit -m "Initial portfolio"
# create an EMPTY repo on github.com first (no README), then:
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

## 4A. GitHub Pages (simplest, free)
1. Repo → **Settings → Pages**.
2. **Source:** "Deploy from a branch" → Branch **main**, folder **/ (root)** → Save.
3. Wait ~1 minute. Your site: `https://<your-username>.github.io/<repo>/`
   - Name the repo `<your-username>.github.io` to get the clean URL `https://<your-username>.github.io/`.
4. Custom domain: Settings → Pages → *Custom domain* → enter it → tick **Enforce HTTPS**.
   At your DNS provider add `CNAME www → <your-username>.github.io`
   (for the apex domain add four `A` records: 185.199.108.153, .109.153, .110.153, .111.153).
   Check GitHub's docs, as these values can change.

## 4B. Cloudflare Pages (free, fast global CDN)
1. dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**.
2. Pick the repo. **Framework preset: None.** Build command: *(leave empty)*.
   Build output directory: `/` (or `.`). → **Save and Deploy**.
3. Site is live at `https://<project>.pages.dev`; every `git push` redeploys automatically.
4. Custom domain: project → **Custom domains → Set up a domain**.

## 4C. Netlify (free)
1. app.netlify.com → **Add new site → Import an existing project → GitHub** → choose repo.
2. Build command: *(empty)*. Publish directory: `.` → **Deploy**.
3. Live at `https://<name>.netlify.app` (rename under Site configuration → Change site name).
4. Custom domain: **Domain management → Add a domain**.
   (No Git? Drag-and-drop the folder onto app.netlify.com/drop.)

## 5. Updating later
Edit files → `git add . && git commit -m "Update" && git push`. All three hosts redeploy automatically.

## 6. After launch checklist
- [ ] Open on your phone; test the "Contact" and "Resume" buttons.
- [ ] Add `og:url` / `og:image` meta tags (1200×630 `assets/og.png`) so links preview nicely on LinkedIn.
- [ ] Put the URL on your resume, LinkedIn and GitHub profile.
- [ ] Run Lighthouse (Chrome DevTools). The build animation delays when content appears,
      which can lower the LCP score. If that matters, set `data-speed="1.6"` in index.html.
- [ ] Optional privacy/speed: self-host the Google Fonts (download the .woff2 files and add @font-face).

## 7. Tweaks
- **Colors:** `assets/style.css` → `--red` (accent) and `--blue` (button/card outlines).
- **Cursor count/speed/colors:** attributes on the `<script src="banna.js" ...>` tag in index.html
  (`data-agents`, `data-speed`, `data-colors`; full list in banna's README).
- **Play only once per visit:** not supported with the current manual start; ask me and I'll add it.
- **Keep content in plain HTML.** banna only animates what exists at load time; content injected later by JS won't be built.
- **Contact form:** static hosts have no backend; use the mailto button, or add Formspree/Netlify Forms.

## Credits / license
banna.js © Mohammadreza Rokhbin, MIT (see BANNA-LICENSE.txt). Keep that file in the repo.
