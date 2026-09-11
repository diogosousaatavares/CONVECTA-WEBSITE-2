/*
 * Os contactos do site vao para a mesma tabela dos pedidos de demonstracao,
 * na base de dados da Convecta. Um sitio so para ligar a toda a gente.
 *
 * Sem biblioteca: e um pedido HTTP a API do Supabase. A chave aqui e a
 * publica ("publishable") — e feita para estar no browser. O que ela pode
 * fazer e decidido do lado da base de dados: nesta tabela, so chamar esta
 * funcao, que valida e tem travao anti-spam.
 */
const SUPABASE_URL = "https://qtpccpiybaraneqvenfq.supabase.co";
const SUPABASE_KEY = "sb_publishable_v6ps206cMqmiQWW5GqMglQ_r9GF8fID";

export async function enviarContacto({ nome, negocio, telefone, email, mensagem }) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/pedir_contacto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify({
      p_nome: nome || "",
      p_empresa: negocio || "",
      p_telefone: telefone || "",
      p_email: email || "",
      p_mensagem: mensagem || "",
    }),
  });
  if (!r.ok) {
    let msg = "Não foi possível enviar. Tenta outra vez.";
    try { const j = await r.json(); if (j?.message) msg = j.message; } catch {}
    throw new Error(msg);
  }
  return r.json();
}
