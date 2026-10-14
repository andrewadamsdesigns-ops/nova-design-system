# Nova

A retro-modern design system. Warm hardware, soft keys, one orange light.

**Live docs:** [andrewadamsdesigns.com/nova](https://andrewadamsdesigns.com/nova/)

Nova started as a concept for an AI assistant that feels like a well-made piece of equipment instead of a chat window: inspired by vintage consoles and Dieter Rams–style industrial design. This repo turns that look into a system anyone can use, and that an AI coding agent can use without guessing.

## What's inside

- **Tokens** (`tokens/tokens.json`): one source file for color, type, space, radius, depth and motion. Four themes: `nova`, `nova-dark`, `flat`, `flat-dark`.
- **Components** (`src/`): plain CSS classes (`nv-*`) plus thin React wrappers that handle accessibility: Button, Key, Status light, Panel, Field, Toggle, Segmented, Tag, Display, Grill, and layout pieces (Stack, Page, Text).
- **Agent tests** (`examples/`): two fresh AI agents built the same settings screen from the same prompt, on v0.1 and v0.2. Each folder has the screen and the agent's own notes on what was missing.
- **AGENTS.md**: the rules file for AI coding agents (Claude Code, Codex, Cursor and others read it). It tells them to build only from the system, to say when a component is missing instead of inventing one, and to check every theme.
- **Docs** (`docs/`): a single page showing every token and component, and a full Nova screen built only from the components.

## Run it

```bash
npm install
npm run dev
```

`npm run build` regenerates the tokens, type-checks and builds the docs into `dist/`.

## Principles

1. **Calm over clever.** The interface stays quiet until you need it.
2. **Raised means pressable.** Depth tells you what you can touch.
3. **One light at a time.** Orange marks the one thing that's on or matters most.
4. **Systems for people and agents.** If an agent can't follow the rules, the rules aren't clear enough.

## License

MIT. Use it, fork it, ship it.

Designed by [Andrew Adams](https://andrewadamsdesigns.com). Live docs: [andrewadamsdesigns.com/nova](https://andrewadamsdesigns.com/nova/).
