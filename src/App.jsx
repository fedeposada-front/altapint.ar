import { useRef, useState } from 'react'
import { PRODUCTS } from './data'

const WHATSAPP_NUMBER = '5491124562515'

const TABS = [
  { label: 'Todos', category: null },
  { label: 'Anteojos de sol', category: 'anteojos-de-sol' },
  { label: 'Armazones', category: 'armazones' },
]

function App() {
  const [activeTab, setActiveTab] = useState('Todos')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const detailRef = useRef(null)

  const handleViewDetail = (product) => {
    setSelectedProduct(product)
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  const activeCategory = TABS.find((tab) => tab.label === activeTab)?.category ?? null
  const filteredProducts = activeCategory
    ? PRODUCTS.filter((product) => product.category === activeCategory)
    : PRODUCTS

  return (
    <div className="bg-white text-black">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="text-sm font-medium tracking-wide">altapint.ar</span>
          <span className="text-xs text-neutral-500">Buenos Aires · AR</span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl">
        <section className="px-6 py-20 text-center sm:py-28">
          <h1 className="text-4xl sm:text-5xl">Anteojos, nada más.</h1>
          <p className="mt-6 whitespace-pre-line text-neutral-600">
            {'Una sola categoría.\nHecha bien.\nVista desde acá.'}
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quiero consultar por el catálogo de altapint.ar.')}`}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block border border-neutral-300 px-4 py-2 text-center text-sm hover:border-black"
          >
            Pedir catálogo
          </a>
        </section>

        <section className="border-t border-neutral-200 px-6 py-20 text-center sm:py-28">
          <p className="whitespace-pre-line text-xl">
            {'No vendemos lentes.\nVendemos presencia.'}
          </p>
          <p className="mt-6 whitespace-pre-line text-neutral-600">
            {'El sistema es simple: pocas monturas, una mirada clara y nombres con carácter.\nEl color lo pone el anteojo.\nEl resto baja la voz.'}
          </p>
        </section>

        <section className="border-t border-neutral-200 px-6 pt-20 pb-10 text-center sm:pt-28">
          <h2 className="text-2xl">Catálogo</h2>
          <p className="mt-4 whitespace-pre-line text-neutral-600">
            {`${PRODUCTS.length} modelos disponibles.\nCada uno con nombre, carácter y una razón.`}
          </p>
        </section>

        <nav className="flex justify-center gap-3 px-6 pb-16">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              aria-pressed={activeTab === tab.label}
              className={`border px-4 py-2 text-[11px] tracking-wide uppercase hover:border-black ${
                activeTab === tab.label
                  ? 'border-black text-black'
                  : 'border-neutral-300 text-neutral-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <main id="catalogo" className="grid grid-cols-1 gap-x-8 gap-y-16 px-6 pb-32 sm:grid-cols-2 sm:gap-y-20 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-24 lg:pb-40">
          {filteredProducts.map((product) => {
            const price = new Intl.NumberFormat('es-AR', {
              style: 'currency',
              currency: 'ARS',
            }).format(product.price)
            const firstParagraph = product.emotionalDescription.split('\n\n')[0]
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(product.whatsappText)}`

            return (
              <article key={product.id} className="flex h-full flex-col">
                <div className="aspect-square w-full bg-[#FBFAF7]">
                  <img
                    src={product.assets.heroFront}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="mt-4 text-xs uppercase tracking-wide text-neutral-500">
                  {product.category}
                </p>
                <h3 className="mt-1 text-lg">{product.title}</h3>
                <p className="mt-1 text-sm">{price}</p>
                <p className="mt-1 text-xs text-neutral-500">{product.status}</p>
                <p className="mt-4 text-sm text-neutral-600">{firstParagraph}</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-block border border-neutral-300 px-4 py-2 text-center text-sm hover:border-black"
                >
                  Consultar
                </a>
                <button
                  type="button"
                  onClick={() => handleViewDetail(product)}
                  className="mt-2 inline-block border border-neutral-300 px-4 py-2 text-center text-sm hover:border-black"
                >
                  Ver detalle
                </button>
              </article>
            )
          })}
        </main>

        {selectedProduct && (
          <section ref={detailRef} aria-label={`Detalle de ${selectedProduct.title}`} className="border-t border-neutral-200 px-6 py-20">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="border border-neutral-300 px-4 py-2 text-[11px] tracking-wide uppercase hover:border-black"
            >
              Cerrar detalle
            </button>

            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    selectedProduct.assets.heroFront,
                    selectedProduct.assets.threeQuarter,
                    selectedProduct.assets.sideLeft,
                    selectedProduct.assets.rearThreeQuarter,
                    selectedProduct.assets.detailGrid,
                    ...selectedProduct.assets.lifestyle,
                  ]
                    .filter(Boolean)
                    .map((image) => (
                      <div key={image} className="aspect-square w-full bg-[#FBFAF7]">
                        <img
                          src={image}
                          alt={selectedProduct.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ))}
                </div>

                {selectedProduct.assets.productVideo && (
                  <div className="bg-[#FBFAF7]">
                    <video
                      src={selectedProduct.assets.productVideo}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full"
                    />
                  </div>
                )}

                {selectedProduct.assets.lifestyleVideo && (
                  <div className="bg-[#FBFAF7]">
                    <video
                      src={selectedProduct.assets.lifestyleVideo}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                  {selectedProduct.category}
                </p>
                <h3 className="mt-1 text-2xl">{selectedProduct.title}</h3>
                <p className="mt-1 text-sm">
                  {new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                  }).format(selectedProduct.price)}
                </p>
                <p className="mt-1 text-xs text-neutral-500">{selectedProduct.status}</p>

                <p className="mt-6 text-xs uppercase tracking-wide text-neutral-500">
                  Descripción
                </p>
                <p className="mt-2 whitespace-pre-line text-sm text-neutral-600">
                  {selectedProduct.emotionalDescription}
                </p>

                <p className="mt-6 text-xs uppercase tracking-wide text-neutral-500">
                  Especificaciones
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-600">
                  {selectedProduct.technicalDescription.map((line, index) => (
                    <li key={`${selectedProduct.id}-${index}`}>{line}</li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(selectedProduct.whatsappText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-block border border-neutral-300 px-4 py-2 text-center text-sm hover:border-black"
                >
                  Consultar
                </a>
              </div>
            </div>
          </section>
        )}
      </div>

      <footer className="border-t border-neutral-200 px-6 py-12 text-center text-sm text-neutral-500">
        <p className="whitespace-pre-line">
          {'altapint.ar\nMarcos distintos.\nBuenos Aires · 2026'}
        </p>
      </footer>
    </div>
  )
}

export default App
