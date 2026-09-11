# Site convecta.pt

Site público da Convecta (marcações online e gestão para barbearias). Vite + React,
publicado no Vercel a partir do GitHub. Sem Base44, sem login, sem base de dados
própria: o único pedido que o site faz é ao Supabase, para gravar contactos
(`src/lib/contactos.js`, chave pública, função `pedir_contacto`).

Regras que importam:

- **Tudo o que o site diz tem de ser verdade hoje.** A lista do que a app faz
  está em `src/lib/seo.js` (`FUNCIONALIDADES`) e na página `src/pages/Booking.jsx`
  (Funcionalidades). Não se escreve uma funcionalidade sem ela existir e gravar
  no painel. Não há lembretes por SMS/WhatsApp, pagamentos online, assinaturas,
  cupões nem testemunhos de clientes inventados.
- **O preço está num sítio só:** `PRECO_MENSAL` / `PRECO_MENSAL_TEXTO` em
  `src/lib/seo.js`. Nunca escrever "24,99" à mão numa página.
- **Contactos, morada, Instagram, endereços da demonstração:** `SITE` em
  `src/lib/seo.js`. As páginas usam `<Seo … />` (`src/components/Seo.jsx`) para
  título, descrição, canonical, Open Graph e schema.org.
- **Pré-renderização:** `npm run build` gera `dist/<rota>.html` por página
  (`scripts/prerender.mjs`, `src/entry-server.jsx`). Componentes têm de ser
  seguros em Node (nada de `window` fora de `useEffect`) e o HTML do servidor
  tem de bater certo com o do browser (nada de `<style>{…}</style>` com aspas
  dentro — CSS vai para `src/index.css`). Rotas novas entram em `ROTAS` no
  script e no `sitemap.xml`.
- `npm run dev` para trabalhar; `npm run build` antes de fazer push — se a
  pré-renderização falhar, o Vercel não publica.
