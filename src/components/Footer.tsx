import { Link } from 'react-router'
import { navItems, profile } from '../data/profile'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <p className="font-medium text-fg">{profile.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{profile.role}</p>
          <SocialLinks className="mt-5" includeEmail />
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">Navigate</p>
          <ul className="grid grid-cols-2 gap-x-12 gap-y-2.5 sm:grid-cols-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={{ pathname: '/', hash: `#${item.id}` }}
                  className="text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-fg-subtle sm:flex-row sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>Built with React and TypeScript.</p>
        </div>
      </div>
    </footer>
  )
}
