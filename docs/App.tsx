import { useEffect, useState, type ReactNode } from 'react'
import { Button, Display, Divider, Field, Grill, Key, Label, Led, Panel, PanelHeader, Segmented, Status, Tag, Toggle, Wordmark } from '../src/components'
import { IconClock, IconGear, IconMic, IconNote, IconPower, IconSliders } from './icons'
import tokens from '../tokens/tokens.json'

type ThemeName = 'nova' | 'nova-dark' | 'flat' | 'flat-dark'
const THEMES: Array<{ value: ThemeName; label: string }> = [
  { value: 'nova', label: 'Nova' },
  { value: 'nova-dark', label: 'Nova Dark' },
  { value: 'flat', label: 'Flat' },
  { value: 'flat-dark', label: 'Flat Dark' },
]

const SWATCHES = ['bg', 'surface', 'surface-alt', 'sunken', 'text', 'text-2', 'text-3', 'accent', 'success', 'warning', 'danger', 'display'] as const

function useTheme() {
  const [theme, setTheme] = useState<ThemeName>(() => {
    try { return (localStorage.getItem('nv-theme') as ThemeName) || 'nova' } catch { return 'nova' }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('nv-theme', theme) } catch { /* private mode */ }
  }, [theme])
  return [theme, setTheme] as const
}

function Section({ id, index, title, intro, children }: { id: string; index: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="doc-section" aria-labelledby={`${id}-title`}>
      <div className="doc-section__head">
        <Label>{index}</Label>
        <h2 id={`${id}-title`}>{title}</h2>
        {intro && <p className="doc-intro">{intro}</p>}
      </div>
      {children}
    </section>
  )
}

function Specimen({ name, children, note }: { name: string; children: ReactNode; note?: string }) {
  return (
    <Panel as="article" className="doc-specimen">
      <PanelHeader title={name} />
      <div className="doc-specimen__stage">{children}</div>
      {note && <p className="doc-note">{note}</p>}
    </Panel>
  )
}

/* A full Nova screen built only from the components above. */
function AssistantHome() {
  const [mode, setMode] = useState('home')
  const [listening, setListening] = useState(false)
  return (
    <Panel className="demo">
      <div className="demo__top">
        <Status on tone="accent">Auth</Status>
        <Status on tone="success">Sys</Status>
        <Status on={listening} tone="success">Mic</Status>
      </div>
      <div className="demo__center">
        <Wordmark size={40}>Nova</Wordmark>
        <p className="demo__ask">What can I help you with?</p>
        <button type="button" className="demo__grill" onClick={() => setListening((v) => !v)} aria-pressed={listening}
          aria-label={listening ? 'Stop listening' : 'Start listening'}>
          <Grill size={150} active={listening} />
        </button>
        <div className="demo__keys" role="toolbar" aria-label="Modes">
          <Key icon={<IconSliders />} label="Home" pressed={mode === 'home'} led={mode === 'home'} onClick={() => setMode('home')} />
          <Key icon={<IconMic />} label="Voice" pressed={mode === 'voice'} led={mode === 'voice'} onClick={() => setMode('voice')} />
          <Key icon={<IconClock />} label="Hist" pressed={mode === 'hist'} led={mode === 'hist'} onClick={() => setMode('hist')} />
          <Key icon={<IconGear />} label="Set" pressed={mode === 'set'} led={mode === 'set'} onClick={() => setMode('set')} />
        </div>
      </div>
      <Display lines={[
        listening ? 'Listening' : 'Good evening. Nova is ready.',
        `Mode: ${mode.toUpperCase()}`,
      ]} />
    </Panel>
  )
}

