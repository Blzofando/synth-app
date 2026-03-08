"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Clock } from "lucide-react";

export default function AguardandoAprovacaoPage() {
  function handleLogout() {
    signOut(auth);
  }

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#140D26] border border-[#231C3B] rounded-2xl p-8 shadow-2xl text-center">
        <div className="mx-auto bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Clock className="w-8 h-8 text-amber-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-3">Cadastro em Análise</h1>
        
        <p className="text-gray-400 text-base leading-relaxed mb-8">
          Sua conta foi criada com sucesso, mas este é um ambiente restrito. 
          Um administrador precisa validar o seu acesso antes de você poder entrar no Dashboard.
        </p>

        <div className="bg-[#0A0514] border border-[#231C3B] rounded-xl p-4 mb-8">
          <p className="text-sm text-gray-400">
            Verifique regularmente. Se demorar muito, entre em contato com a coordenação.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-[#231C3B] hover:bg-[#322851] text-white font-semibold rounded-xl py-3.5 transition-colors"
        >
          Sair da Conta
        </button>
      </div>
    </div>
  );
}
