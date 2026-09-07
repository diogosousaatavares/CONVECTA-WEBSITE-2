# Convecta — Guia de Setup Local

## Pré-requisitos
- Node.js 18+ instalado
- VS Code instalado

## Passos para correr localmente

1. Abre a pasta no VS Code: `code .`
2. Instala as dependências: `npm install`
3. Configura o ambiente:
   - Copia `.env.local.example` para `.env.local`
   - Preenche `VITE_BASE44_APP_ID` e `VITE_BASE44_APP_BASE_URL`
4. Corre o projeto: `npm run dev`
5. Abre `http://localhost:5173`

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Pré-visualizar build |
| `npm run lint` | Verificar erros |

## Estrutura

```
src/
├── pages/          → Home, Servicos, Processo, Faq, Contacto, Instagram, Login, Register, etc.
├── components/     → Navbar, Footer, Hero3D, cards, etc.
├── components/ui/  → shadcn/ui
├── lib/            → utilitários e contextos
├── hooks/          → hooks personalizados
└── api/            → cliente Base44
```
