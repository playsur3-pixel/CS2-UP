import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/utils/firebaseConfig";

export default function Home(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur inconnue lors de la connexion.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-950 via-slate-900 to-amber-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-800">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
            ⦿
          </div>
          <h1 className="text-2xl font-bold text-white">CS2 COACH</h1>
          <p className="text-slate-400 text-sm mt-1">
            PERFORMANCE TRACKING SYSTEM
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-slate-200 text-sm mb-1">
              Adresse e-mail
            </label>
            <input
              type="email"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
              placeholder="exemple@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-slate-200 text-sm mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
              placeholder="••••••••"
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
            disabled={loading}
            className={`w-full transition font-semibold py-2 rounded-lg text-white ${
              loading
                ? "bg-orange-700 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center mt-4 text-slate-400 text-sm">
          Mot de passe oublié ?
        </p>
      </div>
    </div>
  );
}
