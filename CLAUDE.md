# liamganion.com

## Who Is Liam Ganion

Liam Ganion, 24. Third-year law student (3L) at Pepperdine Caruso School of Law, graduating and taking the bar in August 2027. Graduated from UC Berkeley in 2024 with a degree in Environmental Science and International Politics. Currently works as a compliance officer for Pepperdine's athletic department.

### The Goal

Become an NBA General Manager or top front office executive. The dream organization is the Los Angeles Lakers. This is not a casual interest — every piece of this site, every article, every tool, and every relationship is oriented toward building the resume, skillset, and reputation to get there.

### How He Got Here

In February 2026, Liam competed at the Tulane Pro Basketball Negotiation Competition as the only solo competitor in a field of three-person teams. He beat the defending champions from Penn Law. Bobby Marks (ESPN salary cap analyst) was one of his judges. At the networking event that night, he had a 15-minute conversation with Onsi Saleh (GM, Atlanta Hawks) and an hour-long conversation with Marshall Rader (Sr. Director of Salary Cap & Strategy, Los Angeles Lakers). Marshall and Liam connected over golf and hit it off personally — Marshall later invited him for coffee in El Segundo and has become a genuine relationship, not just a networking contact.

Liam's reputation at Tulane also led to an unsolicited offer from basketball agent Michael Siegel to join his mentorship program. Siegel keeps a team of 2L and 3L mentees and places them with NBA teams or agencies after graduation. Liam chose the player evaluation track within Siegel's program.

### Key Relationships

| Person | Role | Relationship Status |
|--------|------|-------------------|
| Marshall Rader | Lakers Sr. Director, Salary Cap & Strategy | Strong. Coffee in El Segundo. Golf connection. Gave the advice to "learn to build things technologically." Said it makes Liam much more hireable and that he wishes he had the skill himself. |
| Chris Feller | Knicks Manager, Basketball Strategy | Met at ASU NBA Trade Deadline Competition (Nov 2025). Said he'd help however he can. Enjoyed Part 1 and asked follow-up questions. |
| Makar Gevorkian | Nets VP, Basketball Operations | Had a great initial call. Brooklyn doesn't offer entry-level summer positions, only full-time. Told Liam to wait until law school graduation to pursue Brooklyn. Warm check-in stage. |
| Onsi Saleh | Hawks GM | Met at Tulane networking event. 15-minute conversation. Warming stage. |
| Bobby Marks | ESPN salary cap analyst | Judged Liam's round at Tulane. Covers the exact territory that Liam writes about. Natural reconnect when articles are published. |
| Michael Siegel | Basketball agent / mentor | Heard about Liam from Tulane judges and graduating Penn 3Ls. Offered mentorship spot. Liam is on the player evaluation track. Onboarding started spring 2026. |

### Career Timeline

- **Now (3L year, 2026-27):** Write for Drop Step, build tools for the site, work with Siegel on player evals, maintain relationships with Marshall/Feller/Gevorkian/Marks. Marshall advised against the Lakers seasonal internship (requires full-time in-office, incompatible with law school) and instead told Liam to spend 3L year learning to build things technologically.
- **August 2027:** Graduate from Pepperdine Law, take the bar.
- **Post-bar target roles:** Basketball Operations Analyst, Salary Cap Analyst, Basketball Strategy Associate, or Legal/CBA Compliance role with an NBA team. The JD + CBA knowledge + technical portfolio is the differentiator.
- **Long-term:** Work up through basketball operations to VP of Basketball Operations, Assistant GM, and eventually GM.

### What Makes the Pitch Different

Most law students applying to NBA front offices have a JD and maybe a competition or two. Liam has:
1. A JD from Pepperdine with compliance experience
2. Solo win at Tulane against three-person teams (including defending champs from Penn)
3. Genuine relationships with executives at the Lakers, Knicks, Nets, and Hawks — plus a mentor placing people into teams and agencies
4. A public body of writing (Drop Step on Substack) that he sends directly to those contacts and that they engage with
5. A technical portfolio of interactive tools that demonstrate he can bring basketball concepts to life — the specific skill Marshall said he wishes he had

The site is where #4 and #5 live. It is not a hobby project. It is a career asset.

### Communication Preferences

Liam prefers honest, direct communication. No ChatGPT-style "It's not X, it's Y" phrasing or short punchy sentences. Praise should be earned, not reflexive. Responses should lean toward progression and development.

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
- Uses the **2026-27 NBA Rookie Scale** ($164.961M cap) at the **120% maximum** first-round picks customarily sign for — updated Jul 2026 post-draft; pick 1 = $14,748,000, matching Dybantsa's actual contract (source: Hoops Rumors rookie scale table)
- 2026-27 second-round figures: two-way $678,882, second-round exception max $2,449,421 (4-yr version), rookie minimum $1,357,763
- Handles second-round picks (second-round exception vs. two-way contracts)
- Projects cap growth at 10% annually, rookie raises at 5%
- Six clickable case studies updated with actual 2026 draft outcomes (Jul 2026): Johnson **drafted 9th (Mavericks)**, Graves **drafted 19th (Raptors)** — both beat their projections; Haugh (ESPN #13, returned), Mullins (projected 9th-17th, **never declared** — not a withdrawal), Momcilovic ($6M Kentucky), Yessoufou ($6M St. John's)
- `calculate()` takes a `scrollToResults` param; page-load auto-calc passes `false` so embeds don't scroll-jump
- Built to accompany "Seeing the Tank" Part 2; will also be referenced in the post-summer-league favorite drafts article (Jul 2026)
- Also deployed standalone at `stormymail.github.io/flip-zone-calculator/` — standalone repo synced from the site copy Jul 2026 (footer Part 2 link is absolute there)

### Seeing the Tank, Part 2 page (`/seeing-the-tank-part-2/`)
- Article page with the Flip Zone Calculator embedded mid-article (reuses `../flip-zone-calculator/styles.css` + `calculator.js`; `article.css` layers prose/nav/stat-strip/pullquote styles on top)
- `index.html` currently holds a Claude-drafted version of the article as structural scaffolding — **Liam is writing the final article himself**; the draft's prose is placeholder, the embed/components are keepers
- `research-notes.md` — verified facts, sources, quotes, and calculator outputs for Part 2 (all claims fact-checked Jun 9, 2026)
- `substack-draft.md` — Substack-format adaptation with link-card placeholders (same placeholder status)
- Homepage Part 2 article row currently points here instead of Substack — revisit once the Substack version publishes (see Decisions #1)

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
- [ ] **Deploy the `seeing-the-tank-part-2/` page** — still uncommitted (holds placeholder prose Liam is replacing). Once it ships, change the calculator footer's Part 2 link from the Substack URL back to `../seeing-the-tank-part-2/`, and update the homepage Part 2 row (also uncommitted)
- [ ] Post-summer-league favorite drafts article (Jul 2026) — will reference the Flip Zone Calculator and the flip zone guys (Johnson 9th, Graves 19th both beat projections)
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
