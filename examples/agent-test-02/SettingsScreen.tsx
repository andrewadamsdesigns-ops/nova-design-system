import { useEffect, useState, type FormEvent } from 'react'
import {
  Button,
  Divider,
  Field,
  Label,
  Page,
  Panel,
  PanelHeader,
  Segmented,
  Stack,
  Status,
  Text,
  Toggle,
  Wordmark,
} from '../../src/components'

type Speed = 'slow' | 'normal' | 'fast'
type Theme = 'nova' | 'nova-dark' | 'flat' | 'flat-dark'

const SPEED_OPTIONS: Array<{ value: Speed; label: string }> = [
  { value: 'slow', label: 'Slow' },
  { value: 'normal', label: 'Normal' },
  { value: 'fast', label: 'Fast' },
]

const THEME_OPTIONS: Array<{ value: Theme; label: string }> = [
  { value: 'nova', label: 'Nova' },
  { value: 'nova-dark', label: 'Nova dark' },
  { value: 'flat', label: 'Flat' },
  { value: 'flat-dark', label: 'Flat dark' },
]

export default function SettingsScreen() {
  // Demo state. A real app would read these from the assistant service and the account session.
  const [online] = useState(true)
  const accountName = 'Andrew Adams'

  const [wakeWord, setWakeWord] = useState('Hey Nova')
  const [wakeDraft, setWakeDraft] = useState(wakeWord)
  const [wakeError, setWakeError] = useState<string | undefined>()

  const [saveHistory, setSaveHistory] = useState(true)
  const [speed, setSpeed] = useState<Speed>('normal')
  const [theme, setTheme] = useState<Theme>('nova')
  const [signedOut, setSignedOut] = useState(false)

  // Theme applies instantly by setting data-theme on <html>, as AGENTS.md describes.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const saveWakeWord = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = wakeDraft.trim()
    if (next.split(/\s+/).length < 2) {
      setWakeError('Use at least two words so the assistant does not wake by accident.')
      return
    }
    setWakeError(undefined)
    setWakeWord(next)
  }

  return (
    <div className="nv-root">
      <Page width="sm">
        <Stack gap={8}>
          <Stack gap={3}>
            <Wordmark>Nova</Wordmark>
            <h1 className="nv-panel__title">Assistant settings</h1>
          </Stack>

          <Panel aria-labelledby="status-heading">
            <Stack gap={5}>
              <PanelHeader id="status-heading" title="Assistant" />
              <Status on={online} tone={online ? 'success' : 'danger'}>
                {online ? 'Online' : 'Offline'}
              </Status>
            </Stack>
          </Panel>

          <Panel aria-labelledby="voice-heading">
            <Stack gap={6}>
              <PanelHeader id="voice-heading" title="Voice" />

              <form onSubmit={saveWakeWord}>
                <Stack gap={4}>
                  <Field
                    label="Wake word"
                    hint={`Current wake word: ${wakeWord}`}
                    error={wakeError}
                    value={wakeDraft}
                    onChange={(e) => setWakeDraft(e.target.value)}
                  />
                  <Stack direction="row" justify="end">
                    <Button type="submit" disabled={wakeDraft.trim() === wakeWord}>
                      Save wake word
                    </Button>
                  </Stack>
                </Stack>
              </form>

              <Divider />

              <Segmented label="Voice speed" options={SPEED_OPTIONS} value={speed} onChange={setSpeed} />
            </Stack>
          </Panel>

          <Panel aria-labelledby="privacy-heading">
            <Stack gap={5}>
              <PanelHeader id="privacy-heading" title="Privacy" />
              <Toggle checked={saveHistory} onChange={setSaveHistory}>
                Save conversation history
              </Toggle>
            </Stack>
          </Panel>

          <Panel aria-labelledby="appearance-heading">
            <Stack gap={5}>
              <PanelHeader id="appearance-heading" title="Appearance" />
              <Segmented label="Theme" options={THEME_OPTIONS} value={theme} onChange={setTheme} />
            </Stack>
          </Panel>

          <Panel aria-labelledby="account-heading">
            <Stack gap={5}>
              <PanelHeader id="account-heading" title="Account" />
              <Stack direction="row" align="center" justify="between" wrap gap={4}>
                <Stack gap={2}>
                  <Label>Signed in as</Label>
                  <Text size="lg">{signedOut ? 'Signed out' : accountName}</Text>
                </Stack>
                <Button onClick={() => setSignedOut(true)} disabled={signedOut}>
                  Sign out
                </Button>
              </Stack>
            </Stack>
          </Panel>
        </Stack>
      </Page>
    </div>
  )
}
