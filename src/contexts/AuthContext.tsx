/* eslint-disable react-refresh/only-export-components */

// src/contexts/AuthContext.tsx
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
