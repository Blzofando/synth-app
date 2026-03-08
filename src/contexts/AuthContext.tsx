"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  userStatus: "pending" | "approved" | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userStatus: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userStatus, setUserStatus] = useState<"pending" | "approved" | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          // Busca o status do usuário no Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserStatus(data.status as "pending" | "approved");
          } else {
            // Se o usuário está no auth, mas não no firestore, seta pending.
            setUserStatus("pending"); 
          }
        } catch (error) {
          console.error("Erro ao buscar status do usuário:", error);
          setUserStatus("pending");
        }
      } else {
        setUser(null);
        setUserStatus(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Lógica de Redirecionamento de Segurança (Protocolo de Ferro)
  useEffect(() => {
    if (loading) return; // Espera carregar os dados antes de redirecionar

    const isAuthRoute = pathname === "/login" || pathname === "/cadastro" || pathname === "/recuperar-senha";
    
    // 1. Não logado tentando acessar área restrita
    if (!user && !isAuthRoute) {
      router.push("/login");
      return;
    }

    // 2. Logado tentando acessar rotas de login/cadastro
    if (user && isAuthRoute) {
      if (userStatus === "approved") {
        router.push("/");
      } else {
        router.push("/aguardando-aprovacao");
      }
      return;
    }

    // 3. Logado, mas com status pending tentando acessar o dashboard
    if (user && userStatus === "pending" && pathname !== "/aguardando-aprovacao") {
      router.push("/aguardando-aprovacao");
      return;
    }

    // 4. Logado e aprovado tentando acessar tela de aguardando
    if (user && userStatus === "approved" && pathname === "/aguardando-aprovacao") {
      router.push("/");
      return;
    }
  }, [user, userStatus, loading, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, userStatus, loading }}>
        {/* Mostra um loader simples enquanto carrega a autenticação inicial */}
        {loading ? (
            <div className="min-h-screen bg-[#0A0514] flex items-center justify-center">
               <div className="w-10 h-10 border-4 border-[#7C28D6] border-t-transparent rounded-full animate-spin"></div>
            </div>
        ) : children}
    </AuthContext.Provider>
  );
}
