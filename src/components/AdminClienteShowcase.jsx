import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Search, 
  Plus, 
  Bell, 
  CreditCard, 
  BarChart3, 
  Clock, 
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Scissors,
  FileText,
  Repeat,
  Tag,
  Settings,
  MoreHorizontal,
  Menu
} from "lucide-react";

export default function AdminClienteShowcase() {
  return (
    <div className="relative w-full max-w-6xl mx-auto py-2 sm:py-12 px-1 sm:px-4 select-none">
      
      {/* Background Radial Glow (Gold/Yellow aura behind the laptop) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[85%] h-[85%] bg-gradient-to-tr from-[#fee96d]/25 via-amber-500/15 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="relative flex flex-col items-center justify-center">

        {/* COMPOSIÇÃO PRINCIPAL: LAPTOP + SMARTPHONE + FLOATING CARDS */}
        <div className="relative w-full max-w-5xl mx-auto">

          {/* FLOATING CARD 1: TOP LEFT (Nova Marcação) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -10 }}
            animate={{ opacity: 1, x: 0, y: [0, -7, 0] }}
            transition={{ 
              opacity: { duration: 0.7 },
              y: { repeat: Infinity, duration: 4.2, ease: "easeInOut" }
            }}
            className="hidden md:flex absolute -top-4 -left-6 sm:-left-12 z-30 items-center gap-3.5 p-4 rounded-2xl bg-[#1b1b22]/90 border border-white/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-[230px]"
          >
            <div className="relative p-3 rounded-xl bg-white/10 text-white shrink-0 border border-white/10">
              <Calendar size={20} />
            </div>
            <div className="flex-1 pr-2">
              <h4 className="text-xs font-bold text-white leading-tight">Nova marcação</h4>
              <p className="text-[11px] text-white/60 leading-tight mt-0.5 font-light">Cliente agendou uma nova marcação</p>
            </div>
            <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" />
          </motion.div>

          {/* FLOATING CARD 2: BOTTOM LEFT (Novo Cliente) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 7, 0] }}
            transition={{ 
              opacity: { duration: 0.7, delay: 0.2 },
              y: { repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.4 }
            }}
            className="hidden md:flex absolute bottom-16 -left-8 sm:-left-16 z-30 items-center gap-3.5 p-4 rounded-2xl bg-[#1b1b22]/90 border border-white/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-[220px]"
          >
            <div className="relative p-3 rounded-xl bg-white/10 text-white shrink-0 border border-white/10">
              <Users size={20} />
            </div>
            <div className="flex-1 pr-2">
              <h4 className="text-xs font-bold text-white leading-tight">Novo cliente</h4>
              <p className="text-[11px] text-white/60 leading-tight mt-0.5 font-light">Mais um cliente na tua agenda</p>
            </div>
            <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" />
          </motion.div>

          {/* FLOATING CARD 3: TOP RIGHT (Mais Resultados) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: -10 }}
            animate={{ opacity: 1, x: 0, y: [0, -9, 0] }}
            transition={{ 
              opacity: { duration: 0.7, delay: 0.3 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.2 }
            }}
            className="hidden md:flex absolute -top-6 -right-4 sm:-right-8 z-30 items-center gap-3.5 p-4 rounded-2xl bg-[#1b1b22]/90 border border-white/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-[240px]"
          >
            <div className="relative p-3 rounded-xl bg-white/10 text-[#fee96d] shrink-0 border border-white/10">
              <BarChart3 size={20} />
            </div>
            <div className="flex-1 pr-2">
              <h4 className="text-xs font-bold text-white leading-tight">Mais resultados</h4>
              <p className="text-[11px] text-white/60 leading-tight mt-0.5 font-light">A tua barbearia a crescer todos os dias</p>
            </div>
            <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" />
          </motion.div>

          {/* FLOATING CARD 4: BOTTOM RIGHT (+120% Aumento) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{ 
              opacity: { duration: 0.7, delay: 0.4 },
              y: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.6 }
            }}
            className="hidden lg:flex absolute bottom-12 -right-12 z-30 items-center gap-3.5 p-4 rounded-2xl bg-[#1b1b22]/90 border border-white/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-[200px]"
          >
            <div className="relative p-3 rounded-xl bg-white/10 text-white shrink-0 border border-white/10">
              <TrendingUp size={20} />
            </div>
            <div className="flex-1 pr-2">
              <h4 className="text-base font-black text-white leading-tight">+120%</h4>
              <p className="text-[11px] text-white/60 leading-tight mt-0.5 font-light">Aumento nas marcações</p>
            </div>
            <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" />
          </motion.div>


          {/* LAPTOP FRAME (ADMIN DASHBOARD MOCKUP) */}
          <div className="relative mx-auto rounded-t-xl sm:rounded-t-[28px] overflow-hidden border-4 sm:border-[10px] border-[#25252e] bg-[#09090c] shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
            
            {/* Laptop Screen Top Camera Notch Bar */}
            <div className="w-full bg-[#16161c] py-1 sm:py-1.5 px-2.5 sm:px-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black/80 border border-white/20 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-blue-400/90" />
              </div>
              <div className="text-[9px] font-mono text-white/30 hidden sm:block">convecta-booking-admin.app</div>
            </div>

            {/* LAPTOP SCREEN BODY (WITH LEFT SIDEBAR & DASHBOARD MAIN) */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] bg-[#0c0c10] text-white font-sans text-xs min-h-0 sm:min-h-[520px]">
              
              {/* LEFT SIDEBAR (CONVECTA ADMIN SIDEBAR) */}
              <div className="hidden md:flex flex-col bg-[#121217] border-r border-white/10 p-4 justify-between">
                <div>
                  {/* Brand Header */}
                  <div className="mb-6">
                    <h2 className="font-heading font-bold text-base text-white">Convecta.</h2>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                      Painel de gestão <ChevronRight size={10} className="text-[#fee96d]" />
                    </p>
                  </div>

                  {/* Sidebar Navigation Items */}
                  <div className="space-y-1">
                    
                    {/* Active Item: Dashboard */}
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#fee96d] text-black font-bold text-xs shadow-md shadow-[#fee96d]/20">
                      <div className="flex items-center gap-2.5">
                        <LayoutDashboard size={15} />
                        <span>Dashboard</span>
                      </div>
                    </div>

                    {/* Menu items */}
                    {[
                      { icon: Users, label: "Clientes" },
                      { icon: Scissors, label: "Serviços" },
                      { icon: FileText, label: "Relatórios" },
                      { icon: Repeat, label: "Subscrições" },
                      { icon: Tag, label: "Promoções" },
                      { icon: Settings, label: "Definições" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <item.icon size={15} />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight size={12} className="text-white/30" />
                      </div>
                    ))}

                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-[10px] text-white/40">
                  <span>Convecta Booking v2.4</span>
                </div>
              </div>

              {/* MAIN CONTENT AREA */}
              <div className="p-2.5 sm:p-6 flex flex-col justify-between overflow-hidden bg-[#0a0a0e]">
                
                {/* Top Nav Bar inside main view */}
                <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-4 border-b border-white/10">
                  
                  {/* Brand on mobile / Search Bar on desktop */}
                  <div className="flex items-center gap-2 md:hidden">
                    <span className="font-heading font-bold text-sm text-white">Convecta.</span>
                  </div>

                  <div className="flex-1 max-w-sm hidden md:block">
                    <div className="relative">
                      <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                      <input 
                        type="text" 
                        readOnly 
                        placeholder="Pesquisar..." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-[11px] text-white/80 focus:outline-none placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  {/* Actions & Admin Badge */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#fee96d] text-black font-black flex items-center justify-center text-[10px] sm:text-xs">
                      A
                    </div>
                    <button className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-white text-black font-extrabold text-[10px] sm:text-xs hover:bg-gray-100 transition-colors shadow-lg">
                      <Plus size={12} className="sm:w-3.5 sm:h-3.5" />
                      <span>Nova Marcação</span>
                    </button>
                    <div className="p-1 sm:p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60">
                      <Bell size={12} className="sm:w-3.5 sm:h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Dashboard Title & Date Tabs */}
                <div className="my-2 sm:my-4 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-lg sm:text-2xl font-bold text-white tracking-tight">Dashboard</h3>
                    <p className="text-[9px] sm:text-[11px] text-white/40 font-mono">01/09/2026 → 30/09/2026</p>
                  </div>

                  <div className="flex items-center gap-0.5 sm:gap-1 bg-white/5 p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-white/10 text-[9px] sm:text-[11px]">
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-white/60">Hoje</span>
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-white/60">Semana</span>
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg bg-[#fee96d]/20 border border-[#fee96d]/40 text-[#fee96d] font-bold">Mês</span>
                  </div>
                </div>

                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-2.5 sm:mb-4">
                  
                  {/* Card 1: Receita */}
                  <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 relative">
                    <div className="flex items-center justify-between text-white/60 text-[9px] sm:text-[11px] mb-1">
                      <span>Receita do período</span>
                      <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#fee96d] text-black flex items-center justify-center font-black text-[9px] sm:text-xs">€</div>
                    </div>
                    <div className="text-sm sm:text-xl font-bold text-white">€ 12,00</div>
                    <div className="text-[8px] sm:text-[10px] text-emerald-400 mt-0.5 sm:mt-1 flex items-center gap-1 font-medium">
                      <span>↑ +12%</span>
                      <span className="text-white/40 hidden sm:inline">vs. mês anterior</span>
                    </div>
                  </div>

                  {/* Card 2: Marcações */}
                  <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 relative">
                    <div className="flex items-center justify-between text-white/60 text-[9px] sm:text-[11px] mb-1">
                      <span>Marcações</span>
                      <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#fee96d] text-black flex items-center justify-center font-bold text-[9px] sm:text-xs">
                        <Calendar size={10} className="sm:w-3 sm:h-3" />
                      </div>
                    </div>
                    <div className="text-sm sm:text-xl font-bold text-white">1</div>
                    <div className="text-[8px] sm:text-[10px] text-emerald-400 mt-0.5 sm:mt-1 flex items-center gap-1 font-medium">
                      <span>↑ +0%</span>
                      <span className="text-white/40 hidden sm:inline">vs. mês anterior</span>
                    </div>
                  </div>

                  {/* Card 3: Ocupação */}
                  <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 relative">
                    <div className="flex items-center justify-between text-white/60 text-[9px] sm:text-[11px] mb-1">
                      <span>Ocupação</span>
                      <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#fee96d] text-black flex items-center justify-center font-bold text-[9px] sm:text-xs">
                        <Users size={10} className="sm:w-3 sm:h-3" />
                      </div>
                    </div>
                    <div className="text-sm sm:text-xl font-bold text-white">0.06%</div>
                    <div className="text-[8px] sm:text-[10px] text-emerald-400 mt-0.5 sm:mt-1 flex items-center gap-1 font-medium">
                      <span>↑ +0%</span>
                      <span className="text-white/40 hidden sm:inline">vs. mês anterior</span>
                    </div>
                  </div>

                  {/* Card 4: Ticket Médio */}
                  <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 relative">
                    <div className="flex items-center justify-between text-white/60 text-[9px] sm:text-[11px] mb-1">
                      <span>Ticket médio</span>
                      <span className="text-[#fee96d] font-bold text-xs sm:text-sm">€</span>
                    </div>
                    <div className="text-sm sm:text-xl font-bold text-[#fee96d]">€ 12,00</div>
                    <div className="text-[8px] sm:text-[10px] text-white/40 mt-0.5 sm:mt-1">Hoje: € 0,00</div>
                  </div>

                </div>

                {/* Chart Box (Receita ao longo do tempo) */}
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between mb-1.5 sm:mb-3 text-[10px] sm:text-xs">
                    <div>
                      <span className="font-bold text-white flex items-center gap-1.5 sm:gap-2">
                        <TrendingUp size={12} className="text-[#fee96d] sm:w-3.5 sm:h-3.5" />
                        <span>Receita ao longo do tempo</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[11px]">
                      <span className="flex items-center gap-1 sm:gap-1.5 text-white/80 font-medium">
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#fee96d]" /> Receita (€)
                      </span>
                    </div>
                  </div>

                  {/* Wave Graph SVG with Grid Lines */}
                  <div className="h-16 sm:h-32 w-full relative pt-1 sm:pt-2">
                    <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 500 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="goldGradientFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#fee96d" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#fee96d" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0,95 Q 100,95 200,95 T 380,95 Q 420,25 455,25 T 500,95 L 500,100 L 0,100 Z"
                        fill="url(#goldGradientFill)"
                      />
                      <path
                        d="M 0,95 Q 100,95 200,95 T 380,95 Q 420,25 455,25 T 500,95"
                        fill="none"
                        stroke="#fee96d"
                        strokeWidth="3.5"
                      />
                    </svg>
                    
                    {/* X Axis Dates */}
                    <div className="flex justify-between text-[8px] sm:text-[10px] text-white/40 font-mono mt-1 pt-0.5 sm:pt-1 border-t border-white/10">
                      <span>1 Set</span>
                      <span>10 Set</span>
                      <span>20 Set</span>
                      <span>30 Set</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Marcações de Hoje & Clientes Recentes (Aparece apenas de tablet para cima para manter laptop compacto em mobile) */}
                <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  
                  {/* Marcações de hoje */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <span className="font-bold text-white flex items-center gap-2">
                        <Calendar size={14} className="text-[#fee96d]" /> 
                        <span>Marcações de hoje</span>
                      </span>
                      <span className="text-[10px] text-[#fee96d] font-bold cursor-pointer hover:underline">Ver todas →</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#fee96d]/20 text-[#fee96d] font-bold flex items-center justify-center text-xs">TS</div>
                        <div>
                          <span className="font-bold text-white block">Tiago Silva</span>
                          <span className="text-[10px] text-white/50">10:00 · Corte de cabelo</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        Confirmada
                      </span>
                    </div>
                  </div>

                  {/* Clientes recentes */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <span className="font-bold text-white flex items-center gap-2">
                        <Users size={14} className="text-[#fee96d]" /> 
                        <span>Clientes recentes</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 text-xs">
                      <div className="w-7 h-7 rounded-full bg-[#fee96d]/20 text-[#fee96d] font-bold flex items-center justify-center text-xs">TS</div>
                      <div>
                        <span className="font-bold text-white block">Tiago Silva</span>
                        <span className="text-[10px] text-white/40">Último cliente registado</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* LAPTOP KEYBOARD BASE & SHADOW */}
          <div className="w-[104%] -ml-[2%] h-3 sm:h-6 bg-gradient-to-b from-[#32323f] via-[#1c1c24] to-[#0d0d12] rounded-b-xl sm:rounded-b-2xl border-t border-white/25 shadow-2xl relative">
            <div className="w-16 sm:w-32 h-1 sm:h-2 bg-[#4a4a5a] rounded-b-lg mx-auto" />
          </div>


          {/* SMARTPHONE OVERLAY MOCKUP (DIREITA INFERIOR - VISÍVEL APENAS EM TABLET / DESKTOP PARA MANTER MOBILE SUPER ULTRA LIMPO) */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden sm:block absolute -bottom-10 right-0 sm:right-2 z-40 w-52 sm:w-64 rounded-[36px] sm:rounded-[44px] p-2.5 bg-[#1f1f28] border-4 sm:border-[7px] border-[#313140] shadow-[0_25px_70px_rgba(0,0,0,0.98)]"
          >
            {/* Phone Screen Body */}
            <div className="bg-[#0a0a0e] rounded-[28px] sm:rounded-[36px] p-3.5 text-white overflow-hidden font-sans border border-white/10">
              
              {/* Phone Status Notch Bar */}
              <div className="flex items-center justify-between text-[10px] text-white/50 px-2 pb-2 mb-1.5 border-b border-white/10">
                <span className="font-semibold">9:41</span>
                <div className="w-12 h-2.5 bg-black rounded-full mx-auto" />
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              </div>

              {/* App Navigation Bar */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Menu size={14} className="text-white/70" />
                  <span className="font-heading font-bold text-sm text-white">Convecta.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell size={13} className="text-white/60" />
                  <div className="w-5 h-5 rounded-full bg-[#fee96d] text-black font-black text-[9px] flex items-center justify-center">A</div>
                </div>
              </div>

              {/* Date Filter Dropdown */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 text-[10px] text-white/70 mb-3">
                <span className="font-mono">01/09/2026 → 30/09/2026</span>
                <ChevronDown size={12} className="text-[#fee96d]" />
              </div>

              {/* 2x2 Grid Stats Mobile */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[8px] text-white/40 block">Receita</span>
                  <span className="text-xs font-bold text-[#fee96d]">€ 12,00</span>
                  <span className="text-[8px] text-emerald-400 block mt-0.5">+12% +0%</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[8px] text-white/40 block">Marcações</span>
                  <span className="text-xs font-bold text-white">1</span>
                  <span className="text-[8px] text-emerald-400 block mt-0.5">+0% +0%</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[8px] text-white/40 block">Ocupação</span>
                  <span className="text-xs font-bold text-white">0.06%</span>
                  <span className="text-[8px] text-emerald-400 block mt-0.5">+0% +0%</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[8px] text-white/40 block">Ticket médio</span>
                  <span className="text-xs font-bold text-[#fee96d]">€ 12,00</span>
                </div>
              </div>

              {/* Mini Wave Chart Box */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 mb-3">
                <div className="text-[9px] font-bold text-[#fee96d] mb-1 flex items-center justify-between">
                  <span>Receita ao longo do tempo</span>
                </div>
                <div className="h-12 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 200 50" preserveAspectRatio="none">
                    <path d="M 0,45 Q 50,45 100,45 T 150,10 T 200,45" fill="none" stroke="#fee96d" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>

              {/* Phone Bottom Tab Bar */}
              <div className="flex items-center justify-around pt-2 border-t border-white/10 text-[9px]">
                <div className="flex flex-col items-center text-[#fee96d] font-bold">
                  <BarChart3 size={13} />
                  <span className="mt-0.5">Dashboard</span>
                </div>
                <div className="flex flex-col items-center text-white/40">
                  <Calendar size={13} />
                  <span className="mt-0.5">Agenda</span>
                </div>
                <div className="flex flex-col items-center text-white/40">
                  <Users size={13} />
                  <span className="mt-0.5">Clientes</span>
                </div>
                <div className="flex flex-col items-center text-white/40">
                  <MoreHorizontal size={13} />
                  <span className="mt-0.5">Mais</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* REFLEXO ESPELHADO DO CHÃO (SURFACE REFLECTION EFFECT) */}
        <div className="w-[90%] h-12 sm:h-20 bg-gradient-to-b from-[#fee96d]/15 via-[#fee96d]/5 to-transparent rounded-full blur-2xl mt-2 sm:mt-4 pointer-events-none" />

      </div>
    </div>
  );
}