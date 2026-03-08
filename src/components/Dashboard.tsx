"use client";
import { Search, Play, Bell, MessageSquare, ChevronRight, Users, Clock, MoreHorizontal, FolderKanban, ChevronLeft } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { RadarChartComponent } from "./RadarChartComponent";
import { Sidebar } from "./Sidebar";

// Dados mockados solicitados
const todayClasses = [
  {
    id: 1,
    subject: "Cálculo III",
    time: "08:00 - 09:30",
    title: "Integrais Triplas em Coord. Esféricas",
    professor: "Prof. Dr. Ricardo Santos",
    icon: "bg-blue-600/20 text-blue-400",
  },
  {
    id: 2,
    subject: "Algoritmos",
    time: "10:00 - 11:30",
    title: "Estruturas de Dados Dinâmicas",
    professor: "Dra. Amanda Oliveira",
    icon: "bg-emerald-600/20 text-emerald-400",
  },
  {
    id: 3,
    subject: "Física Exp.",
    time: "13:30 - 15:00",
    title: "Laboratório: Pêndulo Físico",
    professor: "Prof. Marcos Souza",
    icon: "bg-rose-600/20 text-rose-400",
  }
];

const projects = [
  {
    id: 1,
    title: "App de Gestão Financeira",
    subject: "Eng. de Software",
    progress: 75,
    dueDate: "24/10",
    team: 4,
    status: "Em Andamento",
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "Artigo sobre IA Simbólica",
    subject: "Inteligência Artificial",
    progress: 30,
    dueDate: "15/11",
    team: 2,
    status: "Atrasado",
    color: "from-amber-500 to-orange-400"
  },
  {
    id: 3,
    title: "API RESTful Node.js",
    subject: "Prog. Web Backend",
    progress: 100,
    dueDate: "Entregue",
    team: 1,
    status: "Concluído",
    color: "from-emerald-500 to-teal-400"
  }
];

const deadlines = [
  {
    id: 1,
    type: "URGENTE",
    timeRemaining: "Faltam 2h",
    title: "Relatório de Física Exp. II",
    desc: "Enviar via Canvas antes das 23:59",
    dotColor: "bg-rose-500",
    borderColor: "border-rose-500",
  },
  {
    id: 2,
    type: "ATENÇÃO",
    timeRemaining: "Amanhã",
    title: "Quiz de S.O.",
    desc: "Capítulo 4: Gerência de Memória",
    dotColor: "bg-amber-500",
    borderColor: "border-amber-500",
  },
];

