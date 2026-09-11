import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import { 
  Play, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Zap, 
  ShieldCheck, 
  Star,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import AmbientParticles from "@/components/AmbientParticles";
import GradientTransition from "@/components/GradientTransition";
import { useContactModal } from "@/lib/ContactModalContext";

// Lista de vídeos de demonstração da aplicação (6 módulos)
const videoShowcaseData = [
  {
    id: "video-1",
    step: "01",
    category: "admin",
    categoryLabel: "Painel Admin",
    title: "Visão Geral do Dashboard & Métricas ao Vivo",
    subtitle: "A central de comando da tua barbearia num relance.",
    description: "Vê como monitorizar a receita do dia, taxa de ocupação das cadeiras, alertas de stock baixo e a agenda de hoje em tempo real. Tudo intuitivo, rápido e sem complicações.",
    highlights: [
      "Métricas de receita e ticket médio ao vivo",
      "Alertas automáticos de caixa e produtos",
      "Visão multiplataforma sem necessidade de instalar nada"
    ],
    duration: "1:45 min",
    videoUrl: "", // Podes inserir aqui o ficheiro .mp4 ou URL
    posterBg: "from-[#fee96d]/10 via-amber-500/5 to-transparent",
    accentColor: "#fee96d"
  },
  {
    id: "video-2",
    step: "02",
    category: "admin",
    categoryLabel: "Gestão de Agenda",
    title: "Agenda Inteligente & Controlo de Marcações",
    subtitle: "Adeus conflitos de horários e mensagens no WhatsApp.",
    description: "Aprende como a agenda interativa por profissional organiza os horários automaticamente, envia lembretes aos clientes e permite reagendamentos em segundos.",
    highlights: [
      "Vista diária, semanal e individual por barbeiro",
      "Confirmação e lembretes automáticos",
      "Checkout direto na agenda com cálculo de comissões"
    ],
    duration: "2:10 min",
    videoUrl: "",
    posterBg: "from-[#fee96d]/10 via-yellow-500/5 to-transparent",
    accentColor: "#fee96d"
  },
  {
    id: "video-3",
    step: "03",
    category: "cliente",
    categoryLabel: "App do Cliente",
    title: "Experiência de Reserva para o Cliente",
    subtitle: "Marcações em 3 cliques na tua app web personalizada.",
    description: "Mostra aos teus clientes uma experiência moderna e luxuosa. O cliente escolhe o profissional, o serviço e a hora disponível sem precisar de descarregar apps da loja.",
    highlights: [
      "Marcação rápida 24/7 a partir de qualquer telemóvel",
      "Histórico de cortes e preferências guardadas",
      "Link próprio com as tuas cores e logotipo"
    ],
    duration: "1:30 min",
    videoUrl: "",
    posterBg: "from-[#fee96d]/10 via-amber-400/5 to-transparent",
    accentColor: "#fee96d"
  },
  {
    id: "video-4",
    step: "04",
    category: "cliente",
    categoryLabel: "Fidelização",
    title: "Cartão de Fidelidade Digital Animado",
    subtitle: "Recorrente e viciante: retém os teus clientes.",
    description: "Assiste à animação 3D do cartão de fidelidade digital. A cada visita concluída, o cliente ganha carimbos digitais e desbloqueia recompensas configuradas por ti.",
    highlights: [
      "Cartão interativo e animado no telemóvel do cliente",
      "Recompensas e regras totalmente personalizáveis",
      "Aumento imediato da taxa de retorno de clientes"
    ],
    duration: "1:15 min",
    videoUrl: "",
    posterBg: "from-[#fee96d]/10 via-yellow-400/5 to-transparent",
    accentColor: "#fee96d"
  },
  {
    id: "video-5",
    step: "05",
    category: "operacao",
    categoryLabel: "Caixa & Stock",
    title: "Gestão de Caixa, Produtos & Inventário",
    subtitle: "Controlo absoluto sobre o dinheiro e os produtos.",
    description: "Vê como funciona a venda de produtos ao balcão, a abertura e fecho de caixa, e o alerta automático quando um champô ou óleo de barba está prestes a esgotar.",
    highlights: [
      "Abertura, fecho e histórico de caixa sem erros",
      "Gestão de stock com preço de custo e margem",
      "Alertas automáticos de stock mínimo"
    ],
    duration: "2:00 min",
    videoUrl: "",
    posterBg: "from-[#fee96d]/10 via-amber-500/5 to-transparent",
    accentColor: "#fee96d"
  },
  {
    id: "video-6",
    step: "06",
    category: "operacao",
    categoryLabel: "Finanças & Planos",
    title: "Relatórios Financeiros & Assinaturas Recorrentes",
    subtitle: "Cresce com dados reais e receita previsível.",
    description: "Descobre como criar pacotes de cortes e assinaturas mensais para clientes VIP, gerando receita recorrente e relatórios de comissões por barbeiro.",
    highlights: [
      "Relatórios de faturação e comissões em tempo real",
      "Criação de pacotes e planos de assinatura mensais",
      "Gestão de promoções e cupões de desconto"
    ],
    duration: "2:25 min",
    videoUrl: "",
    posterBg: "from-[#fee96d]/10 via-yellow-500/5 to-transparent",
    accentColor: "#fee96d"
  }
];

// Categorias para filtro rápido de vídeos
const categories = [
  { id: "todos", label: "Todas as Apresentações" },
  { id: "admin", label: "Painel Admin" },
  { id: "cliente", label: "App do Cliente" },
  { id: "operacao", label: "Gestão & Finanças" },
];

const schemaBooking = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Convecta Booking",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "AppointmentScheduling",
  "operatingSystem": "Web, iOS, Android",
  "url": "https://convecta.pt/booking",
  "description": "Plataforma de gestão para barbearias com agendamento online, cartão de fidelidade digital, controlo de caixa, gestão de stock e relatórios financeiros em tempo real.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "description": "Demonstração gratuita disponível. Contactar para preços."
  },
  "provider": {
    "@type": "Organization",
    "name": "Convecta",
    "url": "https://convecta.pt"
  },
  "featureList": [
    "Agendamento online para barbearias",
    "Gestão de agenda por profissional",
    "Cartão de fidelidade digital animado",
    "Controlo de caixa e checkout",
    "Relatórios financeiros em tempo real",
    "Gestão de inventário e stock",
    "Assinaturas e planos mensais",
    "Promoções e cupões de desconto",
    "Painel de administração web",
    "App de cliente sem instalação"
  ],
  "audience": {
    "@type": "Audience",
    "audienceType": "Barbearias, Barbeiros, Salões"
  },
  "inLanguage": "pt-PT",
  "countryOfOrigin": "PT"
};

