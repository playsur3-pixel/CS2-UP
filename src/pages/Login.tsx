import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/utils/firebaseConfig";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
  await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        console.error("Erreur inconnue :", err);
      }
    }

    
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#0f172a_0%,_#020617_45%,_#0f172a_100%)] px-4">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-slate-700/50">
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
            ⦿
          </div>
          <h1 className="text-2xl font-bold text-white">CS2 COACH</h1>
          <p className="text-slate-400 text-sm">
            PERFORMANCE TRACKING SYSTEM
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-slate-200 text-sm mb-1 block">Email</label>
            <input
              type="email"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-slate-200 text-sm mb-1 block">Mot de passe</label>
            <input
              type="password"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-950/40 rounded-md p-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition text-white font-semibold py-2 rounded-lg"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center mt-4 text-slate-400 text-sm">
          Mot de passe oublié ?
        </p>
      </div>
    </div>
  );
}
}
