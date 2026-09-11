// A demonstracao publica. Uma barbearia real, com duas contas por tras de dois
// botoes: qualquer pessoa entra como cliente no site e como barbeiro no painel,
// e ve uma marcacao feita num lado chegar ao outro. E esse momento que vende.
//
// Os enderecos vivem em lib/seo.js com o resto da verdade do site; isto so os
// reexporta para quem ja os importava daqui.
import { SITE } from "@/lib/seo";

export const DEMO_CLIENTE_URL = SITE.demoCliente;
export const DEMO_PAINEL_URL = SITE.demoPainel;
