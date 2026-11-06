import { cn } from '../lib/cn'

export function TechTag({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-xs text-fg-muted',
        className,
      )}
    >
      {label}
    </span>
  )
}

export function TechList({ items, label = 'Technologies' }: { items: string[]; label?: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <TechTag label={item} />
        </li>
      ))}
    </ul>
  )
}
