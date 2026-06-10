# liamganion.com

## What This Is

Personal portfolio site for Liam Ganion — a basketball analytics portfolio that houses interactive tools, data visualizations, and links to longform writing published on Substack (Drop Step). The site exists to demonstrate the ability to "bring concepts to life" technologically, per advice from Marshall Rader (Lakers Sr. Director, Salary Cap & Strategy). It is both a public-facing portfolio and a career asset for NBA front office hiring.

## Architecture

Static site. No framework, no build step, no dependencies. Just HTML, CSS, and vanilla JavaScript. Deployed on GitHub Pages from the `main` branch.

- **Root:** Landing page (`index.html`, `styles.css`) with hero, tools section, writing section, about section
- **Subdirectories:** Each interactive tool lives in its own subdirectory (e.g., `flip-zone-calculator/`) with its own `index.html`, `styles.css`, and JS files. Tools are self-contained and can be shared as standalone links.

### Why no framework?

Marshall's advice was to learn to build things, not to learn React. Static files deploy instantly on GitHub Pages, load fast, have zero maintenance overhead, and are easy to extend. If a tool eventually needs a framework, it can be added per-tool without touching the rest of the site.

## Design Language

- **Dark theme.** Background `#0a0a0a`, surfaces `#111111` / `#181818`.
- **Fonts:** Inter (sans) for body, JetBrains Mono for data/numbers. Loaded from Google Fonts.
- **Accent color:** Orange `#f0a050` — used for highlights, tags, hover states, and the hero accent bar.
- **Data colors:** NBA blue `#4a90d9`, College green `#50b87a`, Warning red `#d94a4a`. Used in the Flip Zone Calculator for path comparison.
- **Section labels** have an orange dot prefix. Article rows slide left on hover. Contact links are bordered buttons with SVG icons.
- **Responsive** down to 375px mobile. Grid layouts collapse to single column.

All tools should follow this same design language for visual consistency across the site.

## Current Tools

### Flip Zone Calculator (`/flip-zone-calculator/`)
- Compares NBA rookie scale earnings vs. college NIL/revenue-sharing compensation over a 4-year window
- Uses 2026 NBA Rookie Scale data for all 30 first-round picks
- Handles second-round picks (second-round exception vs. two-way contracts)
- Projects cap growth at 10% annually, rookie raises at 5%
- Six clickable case studies: Haugh, Mullins, Momcilovic, Yessoufou, Johnson, Graves
- Built to accompany "Seeing the Tank" Part 2 on Substack
- Also deployed standalone at `stormymail.github.io/flip-zone-calculator/`

## Writing (Drop Step on Substack)

Articles are published on `liamganion.substack.com` and linked from the Writing section of the site. The Substack handles distribution (email delivery to contacts including NBA front office people). The site links out to Substack rather than hosting articles directly.

### Published
1. **Welcome to Drop Step!** (Jun 2025)
2. **2025 NBA Draft Sleepers** (Jun 2025)
3. **Explaining the NBA's Two Betting Scandals** (Oct 2025)
4. **Seeing the Tank: The NBA Draft Pool Post-House** (Apr 2026)
5. **Seeing the Tank, Part 2** (Jun 2026) — paired with Flip Zone Calculator

### Queued
- **CSC Enforcement Article** — after the May 27 hearing, analyzing the College Sports Commission's enforcement mechanisms for NIL compliance

## Deployment

- **GitHub repo:** `lganion/liamganion.com`
- **GitHub Pages URL:** `https://lganion.github.io/liamganion.com/`
- **Custom domain:** Not yet configured. When `liamganion.com` is purchased, add a CNAME file and update DNS records. At that point, convert relative links back to absolute paths.
- Links within the site use **relative paths** (e.g., `href="flip-zone-calculator/"` not `href="/flip-zone-calculator/"`) because GitHub Pages serves from a subdirectory (`/liamganion.com/`). This changes when a custom domain is added.

### Deploying updates
```bash
cd ~/CascadeProjects/liamganion.com
git add -A && git commit -m "description" && git push
```
GitHub Pages rebuilds automatically on push to `main`. Takes ~1 minute.

### Dev server
```bash
npx serve ~/CascadeProjects/liamganion.com -l 8081
```
Also configured in `.claude/launch.json` as "Liam Ganion Site" on port 8081.

## Decisions Made

1. **Substack for writing, personal site for tools.** Substack handles email distribution and subscriber management. The site is the portfolio layer where interactive work lives. They link to each other.

2. **Each article gets a companion tool when possible.** The Flip Zone Calculator accompanies "Seeing the Tank" Part 2. Future articles should follow this pattern — the writing explains the thesis, the tool lets readers test it.

3. **Tools are self-contained subdirectories.** Each tool can be shared as a standalone link, embedded in a Substack post, or viewed through the main site. No shared dependencies between tools.

4. **No analytics yet.** Could add Plausible or Simple Analytics later if traffic tracking matters. Not a priority.

5. **Contact email is liamganion@gmail.com** on the public site. Substack subscription and writing correspondence uses sportsleemer@gmail.com.

## Roadmap

### Near-term
- [ ] Purchase `liamganion.com` domain and configure DNS
- [ ] Update Part 2 article link once published on Substack
- [ ] CSC Enforcement article + companion visualization

### Tool ideas (from Marshall's advice to "build things")
- [ ] **Cap Sheet Visualizer** — interactive salary cap breakdown for any NBA team, showing apron thresholds, luxury tax tiers, and available exceptions
- [ ] **Trade Machine Logic** — simplified trade legality checker using CBA salary matching rules (125% + $100K for teams under the apron, etc.)
- [ ] **Draft Value Model** — historical analysis of draft pick value by position, with surplus value calculations comparing rookie scale to market contracts
- [ ] **Free Agency Tracker** — visual timeline of upcoming free agents with contract projections based on cap position and comparable deals
- [ ] **Second Apron Impact Tool** — shows how the second apron restrictions (no aggregation, frozen pick trading) affect a team's flexibility

### Site improvements
- [ ] Open Graph meta tags and social preview images for link sharing
- [ ] Favicon
- [ ] Subtle page transitions or scroll animations (keep it tasteful)
- [ ] Dark/light mode toggle (low priority — dark is the brand)

## Who This Gets Sent To

The site URL goes in email signatures and is shared alongside Substack articles with:
- **Marshall Rader** — Lakers Sr. Director, Salary Cap & Strategy
- **Chris Feller** — Knicks Manager, Basketball Strategy
- **Makar Gevorkian** — Nets VP, Basketball Operations
- **Bobby Marks** — ESPN, salary cap analyst
- **Michael Siegel** — Agent/mentor, player eval program
