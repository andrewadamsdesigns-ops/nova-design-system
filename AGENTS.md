# AGENTS.md: how to build with Nova

You are an AI coding agent working in a project that uses the Nova design system. Read this whole file before you write UI code. These rules exist so every screen looks like it came from the same hardware.

## The rules

1. **Build only from Nova components and tokens.** No hex codes, no rgb(), no new box-shadows, no new font sizes in your code. If you need a value, it is a `--nv-*` variable.
2. **If a component is missing, stop and say so.** Do not build a near-copy of an existing component with different styles. Write down what you needed and why, then use the closest existing piece.
3. **One primary button per screen.** `variant="primary"` marks the single most important action. Everything else is a default or ghost button.
4. **A status light never carries meaning alone.** Use `<Status>` (light + label), not a bare `<Led>`, unless the light sits inside a `<Key>` that already has a label.
5. **Raised means pressable. Pressed-in means typed into, or switched on.** Don't put the raised shadow on things people can't press.
6. **Labels are short and uppercase-by-style.** Write them in normal case in code (`<Label>System status</Label>`). The CSS uppercases them, and screen readers read them normally.
7. **Check all four themes before you call a screen done:** `nova`, `nova-dark`, `flat`, `flat-dark`. Set `data-theme` on `<html>`. If anything looks wrong in one theme, you used a raw value somewhere.

## Setup

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Krona+One&display=swap" rel="stylesheet" />
```

```ts
import 'nova/src/styles/tokens.css'
import 'nova/src/styles/components.css'
import { Button, Key, Panel, Field } from 'nova/src/components'
```

Wrap the app in `className="nv-root"` so the background, text color and font are set.

## Components

| Component | Use it for | Don't use it for |
|---|---|---|
| `Button` (`variant`: default, primary, ghost, danger; `size`: sm, md, lg) | Actions | Navigation between pages (use a link) |
| `Key` (`icon`, `label`, `pressed`, `led`) | Modes, tools, the current section | Form submission |
| `Status` (`on`, `tone`) / `Led` | System state: online, offline, listening | Decoration |
| `Panel` (`variant`: raised, sunken; `flush`) + `PanelHeader` | Grouping related content | Wrapping a single button |
| `Field` (`label`, `hint`, `error`, `multiline`) | Every text input. It wires the label and errors for screen readers | Search boxes without a visible label (add one) |
| `Toggle` (`checked`, `onChange`) | On/off settings that apply right away | Choices that need a Save button (use a checkbox in a form) |
| `Segmented` (`options`, `value`, `onChange`, `label`) | One choice from 2–5 | More than 5 options (use a select) |
| `Tag` (`accent`) | Small facts: status, type, version | Buttons |
| `Display` (`lines`, `cursor`) | System messages and short logs | Long reading or chat history |
| `Grill` (`size`, `rings`, `active`, `label`) | Nova's signature mark and a voice-activity meter | Loading spinners |
| `Label`, `Wordmark`, `Divider` | Small mono labels, the brand name, section breaks | Body text |

## Tokens you'll use most

- Color: `--nv-bg`, `--nv-surface`, `--nv-surface-alt`, `--nv-sunken`, `--nv-text`, `--nv-text-2`, `--nv-text-3`, `--nv-accent`, `--nv-danger`, `--nv-success`, `--nv-warning`, `--nv-border`
- Depth: `--nv-shadow-raised`, `--nv-shadow-card`, `--nv-shadow-key`, `--nv-shadow-pressed`
- Space: `--nv-space-1` (2px) to `--nv-space-11` (64px)
- Radius: `--nv-radius-xs` to `--nv-radius-xl`, `--nv-radius-full`
- Type: `--nv-font-sans`, `--nv-font-mono`, `--nv-font-display`, `--nv-size-label` to `--nv-size-3xl`

The source of truth is `tokens/tokens.json`. `npm run tokens` regenerates `src/styles/tokens.css`. Never edit `tokens.css` by hand.

## Before you say "done"

- [ ] No raw colors, shadows or font sizes in the code you wrote (search for `#`, `rgb`, `px` in style props).
- [ ] At most one primary button on the screen.
- [ ] Every input has a visible label. Every light has a text label.
- [ ] Keyboard works: Tab reaches every control, focus rings are visible, the segmented control moves with arrow keys.
- [ ] Looked at the screen in all four themes.
- [ ] Listed any component you needed but Nova didn't have.