export function App() {
  const [theme, setTheme] = useTheme()
  const [toggles, setToggles] = useState({ wake: true, history: false })
  const [density, setDensity] = useState<'calm' | 'standard' | 'dense'>('calm')
  const [power, setPower] = useState(true)

  return (
    <div className="nv-root doc">
      <a className="doc-skip" href="#main">Skip to content</a>
      <header className="doc-bar">
        <div className="doc-bar__brand">
          <Grill size={22} rings={3} />
          <Wordmark size={14}>Nova</Wordmark>
          <Tag>v0.1</Tag>
        </div>
        <nav aria-label="Sections" className="doc-bar__nav">
          <a href="#foundations">Foundations</a>
          <a href="#components">Components</a>
          <a href="#in-use">In use</a>
          <a href="#agents">For AI agents</a>
        </nav>
        <div className="doc-bar__end">
          <a className="doc-bar__gh" href="https://github.com/andrewadamsdesigns-ops/nova-design-system">GitHub</a>
          <Segmented label="Theme" options={THEMES} value={theme} onChange={setTheme} />
        </div>
      </header>

      <main id="main">
        <section className="doc-hero" aria-labelledby="hero-title">
          <div className="doc-hero__copy">
            <div className="doc-hero__status">
              <Status on tone="accent">Auth</Status>
              <Status on tone="success">Sys</Status>
              <Status on tone="success">Net</Status>
            </div>
            <h1 id="hero-title" className="doc-hero__title">
              <Wordmark size={72}>Nova</Wordmark>
            </h1>
            <p className="doc-hero__lede">
              A retro-modern design system. Warm hardware, soft keys, one orange light.
              Built to feel calm, and built so an AI coding agent can use it without guessing.
            </p>
            <div className="doc-hero__actions">
              <Button variant="primary" size="lg" onClick={() => document.getElementById('in-use')?.scrollIntoView({ behavior: 'smooth' })}>See it in use</Button>
              <Button size="lg" onClick={() => document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' })}>Use it with AI</Button>
            </div>
          </div>
          <div className="doc-hero__art" aria-hidden="true">
            <Grill size={300} rings={9} />
          </div>
        </section>

        <Section id="foundations" index="01" title="Foundations"
          intro="Every value lives in one tokens file. Switch the theme in the top bar: the same tokens change, and nothing else has to.">
          <div className="doc-grid doc-grid--swatches">
            {SWATCHES.map((s) => (
              <div key={s} className="doc-swatch">
                <span className="doc-swatch__chip" style={{ background: `var(--nv-${s})` }} />
                <Label>{s}</Label>
                <code>--nv-{s}</code>
              </div>
            ))}
          </div>

          <div className="doc-grid doc-grid--2">
            <Panel>
              <PanelHeader title="Type" />
              <div className="doc-type">
                <div><Wordmark size={28}>Nova</Wordmark><code>display · Krona One</code></div>
                <div><span style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em' }}>Calm over clever</span><code>2xl · IBM Plex Sans 600</code></div>
                <div><span style={{ fontSize: 16 }}>The best interface is the one you barely notice.</span><code>md · IBM Plex Sans 400</code></div>
                <div><Label>System status · online</Label><code>label · IBM Plex Mono 500, 0.14em</code></div>
              </div>
            </Panel>
            <Panel>
              <PanelHeader title="Depth" />
              <div className="doc-depth">
                <div className="doc-depth__tile" style={{ boxShadow: 'var(--nv-shadow-raised)' }}><Label>Raised</Label></div>
                <div className="doc-depth__tile" style={{ boxShadow: 'var(--nv-shadow-card)' }}><Label>Card</Label></div>
                <div className="doc-depth__tile" style={{ boxShadow: 'var(--nv-shadow-key)' }}><Label>Key</Label></div>
                <div className="doc-depth__tile" style={{ boxShadow: 'var(--nv-shadow-pressed)', background: 'var(--nv-sunken)' }}><Label>Pressed</Label></div>
              </div>
              <p className="doc-note">Things you can press are raised. Things you type into, or that are switched on, are pressed in.</p>
            </Panel>
          </div>
        </Section>

        <Section id="components" index="02" title="Components"
          intro="Ten pieces. Each one is a CSS class you can use anywhere, plus a thin React wrapper that handles the accessibility for you.">
          <div className="doc-grid doc-grid--2">
            <Specimen name="Button" note="Primary is the one action that matters most on a screen. Use it once.">
              <div className="doc-row">
                <Button variant="primary">Run</Button>
                <Button>Save draft</Button>
                <Button variant="ghost">Cancel</Button>
                <Button variant="danger">Delete</Button>
                <Button disabled>Disabled</Button>
              </div>
            </Specimen>
            <Specimen name="Key" note="Square hardware keys for modes and tools. The light shows which one is on.">
              <div className="doc-row">
                <Key icon={<IconPower />} label="Power" pressed={power} led={power} onClick={() => setPower((p) => !p)} />
                <Key icon={<IconNote />} label="Notes" />
                <Key icon={<IconMic />} label="Voice" />
              </div>
            </Specimen>
            <Specimen name="Status light" note="A light never carries meaning alone. Pair it with a label.">
              <div className="doc-row">
                <Status on tone="accent">Auth</Status>
                <Status on tone="success">Online</Status>
                <Status on tone="warning">Low credit</Status>
                <Status on tone="danger">Offline</Status>
                <Status>Standby</Status>
              </div>
            </Specimen>
            <Specimen name="Toggle">
              <div className="doc-stack">
                <Toggle checked={toggles.wake} onChange={(v) => setToggles((t) => ({ ...t, wake: v }))}>Wake word</Toggle>
                <Toggle checked={toggles.history} onChange={(v) => setToggles((t) => ({ ...t, history: v }))}>Save history</Toggle>
              </div>
            </Specimen>
            <Specimen name="Segmented" note="One choice from two to five. Arrow keys move the choice.">
              <Segmented label="Density" value={density} onChange={setDensity}
                options={[{ value: 'calm', label: 'Calm' }, { value: 'standard', label: 'Standard' }, { value: 'dense', label: 'Dense' }]} />
            </Specimen>
            <Specimen name="Field">
              <div className="doc-stack">
                <Field label="Operator" placeholder="demo" hint="Your name on this console." />
                <Field label="Access code" type="password" placeholder="••••" error="That code didn't match. Try again." />
              </div>
            </Specimen>
            <Specimen name="Display" note="The readout screen. For system messages and short logs, not for long reading.">
              <Display lines={['Nova control system v1.0', 'Task router: online', 'Awaiting operator']} />
            </Specimen>
            <Specimen name="Grill and tag" note="The grill is Nova's signature and doubles as a voice meter. Tags label small facts.">
              <div className="doc-row doc-row--center">
                <Grill size={96} rings={5} />
                <Grill size={96} rings={5} active label="Listening" />
                <div className="doc-stack">
                  <Tag accent>Case study</Tag>
                  <Tag>Concept</Tag>
                  <Tag><Led on tone="success" /> Live</Tag>
                </div>
              </div>
            </Specimen>
          </div>
        </Section>

        <Section id="in-use" index="03" title="In use"
          intro="A full Nova screen made only from the components on this page. Tap the grill to start listening, and press the keys to switch modes.">
          <div className="doc-demo-wrap">
            <AssistantHome />
          </div>
        </Section>

        <Section id="agents" index="04" title="For AI agents"
          intro="Most design systems are written for people. Nova also ships a rules file, so an AI coding agent builds with the system instead of inventing new styles.">
          <div className="doc-grid doc-grid--2">
            <Panel>
              <PanelHeader title="AGENTS.md, in short" />
              <ol className="doc-rules">
                <li>Build screens only from Nova components and tokens. No hex codes, no new shadows.</li>
                <li>If a component is missing, stop and say so. Don't make a near-copy.</li>
                <li>One primary button per screen.</li>
                <li>Every status light gets a text label.</li>
                <li>Check the screen in all four themes before calling it done.</li>
              </ol>
            </Panel>
            <Panel variant="sunken">
              <PanelHeader title="Try it" action={<Tag>Prompt</Tag>} />
              <Display cursor={false} lines={[
                'Read AGENTS.md first.',
                'Build a settings screen for a voice assistant',
                'using only Nova components.',
                'List any component you needed but did not have.',
              ]} />
            </Panel>
          </div>
        </Section>

        <Divider />
        <footer className="doc-footer">
          <Label>Nova design system · MIT license</Label>
          <span>
            Designed by <a href="https://andrewadamsdesigns.com/">Andrew Adams</a>. {Object.keys(tokens.themes).length} themes, one tokens file.{' '}
            <a href="https://github.com/andrewadamsdesigns-ops/nova-design-system">Source on GitHub</a>.
          </span>
        </footer>
      </main>
    </div>
  )
}
