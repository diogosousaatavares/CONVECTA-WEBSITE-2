# convecta.pt

Site público da Convecta — marcações online e gestão para barbearias.

## Correr localmente

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # site + pré-renderização em dist/
npm run preview    # ver o dist/ (sem as regras de URL do Vercel)
```

## Publicar

O Vercel faz o build a cada `git push` para o ramo principal. O comando de
build é `npm run build` (ver `package.json`): `vite build`, depois a
pré-renderização de cada página para HTML (`scripts/prerender.mjs`). Se a
pré-renderização falhar, o build falha e a versão anterior continua no ar.

Domínio: `convecta.pt` (DNS no cPanel da Dominios.pt → Vercel). E-mail fica no
cPanel (`mail.convecta.pt`).

## Onde está o quê

- `src/lib/seo.js` — a verdade do site: nome, contactos, morada, preço,
  endereços da demonstração, lista de funcionalidades, blocos schema.org.
- `src/components/Seo.jsx` — cabeça de cada página (título, descrição, OG…).
- `src/pages/` — Home, Booking (= Funcionalidades), BookingSection (= Como
  funciona), Precos, Faq, Contacto, Instagram, Privacidade, Termos.
- `src/lib/contactos.js` — envio de contactos para o Supabase (`pedir_contacto`).
- `public/` — imagens, ícones, `og-image.png`, `sitemap.xml`, `robots.txt`.
- `vercel.json` — redirecionamentos (`/demo`, `/painel`), regras de URL,
  cabeçalhos.

Ver `CLAUDE.md` para as regras de conteúdo.
