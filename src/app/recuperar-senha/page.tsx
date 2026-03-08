"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("success");
      setMessage("Se o e-mail existir, um link de recuperação foi enviado.");
    } catch {
      setStatus("error");
      setMessage("Erro ao tentar recuperar senha. Verifique o e-mail digitado.");
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#140D26] border border-[#231C3B] rounded-2xl p-8 shadow-2xl">
        <div className="mb-6">
          <Link href="/login" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar para o Login
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Recuperar Senha</h1>
          <p className="text-gray-400 text-sm">Digite seu e-mail para receber um link de redefinição.</p>
        </div>

        {status === "success" && (
          <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 rounded-lg p-3 text-sm mb-6 text-center">
            {message}
          </div>
        )}

        {status === "error" && (
          <div className="bg-rose-500/10 border border-rose-500/50 text-rose-500 rounded-lg p-3 text-sm mb-6 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5" htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A0514] border border-[#231C3B] rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#7C28D6] transition-all"
              placeholder="exemplo@universidade.com"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#7C28D6] hover:bg-[#6820B8] text-white font-bold rounded-xl py-3.5 mt-4 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(124,40,214,0.3)]"
          >
            {status === "loading" ? "Enviando..." : "Enviar link de recuperação"}
          </button>
        </form>
      </div>
    </div>
  );
}
