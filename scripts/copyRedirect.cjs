const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const publicRedirect = path.join(projectRoot, 'public', '_redirects')
const distDir = path.join(projectRoot, 'dist')
const distRedirectUnderscore = path.join(distDir, '_redirects')
const distRedirect = path.join(distDir, 'redirects')

if (!fs.existsSync(publicRedirect)) {
  console.log('public/_redirects not found — nothing to copy')
  process.exit(0)
}

try {
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true })
  fs.copyFileSync(publicRedirect, distRedirectUnderscore)
  fs.copyFileSync(publicRedirect, distRedirect)
  console.log('Copied public/_redirects to dist/_redirects and dist/redirects')
} catch (err) {
  console.error('Failed to copy redirects:', err)
  process.exit(1)
}
