"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";

export default function CadastroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Salva dados no firestore com status pending inicial
      await setDoc(doc(db, "users", userCredential.user.uid), {
        nome: name,
        email: email,
        status: "pending",
        createdAt: serverTimestamp()
      });
      // AuthContext fará o balanço e redirecionará pro aguardando.
    } catch (err) {
      const errorData = err as { code?: string };
      if (errorData.code === "auth/email-already-in-use") {
        setError("Este e-mail já está sendo utilizado por outra conta.");
      } else if (errorData.code === "auth/weak-password") {
        setError("Senha muito fraca, tente adicionar mais caracteres.");
      } else {
        setError("Erro ao criar conta. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#140D26] border border-[#231C3B] rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Crie sua Conta</h1>
          <p className="text-gray-400 text-sm">Preencha os dados abaixo para iniciar sua jornada.</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 text-rose-500 rounded-lg p-3 text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5" htmlFor="name">Nome Completo</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0A0514] border border-[#231C3B] rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#7C28D6] transition-all"
              placeholder="Digite seu nome"
            />
          </div>
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
            <label className="block text-sm font-medium text-gray-400 mb-1.5" htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
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
            {loading ? "Criando Conta..." : "Cadastrar"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          Já tem conta?{" "}
          <Link href="/login" className="text-white hover:text-[#A753FF] font-medium transition-colors">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
