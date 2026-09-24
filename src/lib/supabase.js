/*
 * O cliente do Supabase, para o site publico.
 *
 * O site so precisa dele numa pagina: o registo. Em todas as outras nao ha
 * login, nao ha utilizadores, nao ha nada a esperar.
 *
 * Por isso NAO se cria o cliente quando o ficheiro carrega — cria-se quando
 * alguem o pede. Duas razoes, e as duas ja morderam projectos parecidos:
 *
 *   1. O site e pre-renderizado no build (vite build --ssr + prerender).
 *      Codigo que toca em `window` ou abre ligacoes na altura do carregamento
 *      rebenta o build, e o erro aparece longe de onde foi escrito.
 *
 *   2. Quem visita as Precos ou os Termos nunca precisa disto. Criar um
 *      cliente de autenticacao a toda a gente e peso e pedidos de rede por
 *      nada.
 */
import { createClient } from '@supabase/supabase-js';

let cliente = null;

export function temSupabase() {
  return !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

export function supabase() {
  if (cliente) return cliente;
  const url = import.meta.env.VITE_SUPABASE_URL;
  const chave = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !chave) {
    throw new Error('O registo não está configurado neste site (faltam as variáveis do Supabase).');
  }
  cliente = createClient(url, chave, {
    auth: {
      // O site nao guarda sessao nenhuma: quem se regista vai confirmar o
      // email e entra no PAINEL, noutro endereco. Guardar sessao aqui so
      // deixava lixo no browser de quem passa por esta pagina uma vez.
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return cliente;
}