export default function Booking() {
  const { open: openModal } = useContactModal();
  const [activeTab, setActiveTab] = useState("todos");
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [playingInline, setPlayingInline] = useState({});

  const filteredVideos = videoShowcaseData.filter(v => {
    if (activeTab === "todos") return true;
    return v.category === activeTab;
  });

  const toggleInlinePlay = (videoId) => {
    setPlayingInline(prev => ({ ...prev, [videoId]: !prev[videoId] }));
  };

  return (
    <main id="main-content" style={{ backgroundColor: "#1a1a1a" }} className="booking-page text-white min-h-screen overflow-hidden selection:bg-[#fee96d] selection:text-[#1a1a1a]">
      <Helmet>
        <title>Convecta Booking — App de Marcações e Gestão para Barbearias</title>
        <meta name="description" content="App de agendamento online para barbearias. Gestão de marcações, cartão de fidelidade digital, controlo de caixa e relatórios em tempo real. Criada de raiz para barbeiros em Portugal." />
        <link rel="canonical" href="https://convecta.pt/booking" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Convecta" />
        <meta property="og:locale" content="pt_PT" />
        <meta property="og:title" content="Convecta Booking — App de Marcações para Barbearias" />
        <meta property="og:description" content="Agendamento online, fidelização de clientes, caixa e relatórios. A plataforma de gestão feita para barbearias modernas em Portugal." />
        <meta property="og:url" content="https://convecta.pt/booking" />
        <meta property="og:image" content="https://convecta.pt/og-image-booking.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Convecta Booking — App de marcações e gestão para barbearias" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@convecta" />
        <meta name="twitter:title" content="Convecta Booking — App de Marcações para Barbearias" />
        <meta name="twitter:description" content="Agendamento online, cartão de fidelidade, caixa e relatórios. O software de gestão para barbearias feito em Portugal." />
        <meta name="twitter:image" content="https://convecta.pt/og-image-booking.jpg" />
        <meta name="twitter:image:alt" content="Convecta Booking — painel de gestão para barbearias" />
        <script type="application/ld+json">
          {JSON.stringify(schemaBooking)}
        </script>
      </Helmet>

      {/* HERO / INTRODUÇÃO RESUMIDA */}
      <section style={{ backgroundColor: "#1a1a1a" }} className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-12 max-w-7xl mx-auto text-center overflow-hidden">
        <AmbientParticles count={10} />
        
        {/* Glow de fundo amarelo da marca */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#fee96d]/10 blur-[140px] pointer-events-none rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#fee96d] mb-4">
            Convecta Booking · Apresentação em Vídeo
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            App de Marcações e Gestão para Barbearias
          </h1>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto font-light">
            O Convecta Booking é o software de barbearia feito em Portugal para simplificar agendamentos online, fidelizar clientes e ter controlo total da operação — num só lugar.
          </p>

          <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-10 max-w-2xl mx-auto font-light">
            Dezenas de barbearias em Portugal já usam o Convecta Booking para gerir marcações online, controlar a caixa e crescer sem depender do WhatsApp. Descobre o que a plataforma faz por ti.
          </p>

          {/* Abas de Navegação / Filtros de Vídeo */}
          <div role="tablist" aria-label="Categorias de funcionalidades" className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl sm:rounded-full bg-black/40 border border-[#fee96d]/20 backdrop-blur-xl max-w-2xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`tab-${cat.id}`}
                role="tab"
                aria-selected={activeTab === cat.id}
                aria-controls={`tab-panel-${cat.id}`}
                onClick={() => setActiveTab(cat.id)}
                className={`relative px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fee96d] ${
                  activeTab === cat.id
                    ? "text-[#1a1a1a] font-bold"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {activeTab === cat.id && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-[#fee96d] rounded-xl sm:rounded-full shadow-lg shadow-[#fee96d]/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECÇÃO ZIG-ZAG DE VÍDEOS */}
      <section style={{ backgroundColor: "#141414" }} className="relative py-20 px-6 lg:px-12 border-t border-b border-white/5">
        <AmbientParticles count={8} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`tab-panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              aria-live="polite"
              aria-atomic="false"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-24 lg:space-y-32"
            >
              {filteredVideos.map((video, index) => {
                const isEven = index % 2 === 1; // Alternar esquerda/direita
                const isPlaying = playingInline[video.id];

                return (
                  <div key={video.id} className="relative group">
                    
                    {/* Linha/Seta de ligação em Zig-Zag para o próximo vídeo */}
                    {index < filteredVideos.length - 1 && (
                      <div className="hidden lg:block absolute left-1/2 -bottom-24 -translate-x-1/2 w-48 h-24 pointer-events-none z-0">
                        <svg className="w-full h-full text-[#fee96d]/40 overflow-visible" viewBox="0 0 100 100" fill="none">
                          <motion.path
                            d={isEven ? "M 20,0 C 20,50 80,50 80,100" : "M 80,0 C 80,50 20,50 20,100"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                          <polygon
                            points={isEven ? "76,92 84,100 80,88" : "16,92 24,100 20,88"}
                            fill="#fee96d"
                            className="animate-bounce"
                          />
                        </svg>
                      </div>
                    )}

                    <ScrollReveal variant="fadeInUp">
                      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                        isEven ? "lg:flex-row-reverse" : ""
                      }`}>
                        
                        {/* CAIXA DE VÍDEO (LADO ESQUERDO / DIREITO) */}
                        <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                          <TiltCard
                            dark={true}
                            glowColor="rgba(254,233,109,0.2)"
                            className="rounded-2xl overflow-hidden border border-[#fee96d]/20 shadow-2xl bg-[#1a1a1a] p-2 sm:p-3 transition-all duration-500 hover:border-[#fee96d]/40"
                          >
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#0d0d0d] group/video flex items-center justify-center">
                              
                              {/* Fundo do vídeo / Poster */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${video.posterBg} opacity-80 group-hover/video:opacity-100 transition-opacity`} />
                              
                              {/* Grelha de padrão de fundo */}
                              <div className="absolute inset-0 bg-[radial-gradient(#fee96d_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

                              {/* Conteúdo do Leitor de Vídeo */}
                              {video.videoUrl && isPlaying ? (
                                <video
                                  src={video.videoUrl}
                                  controls
                                  autoPlay
                                  className="w-full h-full object-cover rounded-xl z-20"
                                />
                              ) : (
                                <>
                                  {/* Thumbnail / Efeito Visual do Vídeo */}
                                  <div className="relative z-10 text-center p-6 flex flex-col items-center justify-center">
                                    {/* Badge Superior no Vídeo */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1a1a]/80 border border-[#fee96d]/30 text-xs font-semibold backdrop-blur-md">
                                      <span className="w-2 h-2 rounded-full bg-[#fee96d] animate-ping" />
                                      <span className="text-white">{video.categoryLabel}</span>
                                    </div>

                                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a1a1a]/80 border border-white/10 text-xs text-white/70 backdrop-blur-md">
                                      <Clock size={12} className="text-[#fee96d]" />
                                      <span>{video.duration}</span>
                                    </div>

                                    {/* Botão Play 3D com Efeito Pulsante */}
                                    <motion.button
                                      aria-label={`Ver demonstração: ${video.title}`}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => {
                                        if (video.videoUrl) {
                                          toggleInlinePlay(video.id);
                                        } else {
                                          setActiveVideoModal(video);
                                        }
                                      }}
                                      className="relative group/btn my-4 w-20 h-20 rounded-full flex items-center justify-center bg-[#fee96d] text-[#1a1a1a] shadow-xl shadow-[#fee96d]/20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fee96d]"
                                    >
                                      <span className="absolute inset-0 rounded-full bg-[#fee96d] animate-ping opacity-25" />
                                      <Play size={28} className="fill-[#1a1a1a] translate-x-0.5" />
                                    </motion.button>

                                    <p className="text-xs sm:text-sm font-medium text-white/80 group-hover/video:text-white transition-colors">
                                      Clique para ver a demonstração em vídeo
                                    </p>
                                  </div>
                                </>
                              )}

                              {/* Barra Inferior do Vídeo */}
                              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/70 to-transparent flex items-center justify-between text-xs text-white/60 z-10 pointer-events-none">
                                <span className="font-mono text-[#fee96d] font-bold">VÍDEO {video.step}</span>
                                <span className="truncate max-w-[200px] text-white/80">{video.title}</span>
                              </div>
                            </div>
                          </TiltCard>
                        </div>

                        {/* CONTEÚDO EXPLICATIVO (LADO DIREITO / ESQUERDO) */}
                        <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                          <div className="space-y-5">
                            
                            {/* Número do Passo & Tag */}
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-3xl font-black tracking-tighter text-[#fee96d]">
                                {video.step}
                              </span>
                              <div className="h-4 w-px bg-white/20" />
                              <span className="text-xs uppercase tracking-widest font-semibold text-[#fee96d] bg-[#fee96d]/10 px-3 py-1 rounded-full border border-[#fee96d]/20">
                                {video.subtitle}
                              </span>
                            </div>

                            {/* Título */}
                            <h2 className="font-heading text-2xl sm:text-3xl text-white leading-tight">
                              {video.title}
                            </h2>

                            {/* Descrição */}
                            <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light">
                              {video.description}
                            </p>

                            {/* Lista de Highlights com Ícones */}
                            <ul className="space-y-2.5 pt-2">
                              {video.highlights.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
                                  <CheckCircle2 size={16} className="text-[#fee96d] shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Ação rápida / Interação */}
                            <div className="pt-3">
                              <button
                                aria-label={`Ver detalhes da demonstração: ${video.title}`}
                                onClick={() => setActiveVideoModal(video)}
                                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#fee96d] hover:text-white transition-colors group/link cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fee96d]"
                              >
                                <span>Ver detalhes da demonstração</span>
                                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                              </button>
                            </div>

                          </div>
                        </div>

                      </div>
                    </ScrollReveal>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap gap-4 justify-center mt-8 text-sm">
            <Link to="/precos" className="text-[#fee96d] underline underline-offset-2">
              Ver planos e preços do Booking
            </Link>
            <span className="text-white/30">·</span>
            <Link to="/booking/funcionalidades" className="text-[#fee96d] underline underline-offset-2">
              Explorar todas as funcionalidades
            </Link>
            <span className="text-white/30">·</span>
            <Link to="/faq" className="text-[#fee96d] underline underline-offset-2">
              Perguntas frequentes
            </Link>
          </div>
        </div>
      </section>

      {/* MODAL DE VÍDEO / DETALHES */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1a1a1a] border border-[#fee96d]/30 rounded-2xl shadow-2xl p-5 sm:p-8"
            >
              {/* Botão Fechar */}
              <button
                aria-label="Fechar modal de demonstração"
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fee96d]"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fee96d]/10 text-[#fee96d] text-xs font-semibold mb-2 border border-[#fee96d]/20">
                  <span>Vídeo {activeVideoModal.step} · {activeVideoModal.categoryLabel}</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl text-white">
                  {activeVideoModal.title}
                </h3>
              </div>

              {/* Player do Modal */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 mb-6 flex items-center justify-center">
                {activeVideoModal.videoUrl ? (
                  <video
                    src={activeVideoModal.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-[#fee96d]/10 text-[#fee96d] flex items-center justify-center mx-auto mb-4 border border-[#fee96d]/30">
                      <Play size={28} className="fill-[#fee96d]" />
                    </div>
                    <p className="text-white font-medium text-lg mb-2">Ficheiro de vídeo pronto para associação</p>
                    <p className="text-white/60 text-sm max-w-md mx-auto">
                      Coloca o teu ficheiro MP4 no caminho especificado ou define a URL no código para reproduzir o vídeo de apresentação correspondente ao módulo <span className="text-[#fee96d]">{activeVideoModal.title}</span>.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <p className="text-white/60 text-xs sm:text-sm">
                  Tens dúvidas sobre este módulo? Agenda uma demonstração em direto com a nossa equipa.
                </p>
                <button
                  onClick={() => {
                    setActiveVideoModal(null);
                    openModal();
                  }}
                  className="btn-glow w-full sm:w-auto px-6 py-3 rounded-sm bg-[#fee96d] text-[#1a1a1a] font-bold text-xs uppercase tracking-wide shrink-0"
                >
                  Pedir Demonstração do Módulo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA FORTE NO FINAL IGUAL AO SITE */}
      <section style={{ backgroundColor: "#1a1a1a" }} className="relative py-24 lg:py-32 px-6 lg:px-12 border-t border-white/10 overflow-hidden">
        <AmbientParticles count={8} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#fee96d] mb-4">
              Pronto para transformar a tua barbearia?
            </p>

            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Garante o Convecta Booking <br />
              <span style={{ color: "#fee96d" }}>com configuração personalizada.</span>
            </h2>

            <p className="text-white/70 text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Experimenta o software de gestão para barbearias mais completo de Portugal. Lançamos a tua plataforma pronta a usar em menos de 24 horas. Sem custos escondidos, sem comissões por marcação e com apoio total da nossa equipa.
            </p>

            {/* Badges de garantia */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
              <div className="p-5 rounded-xl bg-white/5 border border-[#fee96d]/20 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#fee96d] font-bold text-sm mb-1">
                  <ShieldCheck size={18} />
                  <span>0% Comissões</span>
                </div>
                <p className="text-white/60 text-xs">Fica com 100% da receita das tuas marcações.</p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-[#fee96d]/20 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#fee96d] font-bold text-sm mb-1">
                  <Zap size={18} />
                  <span>Ativação em &lt;24h</span>
                </div>
                <p className="text-white/60 text-xs">Configuração acompanhada e pronta a funcionar.</p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-[#fee96d]/20 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#fee96d] font-bold text-sm mb-1">
                  <Star size={18} />
                  <span>Suporte Incluído</span>
                </div>
                <p className="text-white/60 text-xs">Acompanhamento direto e apoio técnico contínuo.</p>
              </div>
            </div>

            {/* Botões de Ação Principais */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  if (typeof window.trackEvent === 'function') {
                    window.trackEvent('cta_click', {
                      event_category: 'CTA',
                      event_label: 'booking_hero_demo',
                      value: 1
                    });
                  }
                  openModal();
                }}
                className="btn-glow w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wide rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fee96d]"
                style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
              >
                <span>Pedir Demonstração</span>
                <ArrowRight size={18} />
              </button>

              <Link
                to="/precos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wide rounded-sm bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all duration-200"
              >
                <span>Ver Planos e Preços</span>
                <ChevronRight size={16} />
              </Link>
            </div>
            <p className="text-center text-white/40 text-xs mt-3">
              Tens dúvidas primeiro?{" "}
              <Link to="/faq" className="text-white/60 underline underline-offset-2">
                Consulta as perguntas frequentes
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
