import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Social previews (Open Graph / Twitter) need absolute URLs.
 * The site origin comes from `SITE_URL` if set, otherwise from Vercel's
 * production domain. Without either, relative URLs are kept (fine locally).
 */
function absoluteSocialUrls(): Plugin {
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const origin = (process.env.SITE_URL ?? (vercelHost ? `https://${vercelHost}` : '')).replace(/\/$/, '')

  return {
    name: 'absolute-social-urls',
    transformIndexHtml(html) {
      if (!origin) return html
      return html
        .replace('content="/og-image.png"', `content="${origin}/og-image.png"`)
        .replace('<meta property="og:type"', `<meta property="og:url" content="${origin}/" />\n    <meta property="og:type"`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), absoluteSocialUrls()],
})
