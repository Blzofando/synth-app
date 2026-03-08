"use client";
import { useState, useCallback } from "react";
import { ArrowLeft, Play, FileText, CheckCircle2, ChevronLeft, ChevronRight, PenTool, LayoutDashboard, BookOpen } from "lucide-react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { Materia, Video } from "@/lib/mockData";
import { Sidebar } from "./Sidebar";

// Componente do Carrossel (movido para cá e isolado para a matéria específica)
function RecomendaCarousel({ videos }: { videos: Video[] }) {
  const [carouselRef, carouselApi] = useEmblaCarousel({ align: "start", dragFree: true });

  const scrollPrev = useCallback(() => carouselApi && carouselApi.scrollPrev(), [carouselApi]);
  const scrollNext = useCallback(() => carouselApi && carouselApi.scrollNext(), [carouselApi]);

  if (!videos || videos.length === 0) return (
    <div className="text-gray-500 text-sm mt-4 p-8 border border-dashed border-[#231C3B] rounded-2xl text-center bg-[#140D26]/50">
      Nenhum material recomendado para esta matéria no momento.
    </div>
  );

  return (
    <div className="relative group">
      <div className="flex justify-between items-center mb-6">
         <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Play className="h-5 w-5 text-[#A753FF]" /> Recomendações
         </h3>
         <div className="flex gap-2">
           <button onClick={scrollPrev} className="p-2 rounded-full bg-[#140D26] border border-[#231C3B] text-gray-400 hover:text-white transition-colors hover:border-[#7C28D6]/50">
              <ChevronLeft className="h-4 w-4" />
           </button>
           <button onClick={scrollNext} className="p-2 rounded-full bg-[#140D26] border border-[#231C3B] text-gray-400 hover:text-white transition-colors hover:border-[#7C28D6]/50">
              <ChevronRight className="h-4 w-4" />
           </button>
         </div>
      </div>
      <div className="overflow-hidden w-full" ref={carouselRef}>
        <div className="flex gap-4 touch-pan-y pt-2 pb-6">
          {videos.map(video => (
            <div key={video.id} className="min-w-[260px] flex-[0_0_auto] bg-[#140D26] border border-[#231C3B] rounded-2xl overflow-hidden hover:border-[#7C28D6]/50 transition-colors group/card cursor-pointer flex flex-col shadow-sm hover:shadow-[0_4px_20px_rgba(124,40,214,0.15)]">
              <div className={`h-40 w-full ${video.thumbnail} relative flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/40 group-hover/card:bg-transparent transition-colors"></div>
                <div className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-1 rounded-lg text-xs font-bold text-white z-10 backdrop-blur-sm">
                  {video.duration}
                </div>
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity z-10 scale-75 group-hover/card:scale-100 shadow-xl">
                  <Play className="h-6 w-6 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-[#140D26] to-[#0A0514]">
                <span className="text-[10px] font-bold text-[#A753FF] uppercase tracking-widest mb-2">{video.type}</span>
                <span className="text-[15px] font-semibold text-white leading-snug line-clamp-2" title={video.title}>{video.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MateriaInterna({ materia }: { materia: Materia }) {
  if (!materia) return null;

  return (
    <div className="flex min-h-screen bg-[var(--color-brand-bg)] text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col px-4 md:px-8 py-6 pb-28 md:pb-8 md:ml-64 max-w-7xl mx-auto space-y-6 md:space-y-8 transition-all overflow-hidden">
        
        {/* Navegação Topo */}
        <div className="pt-2 flex items-center gap-4">
           <Link href="/materias" className="p-2.5 rounded-full bg-[#140D26] border border-[#231C3B] text-gray-400 hover:text-white transition-colors hover:bg-[#231C3B]/50 group shrink-0">
             <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
           </Link>
           <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Voltar para Matérias</span>
        </div>

        {/* Hero Section Específico da Matéria */}
        <div className="relative bg-[#140D26] border border-[#231C3B] rounded-3xl p-6 md:p-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C28D6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="w-full md:w-auto">
              <div className="flex items-center gap-3 mb-4">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${materia.iconColor}`}>
                   <BookOpen className="h-6 w-6" />
                 </div>
                 <span className="text-[#A753FF] font-bold tracking-widest text-xs uppercase bg-[#A753FF]/10 px-3 py-1.5 rounded-lg border border-[#A753FF]/20">
                    Disciplina Ativa
                 </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight break-words">{materia.subject}</h1>
              <p className="text-lg text-gray-400 font-medium">{materia.professor}</p>
            </div>

            {/* Ações Rápidas (Fixar Conteúdo / Revisão) */}
            <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
               <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#140D26] border border-[#231C3B] hover:border-[#A753FF]/50 hover:bg-[#A753FF]/10 transition-all text-white font-semibold py-2.5 px-3 md:py-3 md:px-5 rounded-xl shadow-sm whitespace-nowrap text-xs md:text-base">
                 <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-[#A753FF] shrink-0" /> Fixar
               </button>
               <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#140D26] border border-[#231C3B] hover:border-[#F72585]/50 hover:bg-[#F72585]/10 transition-all text-white font-semibold py-2.5 px-3 md:py-3 md:px-5 rounded-xl shadow-sm whitespace-nowrap text-xs md:text-base">
                 <PenTool className="h-4 w-4 md:h-5 md:w-5 text-[#F72585] shrink-0" /> Revisão
               </button>
            </div>
          </div>
        </div>

        {/* Layout Duas Colunas (Anotações e Extras) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          
          {/* Coluna Principal: Histórico de Aulas e Anotações */}
          <div className="lg:col-span-2 flex flex-col gap-6">
             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
                  <LayoutDashboard className="h-5 w-5 md:h-6 md:w-6 text-gray-400 shrink-0" /> Histórico de Aulas
                </h2>
                <span className="text-xs md:text-sm text-gray-500 font-medium">Anotações salvas automaticamente</span>
             </div>

             <div className="relative">
                {/* Linha da Timeline */}
                <div className="absolute left-[11px] top-6 bottom-0 w-px bg-gradient-to-b from-[#231C3B] to-transparent"></div>

                <div className="flex flex-col gap-4 md:gap-5 relative z-10">
                  {materia.anotacoes.map((anotacao) => (
                    <div key={anotacao.id} className="relative flex gap-4 pr-2">
                       {/* Bolinha da Timeline */}
                       <div className="w-6 h-6 rounded-full bg-[#140D26] border-2 border-[#7C28D6] flex-shrink-0 mt-0.5 flex items-center justify-center shadow-[0_0_10px_rgba(124,40,214,0.3)]">
                         <div className="w-2 h-2 rounded-full bg-[#7C28D6]"></div>
                       </div>
                       
                       <div className="flex-1 pb-3 md:pb-4 border-b border-[#231C3B]/50 last:border-0 last:pb-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1.5">
                             <h3 className="text-sm md:text-base font-bold text-gray-200">
                               Aula: {anotacao.titulo}
                             </h3>
                             <span className="text-xs font-bold text-gray-500">
                               {anotacao.data}
                             </span>
                          </div>
                          
                          <p className="text-xs md:text-sm text-gray-400 mb-2.5 leading-relaxed line-clamp-2">
                             {anotacao.conteudoPreview}
                          </p>

                          {anotacao.documentoRef && (
                            <div className="flex w-fit items-center gap-1.5 text-[11px] md:text-xs font-medium text-[#A753FF] hover:text-[#c48bff] transition-colors cursor-pointer bg-[#140D26] px-2.5 py-1 md:py-1.5 rounded-lg border border-[#A753FF]/30 hover:border-[#A753FF]/60 shadow-[0_0_10px_rgba(124,40,214,0.1)]">
                              <FileText className="h-3 w-3 md:h-3.5 md:w-3.5" /> Arquivo: {anotacao.documentoRef}
                            </div>
                          )}
                       </div>
                    </div>
                  ))}
                </div>

                {materia.anotacoes.length === 0 && (
                   <div className="bg-[#140D26]/40 border border-dashed border-[#231C3B] rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                     <div className="w-16 h-16 bg-[#231C3B] rounded-full flex items-center justify-center mb-4">
                       <FileText className="h-8 w-8 text-gray-500" />
                     </div>
                     <p className="text-gray-400 font-medium">Nenhuma anotação de aula encontrada.</p>
                     <p className="text-xs text-gray-500 mt-2">Suas anotações aparecerão aqui automaticamente após a aula.</p>
                   </div>
                )}
             </div>

             {materia.anotacoes.length > 0 && (
                <button className="w-full py-4 rounded-xl border border-[#231C3B] bg-[#140D26]/50 text-gray-400 font-semibold hover:bg-[#231C3B] hover:text-white transition-all mt-2">
                  Carregar aulas anteriores
                </button>
             )}
          </div>

          {/* Coluna Sidebar Direita: Estatísticas ou Ferramentas Isoladas */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#140D26] border border-[#231C3B] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Progresso da Matéria</h3>
              <div className="flex items-end gap-2 mb-2">
                 <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7C28D6] to-[#F72585]">{materia.anotacoes.length}</span>
                 <span className="text-sm text-gray-400 font-medium mb-1">aulas registradas</span>
              </div>
              <div className="w-full bg-[#0A0514] h-2 rounded-full overflow-hidden border border-[#231C3B]/50 mt-4">
                  <div className="bg-gradient-to-r from-[#7C28D6] to-[#F72585] h-full w-[45%] rounded-full relative"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Separador e Carrossel em baixo isolado */}
        <div className="pt-8 mt-4 border-t border-[#231C3B]">
          <RecomendaCarousel videos={materia.videos} />
        </div>

      </div>
    </div>
  );
}
