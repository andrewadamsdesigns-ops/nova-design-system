// Small stroke icons used by the docs. 24px grid, 1.75 stroke, currentColor.
const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export const IconSliders = () => (
  <svg {...base}><path d="M5 4v7M5 15v5M12 4v3M12 11v9M19 4v9M19 17v3" /><path d="M3 13h4M10 9h4M17 15h4" /></svg>
)
export const IconMic = () => (
  <svg {...base}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
)
export const IconClock = () => (
  <svg {...base}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
)
export const IconGear = () => (
  <svg {...base}><circle cx="12" cy="12" r="3" /><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" /></svg>
)
export const IconNote = () => (
  <svg {...base}><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 12h6M9 16h6" /></svg>
)
export const IconPower = () => (
  <svg {...base}><path d="M12 3v8" /><path d="M7 6.5a7 7 0 1 0 10 0" /></svg>
)
