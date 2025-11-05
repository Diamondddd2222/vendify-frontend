import fs from 'fs'
import path from 'path'

const src = path.resolve(process.cwd(), 'public', '_redirects')
const dest = path.resolve(process.cwd(), 'dist', '_redirects')

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest)
    console.log(`Copied ${src} -> ${dest}`)
  } else {
    console.warn(`No ${src} found; skipping copy.`)
  }
} catch (err) {
  console.error('Failed to copy _redirects:', err)
  process.exit(1)
}
