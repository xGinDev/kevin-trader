# One page · Trader y educador

Next.js (App Router) + Tailwind + shadcn/ui + Motion, construida a partir del archivo de Figma
"Marca personal — Trader y educador (One page)".

## Cambiar el contenido

Todo el texto y los datos provisionales (nombre, cifras, testimonios, links, número de WhatsApp,
fotos) están en [`content.ts`](content.ts). Los valores marcados con `PLACEHOLDER` o entre
`[corchetes]` son los que hay que reemplazar. No hace falta tocar componentes.

- **Fotos:** copia el archivo a `public/` y pon la ruta en `images.portrait.src` / `images.working.src`.
- **WhatsApp:** `links.whatsappNumber`, solo dígitos con indicativo (por ejemplo `573001234567`).
- **Logo:** el `Monogram` usa `site.initials` hasta tener el logo definitivo.
- **Ícono de WhatsApp:** el botón flotante usa un glifo provisional (`MessageCircle`); en producción
  reemplázalo por el SVG oficial de la marca en `components/whatsapp-button.tsx`.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # y completa los valores
npm run dev
```

Con `CONTACT_DRY_RUN=1` en `.env.local` el formulario simula el envío y muestra el correo en la
terminal, sin llamar a Resend.

## Formulario de contacto

Server Action (`app/actions.ts`) que valida con zod (`lib/contact-schema.ts`, el mismo esquema que
usa el cliente) y envía un email con Resend. No hay base de datos.

Variables de entorno:

| Variable | Uso |
| --- | --- |
| `RESEND_API_KEY` | API key de Resend |
| `CONTACT_TO_EMAIL` | Dónde llegan los mensajes |
| `CONTACT_FROM_EMAIL` | Remitente. `onboarding@resend.dev` sirve para probar; para producción verifica tu dominio en Resend |

## Publicar en Vercel

1. Sube el repositorio a GitHub e impórtalo en [vercel.com/new](https://vercel.com/new).
2. En *Settings → Environment Variables* agrega `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y,
   cuando tengas dominio verificado, `CONTACT_FROM_EMAIL`.
3. Deploy. Cada push a `master` vuelve a publicar.
