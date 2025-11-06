import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { Link } from "react-router-dom";
import { auth } from "@/utils/firebaseConfig";

export default function Home(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      if (err instanceof FirebaseError) setError(err.message);
      else if (err instanceof Error) setError(err.message);
      else setError("Erreur inconnue lors de la connexion.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 text-white overflow-hidden">
      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-30"
        style={{
          // mets ton image dans /public
          backgroundImage: "url('/cs-background.png')",
        }}
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

      {/* panneau */}
      <div className="relative z-10 w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-xl rounded-xl border border-slate-700/40 shadow-xl">
        <div className="text-center mb-8">
          <img
            src="/logo-cs-home.svg" // ✅ ton image dans /public/cs2-logo.png
            alt="Logo CS2-UP"
            className="w-20 h-20 mx-auto mb-3 opacity-90"
          />
          <h1 className="text-4xl font-extrabold tracking-wide text-orange-500">
            CS2-UP
          </h1>
          <p className="text-slate-300 mt-2 text-sm uppercase tracking-wider">
            Comprendre pour mieux step-up
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-slate-300">Email</label>
            <input
              type="email"
              placeholder="Votre mail"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
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

        <div className="flex flex-col items-center mt-5 space-y-2">
          <Link
            to="/creation"
            className="text-sm text-orange-400 hover:text-orange-300 transition font-semibold"
          >
            Créer son compte
          </Link>

          <button
            type="button"
            onClick={() => alert("Fonctionnalité à venir")}
            className="text-sm text-slate-400 hover:text-slate-200 transition font-semibold"
          >
            Mot de passe oublié ?
          </button>
        </div>
      </div>
    </div>
  );
}
