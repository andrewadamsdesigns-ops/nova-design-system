// Harness for viewing the agent's screen. Written by the reviewer, not the agent.
import { createRoot } from 'react-dom/client'
import '../../src/styles/tokens.css'
import '../../src/styles/components.css'
import SettingsScreen from './SettingsScreen'

createRoot(document.getElementById('root')!).render(<SettingsScreen />)
