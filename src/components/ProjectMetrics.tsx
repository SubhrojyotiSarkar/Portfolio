import { cn } from '../lib/cn'
import type { ProjectMetric } from '../types'

export function ProjectMetrics({ metrics, className }: { metrics: ProjectMetric[]; className?: string }) {
  if (metrics.length === 0) return null

  return (
    <dl className={cn('flex flex-wrap gap-x-8 gap-y-4', className)}>
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col-reverse">
          <dt className="text-xs text-fg-subtle">{m.label}</dt>
          <dd className="text-lg font-semibold tracking-tight text-fg">{m.value}</dd>
        </div>
      ))}
    </dl>
  )
}