export function Dashboard() {
  const [classesRef, classesApi] = useEmblaCarousel({ align: "start", dragFree: true });
  const [projectsRef, projectsApi] = useEmblaCarousel({ align: "start", dragFree: true });

  const scrollPrevClasses = useCallback(() => classesApi && classesApi.scrollPrev(), [classesApi]);
  const scrollNextClasses = useCallback(() => classesApi && classesApi.scrollNext(), [classesApi]);
  
  const scrollPrevProjects = useCallback(() => projectsApi && projectsApi.scrollPrev(), [projectsApi]);
  const scrollNextProjects = useCallback(() => projectsApi && projectsApi.scrollNext(), [projectsApi]);

  return (
    <div className="flex min-h-screen bg-[var(--color-brand-bg)] text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col px-4 md:px-8 py-6 pb-28 md:pb-8 md:ml-64 max-w-7xl mx-auto space-y-8 w-full transition-all">
        {/* 1. Header (Topo Fixo) */}
        <header className="flex flex-col md:flex-row items-center gap-4 pt-4 sticky top-0 bg-[var(--color-brand-bg)]/90 backdrop-blur-md z-10 py-2">
        <div className="relative w-full md:max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Pesquisar aulas, anotações ou termos..."
            className="w-full bg-[#140D26] border border-[#231C3B] rounded-full py-3.5 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#A753FF] placeholder-gray-500 shadow-inner"
          />
        </div>
        <div className="flex gap-3 ml-auto hidden md:flex">
          <button className="p-3 rounded-full bg-[#140D26] border border-[#231C3B] text-gray-300 hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-3 rounded-full bg-[#140D26] border border-[#231C3B] text-gray-300 hover:text-white transition-colors">
            <MessageSquare className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Hero Header Area (Saudações) */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
            Olá, Alex <span className="text-4xl animate-bounce">👋</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">Pronto para a jornada de aprendizado de hoje?</p>
        </div>

        {/* 2. Hero Section - Botão de Ação Rápida */}
        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#7C28D6] to-[#F72585] hover:opacity-90 transition-opacity text-white font-semibold py-4 md:py-3.5 px-8 rounded-full shadow-[0_0_25px_rgba(247,37,133,0.3)]">
          <span>🚀</span> Iniciar Aula Agora <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* 3. Grid de Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Coluna 1 - Visão do Dia */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <div className="bg-[#7C28D6] p-1.5 rounded-full shadow-[0_0_10px_rgba(124,40,214,0.5)]">
                <Play className="h-4 w-4 text-white fill-white" />
              </div> 
              Aulas de Hoje
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <button onClick={scrollPrevClasses} className="p-1.5 rounded-full bg-[#140D26] border border-[#231C3B] text-gray-400 hover:text-white transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={scrollNextClasses} className="p-1.5 rounded-full bg-[#140D26] border border-[#231C3B] text-gray-400 hover:text-white transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <a href="#" className="text-sm font-medium text-[#A753FF] hover:text-white transition-colors hidden sm:block">Ver cronograma completo</a>
            </div>
          </div>

          <div className="overflow-hidden w-full -mx-4 px-4 sm:mx-0 sm:px-0" ref={classesRef}>
            <div className="flex gap-4 touch-pan-y">
              {todayClasses.map((cls) => (
                <div key={cls.id} className="min-w-[280px] sm:min-w-[320px] flex-[0_0_auto] bg-[#140D26] border border-[#231C3B] rounded-2xl p-5 hover:border-gray-700 transition-colors flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${cls.icon}`}>
                      {cls.subject}
                    </span>
                    <span className="text-sm text-gray-400 font-medium">{cls.time}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 leading-tight flex-grow">{cls.title}</h3>
                  <p className="text-sm text-gray-400 mb-6">{cls.professor}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex -space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#140D26]"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#140D26]"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#140D26] flex items-center justify-center text-[10px] font-bold">+12</div>
                    </div>
                    <button className="p-2.5 rounded-xl bg-black/20 hover:bg-white/10 text-gray-400 transition-colors group">
                      <MessageSquare className="h-4 w-4 group-hover:text-white" />
                    </button>
                  </div>
                </div>
              ))}
              {todayClasses.length === 0 && (
                <div className="w-full bg-[#140D26]/40 border border-dashed border-[#231C3B] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">Dia Livre!</h3>
                  <p className="text-gray-400 max-w-sm">Você não tem aulas cadastradas para hoje. Ótimo momento para adiantar suas entregas ou descansar.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Card: Progresso Semestral */}
          <div className="bg-[#140D26] border border-[#231C3B] rounded-2xl p-6 mt-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1 w-full">
              <h3 className="font-semibold text-xl mb-1.5">Progresso Semestral</h3>
              <p className="text-gray-400 text-sm mb-5">Você completou 65% das atividades previstas para esta semana.</p>
              <div className="w-full bg-[#0A0514] h-3 rounded-full overflow-hidden border border-[#231C3B]/50">
                <div className="bg-gradient-to-r from-[#7C28D6] to-[#F72585] h-full w-[65%] rounded-full relative">
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/30 rounded-full mix-blend-overlay"></div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="bg-[#0A0514] border border-[#231C3B] px-6 py-4 rounded-xl flex flex-col items-center flex-1 md:flex-none md:min-w-[110px]">
                <span className="text-2xl font-bold text-white">12</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mt-1">Entregues</span>
              </div>
              <div className="bg-[#0A0514] border border-[#231C3B] px-6 py-4 rounded-xl flex flex-col items-center flex-1 md:flex-none md:min-w-[110px]">
                <span className="text-2xl font-bold text-[#A753FF]">04</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mt-1">Pendentes</span>
              </div>
            </div>
          </div>

          {/* Projetos em Andamento */}
          <div className="mt-2 flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <div className="bg-[#F72585] p-1.5 rounded-full shadow-[0_0_10px_rgba(247,37,133,0.5)]">
                  <FolderKanban className="h-4 w-4 text-white" />
                </div> 
                Projetos Ativos
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <button onClick={scrollPrevProjects} className="p-1.5 rounded-full bg-[#140D26] border border-[#231C3B] text-gray-400 hover:text-white transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button onClick={scrollNextProjects} className="p-1.5 rounded-full bg-[#140D26] border border-[#231C3B] text-gray-400 hover:text-white transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden w-full -mx-4 px-4 sm:mx-0 sm:px-0" ref={projectsRef}>
              <div className="flex gap-4 touch-pan-y">
                {projects.map((project) => (
                  <div key={project.id} className="min-w-[280px] sm:min-w-[300px] flex-[0_0_auto] bg-[#140D26] border border-[#231C3B] rounded-2xl p-5 hover:border-gray-700 transition-all group flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{project.subject}</span>
                      <button className="text-gray-500 hover:text-white transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                    <h3 className="font-semibold text-white mb-4 line-clamp-2 min-h-[44px] text-lg">{project.title}</h3>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-400">Progresso</span>
                        <span className="font-bold text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-[#0A0514] h-1.5 rounded-full overflow-hidden mb-4 border border-[#231C3B]/50">
                        <div className={`h-full rounded-full bg-gradient-to-r ${project.color}`} style={{ width: `${project.progress}%` }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-[#231C3B]">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{project.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 bg-[#0A0514] px-2 py-1 rounded-md border border-[#231C3B]">
                          <Users className="h-3 w-3" />
                          <span>{project.team}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Coluna 2 / Sidebar Direita */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Prazos e Alertas */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <div className="bg-rose-500 p-1.5 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.4)]">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div> 
              Prazos e Alertas
            </h2>
            <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#231C3B] [&::-webkit-scrollbar-thumb]:rounded-full">
              {deadlines.map((item) => (
                <div key={item.id} className={`bg-[#140D26] border-l-4 ${item.borderColor} border-y border-r border-[#231C3B] rounded-2xl p-5 flex flex-col hover:bg-[#191130] transition-colors`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-[10px] font-bold tracking-widest ${item.type === 'URGENTE' ? 'text-rose-500' : 'text-amber-500'}`}>
                      {item.type}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{item.timeRemaining}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-1.5 text-base">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Área de Analytics */}
          <div className="bg-[#140D26] border border-[#231C3B] rounded-2xl p-6 flex-grow flex flex-col">
            <div className="mb-2">
              <h3 className="font-semibold text-xl mb-1">Radar de Fixação</h3>
              <p className="text-sm text-gray-400">Performance por área de conhecimento</p>
            </div>
            
            <RadarChartComponent />
            
            <div className="mt-auto pt-5 flex justify-between items-center border-t border-[#231C3B] text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#A753FF] shadow-[0_0_8px_rgba(167,83,255,0.6)]"></div>
                <span className="text-gray-400 font-medium">Nível Global</span>
              </div>
              <span className="font-bold text-white tracking-wide">Advanced</span>
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
}
