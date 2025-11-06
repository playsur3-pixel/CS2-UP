import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/40 backdrop-blur">
        <h1 className="text-xl font-semibold">CS2 Coach — Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300">{user?.email}</span>
          <button
            onClick={() => signOut(auth)}
            className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-sm"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="p-6">
        <h2 className="text-lg font-semibold mb-4">Bienvenue 👋</h2>
        <p className="text-slate-300">
          Ici tu pourras suivre tes stats, planifier tes séances et accéder à tes VOD.
        </p>
      </main>
    </div>
  );
}
