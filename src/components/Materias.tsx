"use client";
import { useState, useCallback } from "react";
import { Search, Bell, MessageSquare, Plus, Play, BookOpen, Clock, User, X } from "lucide-react";
import { Sidebar } from "./Sidebar";

import Link from "next/link";
import { Materia, mockMaterias } from "@/lib/mockData";



export function Materias() {
  const [materias, setMaterias] = useState<Materia[]>(mockMaterias);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados do Formulário
  const [newSubject, setNewSubject] = useState("");
  const [newProfessor, setNewProfessor] = useState("");
  const [newTime, setNewTime] = useState("");

  const handleAddMateria = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newProfessor.trim() || !newTime.trim()) return;

    const newMateria: Materia = {
      id: Date.now(),
      subject: newSubject,
      professor: newProfessor,
      time: newTime,
      iconColor: "bg-gray-600/20 text-gray-400 border-gray-600/30",
      anotacoes: [],
      videos: []
    };

    setMaterias([newMateria, ...materias]);
    setIsModalOpen(false);
    
    // Limpar form
    setNewSubject("");
    setNewProfessor("");
    setNewTime("");
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-brand-bg)] text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col px-4 md:px-8 py-6 pb-28 md:pb-8 md:ml-64 max-w-7xl mx-auto space-y-8 w-full transition-all">
        
        {/* Header (Topo Fixo) */}
        <header className="flex flex-col md:flex-row items-center gap-4 pt-4 sticky top-0 bg-[var(--color-brand-bg)]/90 backdrop-blur-md z-10 py-2 w-full">
          <div className="relative w-full md:max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Pesquisar em matérias..."
              className="w-full bg-[#140D26]/60 border border-[#231C3B] rounded-full py-3.5 pl-12 pr-4 text-sm text-gray-200 focus:outline-none focus:border-[#7C28D6]/50 placeholder-gray-600 transition-colors"
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

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
              Minhas Matérias <BookOpen className="h-8 w-8 text-[#A753FF]" />
            </h1>
            <p className="text-gray-400 text-sm md:text-base">Gerencie suas disciplinas e acompanhe seus conteúdos recomendados.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
             {/* Botão de Iniciar Aula Agora */}
             <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#7C28D6] to-[#F72585] hover:opacity-90 transition-opacity text-white font-semibold py-3.5 px-6 rounded-full shadow-[0_0_20px_rgba(247,37,133,0.2)]">
               <Play className="h-4 w-4 fill-white" /> Iniciar Aula Agora
             </button>
             {/* Botão de Adicionar */}
             <button 
               onClick={() => setIsModalOpen(true)}
               className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#140D26] border border-[#231C3B] hover:border-[#7C28D6]/50 hover:bg-[#231C3B]/50 transition-all text-white font-semibold py-3.5 px-6 rounded-full"
             >
               <Plus className="h-5 w-5" /> Adicionar Matéria
             </button>
          </div>
        </div>

        {/* Lista de Matérias */}
        <div className="grid grid-cols-1 gap-6">
          {materias.map((materia) => (
            <div key={materia.id} className="bg-[#140D26] border border-[#231C3B] rounded-3xl p-6 shadow-sm hover:border-gray-700 transition-colors">
               <div className="flex flex-col md:flex-row justify-between gap-6 mb-2">
                  <div className="flex items-start gap-4 flex-1">
                     <div className={`mt-1 w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${materia.iconColor}`}>
                       <BookOpen className="h-6 w-6" />
                     </div>
                     <div>
                       <h2 className="text-2xl font-bold text-white mb-2">{materia.subject}</h2>
                       <div className="flex flex-col gap-2 text-sm text-gray-400">
                         <div className="flex items-center gap-2">
                           <User className="h-4 w-4" /> {materia.professor}
                         </div>
                         <div className="flex items-center gap-2">
                           <Clock className="h-4 w-4" /> {materia.time}
                         </div>
                       </div>
                     </div>
                  </div>
                  <div className="md:text-right flex md:flex-col items-center justify-between md:items-end md:justify-start gap-3">
                     <Link href={`/materias/${materia.id}`} className="text-sm font-semibold text-gray-400 hover:text-white transition-colors bg-[#0A0514] border border-[#231C3B] px-4 py-2 rounded-xl">
                       Acessar Material
                     </Link>
                  </div>
               </div>
            </div>
          ))}

          {materias.length === 0 && (
             <div className="w-full bg-[#140D26]/40 border border-dashed border-[#231C3B] rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                 <BookOpen className="h-16 w-16 text-gray-600 mb-4" />
                 <h3 className="text-white font-medium text-xl mb-2">Nenhuma matéria encontrada</h3>
                 <p className="text-gray-400 max-w-sm">Você ainda não tem matérias cadastradas. Clique no botão acima para adicionar sua primeira matéria.</p>
             </div>
          )}
        </div>


      </div>

      {/* Modal de Adicionar Matéria */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#140D26] border border-[#231C3B] rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-[#231C3B]">
              <h3 className="text-xl font-bold text-white">Nova Matéria</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-[#231C3B] rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddMateria} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Nome da Matéria</label>
                <input 
                  type="text"
                  required
                  placeholder="Ex: Engenharia de Software"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full bg-[#0A0514] border border-[#231C3B] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#7C28D6] focus:ring-1 focus:ring-[#7C28D6] transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Professor</label>
                <input 
                  type="text"
                  required
                  placeholder="Ex: Prof. Dr. Silva"
                  value={newProfessor}
                  onChange={(e) => setNewProfessor(e.target.value)}
                  className="w-full bg-[#0A0514] border border-[#231C3B] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#7C28D6] focus:ring-1 focus:ring-[#7C28D6] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Horário</label>
                <input 
                  type="text"
                  required
                  placeholder="Ex: 10:00 - 11:30"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-[#0A0514] border border-[#231C3B] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#7C28D6] focus:ring-1 focus:ring-[#7C28D6] transition-all"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-transparent border border-[#231C3B] hover:bg-[#231C3B]/50 rounded-xl font-semibold text-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-[#7C28D6] to-[#F72585] hover:opacity-90 shadow-lg rounded-xl font-semibold text-white transition-opacity"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
