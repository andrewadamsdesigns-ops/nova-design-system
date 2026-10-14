# Agent test 01: settings screen notes

## 1. Components I needed but Nova did not have

| Needed | What I used instead |
|---|---|
| Layout primitives (Stack / Row / Grid) | Plain `div`s with inline flex styles, spacing only from `--nv-space-*` tokens. Nova has no layout component, so every screen will hand-roll these. |
| A page or section heading (h1/h2) | `Wordmark` for the app name, and `PanelHeader` titles for sections. `PanelHeader` renders a `Label` span, not a heading element, so screen readers get no heading outline. I added `aria-labelledby` on each `Panel` as partial compensation. |
| A body-text / value component (for the account name) | A plain `<span>`, which inherits font and color from `.nv-root`. |
| A visible label for `Segmented` | `Segmented` only takes `label` as an `aria-label`, so nothing is shown on screen. I put a `<Label>` above it. The control is still named by its `aria-label`, not linked to the visible label (no `aria-labelledby` prop), so the name appears twice in code. |
| A select (for more than 5 options) | Not needed. Theme has exactly 4 options, so `Segmented` fits. |
| A layout width / page container token | `maxWidth: '40rem'` and `minHeight: '100vh'` are raw values. There is no container-width token. |
| A sign-out confirm dialog | None. Sign out is a plain default `Button` with a stub handler. |

## 2. Rules that were unclear or tempting to break

- **Rule 1 (no raw values):** it lists colors, shadows and font sizes, and the checklist says to search for `px`. Layout widths (`40rem`, `100vh`) are not covered either way. I used them because no token exists. I read them as allowed, but this is a gap.
- **Rule 3 (one primary):** what counts as "the most important action" on a settings screen is unclear. Most settings use `Toggle` or `Segmented` and apply right away. The only explicit save is the wake word, so that got `primary`. Sign out was tempting as `danger`. I kept it `default` because signing out is not destructive.
- **Toggle vs Save (component table):** the wake word is text, and Nova gives no "apply right away" pattern for text fields. I used a small form with a Save button. That makes the screen mix instant-apply and save-to-apply controls.
- **Checklist "every input has a visible label" vs `Segmented`:** this conflicts with the component's API (see above). I added a separate visible `Label`.
- **Rule 7 (four themes):** the screen sets `data-theme` on `<html>` from the theme picker. That is a global side effect inside a component, which AGENTS.md tells me to do but which a real app would own higher up.

## 3. Self-check

- [x] No raw colors, shadows or font sizes in my code: **Yes.** A search for `#`, `rgb` and `px` finds nothing. Only `40rem` and `100vh` (layout, see above).
- [x] At most one primary button: **Yes**, "Save wake word".
- [x] Every input has a visible label, and every light has a text label: **Yes.** The Field has a label, both Segmenteds have a visible `Label` added, the Toggle has text, and the light is a `<Status>` with text.
- [ ] Keyboard works: **Partly verified.** By reading the code: all controls are native buttons or inputs, and Segmented handles arrow keys. I did not test it in a browser or look at focus rings.
- [ ] Looked at the screen in all four themes: **No.** Nothing was rendered; only `tsc` was run. The code uses only tokens, so it should hold, but this is unverified.
- [x] Listed missing components: **Yes** (section 1).
