# Agent test 02: voice assistant settings

File: `SettingsScreen.tsx`. `npx tsc --noEmit` from the repo root passes (exit 0).

## 1. Components I needed but Nova did not have

| Needed | Why | What I used instead |
|---|---|---|
| Page title / `h1` | AGENTS.md rule 7 says the page gets one `h1`, but `PanelHeader` only takes `level` 2–4 and there is no `Heading` or page-header component. | A plain `<h1>` with the existing `nv-panel__title` class, so it uses Nova styling with no raw values. This means the page title looks like a panel label, not a page title. A `PageHeader` or `Heading level={1}` component would fix it. |
| Settings row (label + value + action on one line) | The account section needs "Signed in as / name / Sign out" laid out as a row. | `Stack direction="row" justify="between" wrap` holding a `Label` + `Text` column and a `Button`. Works, but every settings screen will rebuild this. |
| Inline form status ("Saved") | After saving the wake word there is no toast or success message component. | The `Field` hint shows "Current wake word: …", which updates on save. Errors use `Field`'s `error`. |
| Confirmation dialog | Not needed here. Signing out is not destructive (rule 8), so it signs out directly. | Nothing. |
| Select | Not needed. Theme has exactly 4 options, so `Segmented` fits (2–5 rule). | — |

## 2. Rules that were unclear or tempting to break

- **Rule 7 vs. the component set.** "Give the page one `h1`" and "Headings come from `PanelHeader`" can't both be satisfied, because `PanelHeader` can't make an `h1`. I wrote a raw `<h1>` and borrowed a Nova class. Borrowing an internal class name (`nv-panel__title`) is not explicitly allowed or banned.
- **Rule 3 and the wake word form.** The screen applies settings instantly, so it has no primary button. The wake word is free text and shouldn't apply on every keystroke, so it needs a Save. I treated it as "a small form inside a larger screen" and gave it a default button. The rule covered this case well; I'm noting it only because I was tempted to make Save primary.
- **Sign out button variant.** It was tempting to use `danger` because sign-out feels "red", but rule 8 says it isn't destructive and `danger` would mislead, so I used `default`.
- **Status tone for offline.** AGENTS.md doesn't say which `tone` means online vs. offline. I chose `success` when online and `danger` (light off) when offline. The text label carries the meaning either way (rule 4).
- **Rule 1, "no layout sizes".** `Wordmark` defaults to `size={48}` internally. I didn't pass a size, so my code has no number, but the component itself hard-codes a pixel size.
- **Theme picker side effect.** I set `data-theme` on `<html>` from inside the screen, as rule 9 describes. In a real app this belongs at the app root; it's in the screen here so the picker actually works.

## 3. Self-check (from AGENTS.md)

- [x] **No raw colors, shadows, font sizes or layout sizes:** Yes. Searched the file for `#`, `rgb`, `px`, `rem`, `style=` and found none.
- [x] **At most one primary button:** Yes. There are zero; settings apply instantly.
- [x] **Every input has a visible label, every light has a text label:** Yes. `Field` label "Wake word", `Segmented` labels "Voice speed" and "Theme" are visible, the `Toggle` has text, and the light is a `Status` with "Online"/"Offline".
- [ ] **Keyboard works / focus rings visible / segmented arrows:** Partly. Every control is a native button or input, so Tab reaches all of them, and `Segmented` handles arrow keys in its own code. I did not run the screen in a browser, so I have not seen the focus rings.
- [ ] **Looked at the screen in all four themes:** No. I did not render it. The code uses no raw values, so it should follow the theme, but I have not looked.
- [x] **Listed any component Nova didn't have:** Yes. See section 1.
