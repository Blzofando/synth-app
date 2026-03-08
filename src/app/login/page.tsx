"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirecionamento é automático via AuthContext
    } catch {
      setError("Credenciais inválidas. Verifique seu e-mail e senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#140D26] border border-[#231C3B] rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto bg-gradient-to-br from-[#7C28D6] to-[#A753FF] w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(124,40,214,0.5)]">
            <span className="text-white font-bold text-xl">U</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta!</h1>
          <p className="text-gray-400 text-sm">Acesse o seu portal de aprendizado.</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 text-rose-500 rounded-lg p-3 text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-gray-400" htmlFor="password">Senha</label>
              <Link href="/recuperar-senha" className="text-xs text-[#A753FF] hover:text-white transition-colors">
                Esqueceu a senha?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0514] border border-[#231C3B] rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#7C28D6] transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#7C28D6] to-[#F72585] text-white font-bold rounded-xl py-3.5 mt-4 hover:opacity-90 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(247,37,133,0.2)]"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          Não tem uma conta?{" "}
          <Link href="/cadastro" className="text-white hover:text-[#A753FF] font-medium transition-colors">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
