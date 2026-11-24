# ALTAPINT.AR

Catálogo editorial de anteojos y armazones. React + Vite + Tailwind CSS.

## Desarrollo local

```bash
npm install
npm run dev
npm run build
```

## Publicación: Cloudflare Pages

1. Abrí [Cloudflare Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages).
2. Create → Pages → Connect to Git.
3. Autorizá GitHub y seleccioná `fedeposada-front/altapint.ar`, rama `main`.
4. Configuración de compilación:
   - Framework preset: **Vite**
   - Build command: **npm run build**
   - Build output directory: **dist**
   - Root directory: **/** (raíz)
5. Deploy. Comprobá la URL `*.pages.dev` entregada por Cloudflare antes de modificar los DNS.
6. Agregá `altapint.ar` como dominio a Cloudflare (plan Free). Conservá todos los registros DNS existentes que correspondan a servicios activos, especialmente MX/TXT de correo, si los hubiera.
7. En el proyecto Pages → Custom domains → Set up a domain → `altapint.ar`. Para el dominio raíz Cloudflare exige que la zona use sus nameservers.
8. En NIC Argentina, sección delegación del dominio, reemplazá los nameservers por **los dos valores exactos que Cloudflare asigne a tu zona**. No uses nameservers de ejemplo ni valores de otro dominio.
9. Agregá también `www.altapint.ar` en Custom domains y configurá redirección a `https://altapint.ar` según el panel.
10. Validá DNS activo, HTTPS, carga del catálogo, imágenes, filtros, detalle y CTA WhatsApp en mobile y desktop.

**No cambiar la delegación de NIC antes de que Cloudflare muestre los nameservers específicos y la zona DNS esté revisada.**

## Evolución futura

El catálogo actual no necesita backend. Para incorporar pagos con Mercado Pago, utilizar funciones backend y webhooks verificados; nunca colocar credenciales secretas en el frontend. La base de datos, stock y órdenes pueden incorporarse después.
