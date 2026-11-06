import { m, type HTMLMotionProps } from 'framer-motion'
import { fadeUp } from '../lib/motion'

/**
 * Fades content up once when it enters the viewport.
 * Reduced-motion users get the final state immediately (see MotionConfig in App).
 */
export function Reveal({ children, ...props }: HTMLMotionProps<'div'>) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      {...props}
    >
      {children}
    </m.div>
  )
}
