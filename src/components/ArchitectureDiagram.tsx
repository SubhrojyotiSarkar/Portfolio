import { m } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Fragment } from 'react'
import { cn } from '../lib/cn'
import { fadeUp, stagger } from '../lib/motion'
import type { Diagram, DiagramNode, DiagramStage } from '../types'

interface NormalizedStage {
  key: string
  label?: string
  nodes: DiagramNode[]
}

function normalize(stage: DiagramStage): NormalizedStage {
  const nodes = Array.isArray(stage) ? stage : stage.nodes
  return {
    key: nodes.map((n) => n.id).join('+'),
    label: Array.isArray(stage) ? undefined : stage.label,
    nodes,
  }
}

/** Static class names so Tailwind can see them. */
const groupColumns: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
}

function Node({ node, highlighted }: { node: DiagramNode; highlighted: boolean }) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col justify-center rounded-lg border px-3 py-3 text-center sm:px-4',
        highlighted ? 'border-accent-muted bg-accent-soft' : 'border-line-strong bg-surface-2',
      )}
    >
      <span className="text-sm font-medium text-fg">{node.label}</span>
      {node.detail && <span className="mt-0.5 text-xs text-fg-subtle">{node.detail}</span>}
    </div>
  )
}

function Connector() {
  return (
    <div aria-hidden="true" className="flex flex-col items-center py-1.5 text-fg-subtle">
      <span className="h-3 w-px bg-line-strong" />
      <ArrowDown size={14} />
    </div>
  )
}

/**
 * Vertical flow diagram. Grouped stages render side by side inside a
 * labelled box; the first and last stages are highlighted. A plain
 * ordered list mirrors the diagram for screen readers.
 */
export function ArchitectureDiagram({ diagram, className }: { diagram: Diagram; className?: string }) {
  const stages = diagram.stages.map(normalize)
  const lastIndex = stages.length - 1

  return (
    <figure className={cn('w-full', className)}>
      <m.div
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        aria-hidden="true"
      >
        {stages.map((stage, i) => {
          const grouped = stage.nodes.length > 1
          return (
            <Fragment key={stage.key}>
              {i > 0 && <Connector />}
              <m.div variants={fadeUp}>
                {grouped ? (
                  <div className="rounded-xl border border-dashed border-line-strong/70 p-2 pt-1.5">
                    {stage.label && (
                      <p className="mb-1.5 px-1 font-mono text-[0.625rem] uppercase tracking-wider text-fg-subtle">
                        {stage.label}
                      </p>
                    )}
                    <div className={cn('grid gap-2', groupColumns[Math.min(stage.nodes.length, 4)])}>
                      {stage.nodes.map((node) => (
                        <Node key={node.id} node={node} highlighted={i === 0 || i === lastIndex} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <Node node={stage.nodes[0]} highlighted={i === 0 || i === lastIndex} />
                  </div>
                )}
              </m.div>
            </Fragment>
          )
        })}
      </m.div>

      <ol className="sr-only">
        {stages.map((stage) => (
          <li key={stage.key}>
            {stage.label ? `${stage.label}: ` : ''}
            {stage.nodes.map((n) => (n.detail ? `${n.label} (${n.detail})` : n.label)).join(', ')}
          </li>
        ))}
      </ol>

      {diagram.caption && <figcaption className="mt-4 text-center text-xs text-fg-subtle">{diagram.caption}</figcaption>}
    </figure>
  )
}
