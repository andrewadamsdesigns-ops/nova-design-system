import { useId, type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react'

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ')

export type Tone = 'accent' | 'success' | 'warning' | 'danger'

/* Text */

export function Label({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx('nv-label', className)} {...rest} />
}

export function Wordmark({ children, size = 48, className, ...rest }: HTMLAttributes<HTMLSpanElement> & { size?: number }) {
  return <span className={cx('nv-wordmark', className)} style={{ fontSize: size }} {...rest}>{children}</span>
}

/* Status light */

export function Led({ on = false, tone = 'accent', label }: { on?: boolean; tone?: Tone; label?: string }) {
  return <span className="nv-led" data-on={on} data-tone={tone} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} />
}

/** A status light with a mono label, like AUTH / SYS / NET. */
export function Status({ on = false, tone = 'accent', children }: { on?: boolean; tone?: Tone; children: ReactNode }) {
  return (
    <span className="nv-status">
      <Led on={on} tone={tone} />
      <Label>{children}</Label>
    </span>
  )
}

/* Button */

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'default', size = 'md', className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={cx('nv-button', variant !== 'default' && `nv-button--${variant}`, size !== 'md' && `nv-button--${size}`, className)}
      {...rest}
    />
  )
}

/* Key: square hardware key. Use `pressed` for toggles or the current section. */

type KeyProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  icon: ReactNode
  label: string
  pressed?: boolean
  led?: boolean
}

export function Key({ icon, label, pressed, led, className, type = 'button', ...rest }: KeyProps) {
  return (
    <button type={type} className={cx('nv-key', className)} aria-pressed={pressed} {...rest}>
      {led !== undefined && <Led on={led} />}
      <span aria-hidden="true">{icon}</span>
      <span className="nv-key__label">{label}</span>
    </button>
  )
}

/* Panel */

type PanelProps = HTMLAttributes<HTMLElement> & { variant?: 'raised' | 'sunken'; flush?: boolean; as?: 'section' | 'div' | 'article' }

export function Panel({ variant = 'raised', flush, as: Tag = 'section', className, ...rest }: PanelProps) {
  return <Tag className={cx('nv-panel', variant === 'sunken' && 'nv-panel--sunken', flush && 'nv-panel--flush', className)} {...rest} />
}

export function PanelHeader({ title, action }: { title: ReactNode; action?: ReactNode }) {
  return (
    <div className="nv-panel__header">
      <Label>{title}</Label>
      {action}
    </div>
  )
}

/* Field: label, input, hint and error wired together for screen readers. */

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string; multiline?: boolean }

export function Field({ label, hint, error, multiline, id, className, ...rest }: FieldProps) {
  const auto = useId()
  const inputId = id ?? auto
  const describedBy = [hint && `${inputId}-hint`, error && `${inputId}-error`].filter(Boolean).join(' ') || undefined
  const shared = { id: inputId, className: cx('nv-input', className), 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy }
  return (
    <div className="nv-field">
      <label htmlFor={inputId} className="nv-label">{label}</label>
      {multiline
        ? <textarea {...shared} {...(rest as unknown as HTMLAttributes<HTMLTextAreaElement>)} />
        : <input {...shared} {...rest} />}
      {hint && <span id={`${inputId}-hint`} className="nv-field__hint">{hint}</span>}
      {error && <span id={`${inputId}-error`} className="nv-field__error">{error}</span>}
    </div>
  )
}

/* Toggle */

export function Toggle({ checked, onChange, children, disabled }: { checked: boolean; onChange: (next: boolean) => void; children: ReactNode; disabled?: boolean }) {
  return (
    <button type="button" role="switch" aria-checked={checked} disabled={disabled} className="nv-toggle" onClick={() => onChange(!checked)}>
      <span className="nv-toggle__track"><span className="nv-toggle__thumb" /></span>
      <span>{children}</span>
    </button>
  )
}

/* Segmented control: one choice from a short list. Arrow keys move the choice. */

export function Segmented<T extends string>({ options, value, onChange, label }: { options: Array<{ value: T; label: string }>; value: T; onChange: (v: T) => void; label: string }) {
  const move = (dir: number) => {
    const i = options.findIndex((o) => o.value === value)
    onChange(options[(i + dir + options.length) % options.length].value)
  }
  return (
    <div className="nv-segmented" role="radiogroup" aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(1) }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(-1) }
      }}>
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={o.value === value} tabIndex={o.value === value ? 0 : -1}
          className="nv-segmented__option" onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

/* Tag */

export function Tag({ accent, className, ...rest }: HTMLAttributes<HTMLSpanElement> & { accent?: boolean }) {
  return <span className={cx('nv-tag', accent && 'nv-tag--accent', className)} {...rest} />
}

/* Display: the dark readout screen. Each line gets a > prompt. */

export function Display({ lines, cursor = true, label }: { lines: string[]; cursor?: boolean; label?: string }) {
  return (
    <div className="nv-display" role="log" aria-label={label ?? 'System readout'}>
      {lines.map((l, i) => <div key={i} className="nv-display__line">{l}</div>)}
      {cursor && <span className="nv-display__cursor" aria-hidden="true" />}
    </div>
  )
}

/* Grill: the speaker-dot pattern. `active` pulses it as a voice activity meter. */

export function Grill({ size = 160, rings = 7, active = false, label }: { size?: number; rings?: number; active?: boolean; label?: string }) {
  // A square grid of dots trimmed to a circle, like a speaker grille. `rings` is the radius in dots.
  const dots: Array<{ x: number; y: number; d: number }> = []
  const limit = (rings + 0.35) ** 2
  for (let y = -rings; y <= rings; y++) {
    for (let x = -rings; x <= rings; x++) {
      const dist = x * x + y * y
      if (dist <= limit) dots.push({ x, y, d: Math.round(Math.sqrt(dist) * 90) })
    }
  }
  const dotR = 0.3
  const extent = rings + dotR + 0.1
  return (
    <svg className="nv-grill" data-active={active} width={size} height={size} viewBox={`${-extent} ${-extent} ${extent * 2} ${extent * 2}`}
      role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {dots.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={dotR} style={{ ['--d' as string]: p.d }} />)}
    </svg>
  )
}

/* Divider */

export function Divider() {
  return <hr className="nv-divider" />
}
