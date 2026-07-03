import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const catalogDir = path.join(rootDir, 'public', 'catalog')
const outputFile = path.join(rootDir, 'src', 'data', 'products.js')

const HEADINGS = [
  'Nombre editorial',
  'Variante',
  'Categoría',
  'Estado',
  'Descripción emocional',
  'Descripción técnica',
  'Precio',
]

const CATEGORIES = ['anteojos-de-sol', 'armazones']

const STATUSES = {
  disponible: 'Disponible',
  'no disponible': 'No disponible',
}

const IMAGE_ASSETS = {
  heroFront: 'hero-front.webp',
  threeQuarter: 'three-quarter.webp',
  sideLeft: 'side-left.webp',
  rearThreeQuarter: 'rear-three-quarter.webp',
  detailGrid: 'detail-grid.webp',
}

const VIDEO_ASSETS = {
  productVideo: 'product-video.mp4',
  lifestyleVideo: 'lifestyle-video.mp4',
}

const LIFESTYLE_FILES = [
  'lifestyle-01.webp',
  'lifestyle-02.webp',
  'lifestyle-03.webp',
  'lifestyle-04.webp',
]

function parseSections(markdown) {
  const text = markdown.replace(/\r\n/g, '\n').replace(/^\\(#|-)/gm, '$1')
  const sections = {}
  let current = null

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim()
    const headingMatch = line.match(/^#\s+(.+)$/)

    if (headingMatch && HEADINGS.includes(headingMatch[1].trim())) {
      current = headingMatch[1].trim()
      sections[current] = []
      continue
    }

    if (current && line !== '') {
      sections[current].push(line)
    }
  }

  return sections
}

function assetUrl(slug, folderPath, fileName) {
  return fs.existsSync(path.join(folderPath, fileName))
    ? `/catalog/${slug}/${fileName}`
    : null
}

function buildProduct(slug) {
  const folderPath = path.join(catalogDir, slug)
  const markdownPath = path.join(folderPath, 'product.md')

  if (!fs.existsSync(markdownPath)) {
    throw new Error(`Missing product.md in ${slug}`)
  }

  const sections = parseSections(fs.readFileSync(markdownPath, 'utf8'))

  const name = sections['Nombre editorial']?.[0]
  const variant = sections['Variante']?.[0]
  const category = sections['Categoría']?.[0]
  const statusRaw = sections['Estado']?.[0]?.toLowerCase()
  const priceRaw = sections['Precio']?.[0]

  if (!CATEGORIES.includes(category)) {
    throw new Error(`Invalid category "${category}" in ${slug}`)
  }

  const status = STATUSES[statusRaw]
  if (!status) {
    throw new Error(`Invalid status "${statusRaw}" in ${slug}`)
  }

  const price = Number(priceRaw?.replace(/[^\d.-]/g, ''))
  if (Number.isNaN(price)) {
    throw new Error(`Invalid price "${priceRaw}" in ${slug}`)
  }

  const emotionalDescription = (sections['Descripción emocional'] ?? []).join('\n\n')
  const technicalDescription = (sections['Descripción técnica'] ?? []).map((line) =>
    line.replace(/^-+\s*/, '').trim(),
  )

  const title = `${name} — ${variant}`

  const assets = {
    heroFront: assetUrl(slug, folderPath, IMAGE_ASSETS.heroFront),
    threeQuarter: assetUrl(slug, folderPath, IMAGE_ASSETS.threeQuarter),
    sideLeft: assetUrl(slug, folderPath, IMAGE_ASSETS.sideLeft),
    rearThreeQuarter: assetUrl(slug, folderPath, IMAGE_ASSETS.rearThreeQuarter),
    detailGrid: assetUrl(slug, folderPath, IMAGE_ASSETS.detailGrid),
    lifestyle: LIFESTYLE_FILES.map((fileName) => assetUrl(slug, folderPath, fileName)).filter(
      (url) => url !== null,
    ),
    productVideo: assetUrl(slug, folderPath, VIDEO_ASSETS.productVideo),
    lifestyleVideo: assetUrl(slug, folderPath, VIDEO_ASSETS.lifestyleVideo),
  }

  return {
    id: slug,
    slug,
    name,
    variant,
    title,
    category,
    price,
    status,
    emotionalDescription,
    technicalDescription,
    assets,
    whatsappText: `Hola, quiero consultar por ${title}.`,
  }
}

function formatString(value) {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`
}

function formatValue(value, indent) {
  const pad = '  '.repeat(indent)
  const childPad = '  '.repeat(indent + 1)

  if (value === null) return 'null'
  if (typeof value === 'number') return String(value)
  if (typeof value === 'string') return formatString(value)

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    const items = value.map((item) => `${childPad}${formatValue(item, indent + 1)},`)
    return `[\n${items.join('\n')}\n${pad}]`
  }

  const keys = Object.keys(value)
  const items = keys.map((key) => `${childPad}${key}: ${formatValue(value[key], indent + 1)},`)
  return `{\n${items.join('\n')}\n${pad}}`
}

const slugs = fs
  .readdirSync(catalogDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

const products = slugs
  .map((slug) => buildProduct(slug))
  .sort((a, b) => a.title.localeCompare(b.title, 'es'))

const fileContent = `export const PRODUCTS = ${formatValue(products, 0)}\n`

fs.writeFileSync(outputFile, fileContent)

console.log(`Generated ${products.length} products -> ${path.relative(rootDir, outputFile)}`)
