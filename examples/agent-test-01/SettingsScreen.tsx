import { useEffect, useState, type CSSProperties } from 'react'
import { Button, Divider, Field, Label, Panel, PanelHeader, Segmented, Status, Toggle, Wordmark } from '../../src/components'

type Speed = 'slow' | 'normal' | 'fast'
type Theme = 'nova' | 'nova-dark' | 'flat' | 'flat-dark'

// Nova has no layout primitive (Stack / Row), so spacing uses tokens directly.
const stack: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 'var(--nv-space-5)' }
const row: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--nv-space-4)', flexWrap: 'wrap' }
const group: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 'var(--nv-space-2)' }

export default function SettingsScreen() {
  const [online] = useState(true)
  const [savedWakeWord, setSavedWakeWord] = useState('Hey Nova')
  const [wakeWord, setWakeWord] = useState('Hey Nova')
  const [saveHistory, setSaveHistory] = useState(true)
  const [speed, setSpeed] = useState<Speed>('normal')
  const [theme, setTheme] = useState<Theme>('nova')
  const accountName = 'Andrew Adams'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const trimmed = wakeWord.trim()
  const wakeError = trimmed.length === 0 ? 'Enter a wake word.' : undefined
  const wakeDirty = trimmed !== savedWakeWord

  return (
    <div className="nv-root" style={{ minHeight: '100vh', padding: 'var(--nv-space-8) var(--nv-space-5)' }}>
      <main style={{ ...stack, maxWidth: '40rem', margin: '0 auto' }}>
        <header style={row}>
          <Wordmark size={32}>Nova</Wordmark>
          <Status on={online} tone={online ? 'success' : 'danger'}>{online ? 'Assistant online' : 'Assistant offline'}</Status>
        </header>

        <Panel aria-labelledby="voice-heading">
          <PanelHeader title={<span id="voice-heading">Voice</span>} />
          <div style={stack}>
            <form
              style={group}
              onSubmit={(e) => {
                e.preventDefault()
                if (!wakeError) setSavedWakeWord(trimmed)
              }}
            >
              <Field
                label="Wake word"
                hint={`Current wake word: ${savedWakeWord}`}
                error={wakeError}
                value={wakeWord}
                onChange={(e) => setWakeWord(e.target.value)}
              />
              <div>
                <Button type="submit" variant="primary" disabled={!wakeDirty || !!wakeError}>Save wake word</Button>
              </div>
            </form>

            <Divider />

            <div style={group}>
              <Label>Voice speed</Label>
              <Segmented<Speed>
                label="Voice speed"
                value={speed}
                onChange={setSpeed}
                options={[
                  { value: 'slow', label: 'Slow' },
                  { value: 'normal', label: 'Normal' },
                  { value: 'fast', label: 'Fast' },
                ]}
              />
            </div>
          </div>
        </Panel>

        <Panel aria-labelledby="privacy-heading">
          <PanelHeader title={<span id="privacy-heading">Privacy</span>} />
          <Toggle checked={saveHistory} onChange={setSaveHistory}>Save conversation history</Toggle>
        </Panel>

        <Panel aria-labelledby="appearance-heading">
          <PanelHeader title={<span id="appearance-heading">Appearance</span>} />
          <div style={group}>
            <Label>Theme</Label>
            <Segmented<Theme>
              label="Theme"
              value={theme}
              onChange={setTheme}
              options={[
                { value: 'nova', label: 'Nova' },
                { value: 'nova-dark', label: 'Nova dark' },
                { value: 'flat', label: 'Flat' },
                { value: 'flat-dark', label: 'Flat dark' },
              ]}
            />
          </div>
        </Panel>

        <Panel aria-labelledby="account-heading">
          <PanelHeader title={<span id="account-heading">Account</span>} />
          <div style={row}>
            <div style={group}>
              <Label>Signed in as</Label>
              <span>{accountName}</span>
            </div>
            <Button onClick={() => { /* sign-out handler goes here */ }}>Sign out</Button>
          </div>
        </Panel>
      </main>
    </div>
  )
}
