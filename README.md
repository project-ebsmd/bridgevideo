# EBS ECO and NAT video pages

Two separate local, buildless HTML pages for ECO and NAT RCT groups, with Estonian teacher-guide copy and Vimeo embeds. The visual reference is the [EBS AQMAPPS conference page](https://www.ebs.ee/en/events/4th-aqmapps-conference).

## Open the pages

- [ECO page](d7fc3b47e1894c0d879006c795d5ad59.html)
- [NAT page](3b443180799f44888087674293e1342a.html)

The HTML filenames are independent random 32-character hexadecimal identifiers; the old `eco.html` and `nat.html` files have been renamed and are not retained as aliases. This README is an administrative mapping and must not be deployed as a participant page.

Open either HTML file directly in a browser. Keep `styles.css`, `video-menu.js`, `qr-modal.js`, and `assets/` beside the pages. No installation or build is required. For an HTTP preview, run `python -m http.server 8000 --bind 127.0.0.1` from this directory, then visit `http://127.0.0.1:8000/d7fc3b47e1894c0d879006c795d5ad59.html` or `http://127.0.0.1:8000/3b443180799f44888087674293e1342a.html`.

Each page has a five-topic left menu and displays one video panel at a time: video 1 has a Vimeo embed, and videos 2–5 have placeholders. Selecting a topic replaces the video and its guide text in place. Inactive panels stay hidden; switching away unloads the player to stop audio. Valid `#video-N` URLs select a topic, and invalid hashes fall back to video 1. The supplied owner embed titles establish the correct assignment: ECO `1233985619` with hash `0302faf13d`; NAT `1233990496` with hash `5da111e989`. Titles, introduction, and descriptions come from [opetaja_juhend_videod.md](../opetaja_juhend_videod.md) and are recorded in the [specification](../spec.md). The pages preserve the Markdown guide's wording and emphasis. Each video includes its full guide section, with exercises, discussion prompts, and bullet lists. The grade 11 audience line, introductory paragraph, usage instructions, and usage-plan table appear before the videos.

## Projector QR modal

The chatbot instruction in “Kuidas videoseeriat kasutada” is a button that opens `assets/qr_bot.png` in a large native modal dialog on the current page. The grey backdrop dims the page and blocks background interaction; scrolling is locked while the QR is open. Close it with “Sulge”, Escape, or a click outside the dialog. Focus returns to the instruction button, and the selected video is preserved. The supplied QR image has been moved into `assets/qr_bot.png`; there is no duplicate in the specification folder. Keep it with the website assets. The Markdown guide links to `website/assets/qr_bot.png`.

## Replace a placeholder

In the appropriate HTML page, locate the section with `id="video-2"` through `id="video-5"`. Replace its `.video-placeholder` element with a `.video-player` wrapper containing the owner's approved Vimeo iframe. Use the first section as the markup example, preserve any required unlisted hash, and give the iframe a descriptive Estonian title. For an initially hidden panel, put the approved player URL in `data-src` instead of `src` so it loads only when selected. Keep the panel's `hidden` attribute and tab relationship. Update the status to `class="availability available"` with the text “Vaata videot”. Do not add external viewing links or links to the other experimental series. Keep the section anchor and all associated guide text.

The current pages use the supplied responsive Vimeo owner embed code, including its privacy hash, iframe permissions, absolute positioning, and original player parameters. The Vimeo SDK script is included once per page. Neither embed has an autoplay query parameter; switching topics still unloads the previous player even though the supplied embed sets `autopause=0`. Placeholder sections do not request Vimeo resources. Player access, captions, and any domain restrictions must be checked by the video owner; the local build does not change Vimeo settings.

## EBS integration

The pages are saved locally and have not been published to `ebs.ee`. When integrating into the EBS CMS, use its existing header, footer, navigation, font assets, and consent system around the page content. The standalone header intentionally links to EBS and BRIDGE without reproducing the full site's menu functionality. Both the BRIDGE text and logo link to [the KU Leuven BRIDGE project page](https://feb.kuleuven.be/drc/LEER/bridge-project). Page headings, browser titles, breadcrumbs, and social titles follow the current titles in `spec.md`: “Majandus- ja sotsiaalteaduse õppematerjalid” and “Loodusteaduse õppematerjalid”.

Map the pages to the agreed ECO and NAT routes and distribute only the assigned route to each group. There are no links between the series, copy-link buttons, external video catalogue links, or recommendations. Each page includes `noindex, nofollow, noarchive`; keep both out of site search, sitemaps, and public navigation.

Connect iframe loading to the EBS consent mechanism before production publication. Do not add a second consent banner. The local preview loads the two Vimeo iframes directly using the supplied embed parameters. Check authorised participant playback on the production domain and preview domain and retain the approved privacy hash when needed. Configure and verify Vimeo player sharing and end-screen settings so the player does not expose the other experimental series.

## RCT access boundary

The local HTML files separate navigation and content, but a participant who knows both file URLs can open either. This draft does not implement authentication or randomisation. Before study deployment, connect the pages to the EBS study assignment mechanism and reject opposite-group and unassigned requests on the server before returning any video markup. Use private caching keyed to authorised assignment. Hiding a link, robots metadata, or an undisclosed URL does not enforce group access. The teacher guide and this README are administrative files and must not be served as participant study content.

## Design assets

The supplied EBS reference provides Montserrat body type, Zin Display headings, navy `#001f4c`, mint `#d9f9f7`, a pale `#f6f8f9` background, rounded sections, pill controls, and the Tallinn photo hero treatment. Public design assets were downloaded from the reference site's own URLs for this EBS page draft:

- `montserrat.ttf`: `https://www.ebs.ee/_next/static/media/257c9f4b33937c25-s.p.ttf`
- `zin-display.otf`: `https://www.ebs.ee/_next/static/media/374f3fbf4906ef93-s.p.otf`
- `tallinn-old-town.webp`: `https://www.ebs.ee/api/images/file/tallinn-old-town.webp`
- `ebs-logo.svg`: `https://www.ebs.ee/api/images/file/EBS_FULL_LOGO_LIGHT_BLUE_RGB.svg`
- `bridge-logo.webp`: `https://www.ebs.ee/api/images/file/bridge%20logo3.webp`

Reuse the official EBS assets already available in the production site when integrating. The CSS includes mobile layouts at 767 and 359 pixels, keyboard focus styles, a skip link, and reduced-motion support. Titles and descriptions are present in the HTML. `video-menu.js` selects the active panel and unloads hidden players. Without JavaScript, the first panel remains visible with a message explaining that topic selection requires JavaScript.

## Verification

Checked both pages for five ordered sections, five complete video sections matching the Markdown guide, one correctly assigned iframe, four placeholders, unique anchors, valid local links, and existing stylesheet assets. The single-video viewer is checked for five menu choices, one initially visible panel, stable topic IDs, accessible tab relationships, keyboard selection, and inactive iframe unloading. The RCT revision is checked for teacher-guide wording and absence of the other series' content, navigation, recommendations, external video catalogue links, and share controls. Browser rendering, mobile layout, Vimeo player end screens, and production group access enforcement remain unverified.
