import { m } from 'framer-motion'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { easeOutSoft } from '../lib/motion'

const flagship = projects.find((p) => p.flagship)

type Token = { text: string; tone?: 'key' | 'str' | 'punct' | 'kw' | 'comment' }
type Line = Token[]

const str = (text: string): Token => ({ text: `"${text}"`, tone: 'str' })
const p = (text: string): Token => ({ text, tone: 'punct' })
const key = (text: string): Token => ({ text, tone: 'key' })

/** Built from data so the card never drifts from the real profile. */
const lines: Line[] = [
  [{ text: '// about.ts', tone: 'comment' }],
  [{ text: 'export const ', tone: 'kw' }, { text: 'engineer' }, p(' = {')],
  [{ text: '  ' }, key('name'), p(': '), str(profile.name), p(',')],
  [{ text: '  ' }, key('focus'), p(': ['), str('AI engineering'), p(', '), str('Backend'), p('],')],
  [{ text: '  ' }, key('building'), p(': '), str('Hybrid-search RAG'), p(',')],
  [{ text: '  ' }, key('stack'), p(': ['), str('Python'), p(', '), str('FastAPI'), p(', '), str('React'), p('],')],
  [{ text: '  ' }, key('education'), p(': '), str('B.Tech CSE · VIT-AP'), p(',')],
  [{ text: '  ' }, key('graduating'), p(': '), { text: '2027', tone: 'kw' }, p(',')],
  [p('}')],
]

const toneClass: Record<NonNullable<Token['tone']>, string> = {
  key: 'text-[#9ab8f0]',
  str: 'text-accent-strong',
  punct: 'text-fg-subtle',
  kw: 'text-[#c7a6f0]',
  comment: 'text-fg-subtle italic',
}

export function TerminalCard() {
  return (
    <m.figure
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25, ease: easeOutSoft }}
      className="relative w-full min-w-0"
      aria-label="Code snippet summarising Subhrojyoti's focus areas"
    >
      <div className="overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="ml-3 font-mono text-xs text-fg-subtle">~/portfolio — about.ts</span>
        </div>

        <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.75rem] leading-7 sm:text-[0.8125rem]">
          <code>
            {lines.map((line, i) => (
              <span key={i} className="flex">
                <span aria-hidden="true" className="mr-4 inline-block w-4 shrink-0 select-none text-right text-line-strong sm:mr-5">
                  {i + 1}
                </span>
                <span>
                  {line.map((token, j) => (
                    <span key={j} className={token.tone ? toneClass[token.tone] : 'text-fg'}>
                      {token.text}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </code>
        </pre>

        {flagship && (
          <div className="flex items-center gap-2 border-t border-line px-5 py-3 font-mono text-xs text-fg-subtle">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-accent">{flagship.metrics[0]?.value} automated tests</span>
            <span className="ml-auto truncate">{flagship.slug}</span>
          </div>
        )}
      </div>
    </m.figure>
  )
}
