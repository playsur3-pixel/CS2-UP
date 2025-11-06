import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "@/utils/firebaseConfig";

export default function Creation(): JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [matchCode, setMatchCode] = useState("");
  const [matchHistory, setMatchHistory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) setError(err.message);
      else if (err instanceof Error) setError(err.message);
      else setError("Erreur inconnue lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cs2-bg text-white">
      <div className="cs2-panel relative z-10 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-wide text-orange-500">
            CS2-UP
          </h1>
          <p className="text-slate-300 mt-2 text-sm uppercase tracking-wider">
            Crée ton compte pour commencer
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-slate-300">
              Email <span className="text-orange-400">*</span>
            </label>
            <input
              type="email"
              placeholder="Votre mail"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">
              Pseudo <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Votre pseudo"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">
              Mot de passe <span className="text-orange-400">*</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">
              CS2 Match Share Code
            </label>
            <input
              type="text"
              placeholder="Ex : CSGO-XXXX-XXXX-XXXX-XXXX-XXXX"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
              value={matchCode}
              onChange={(e) => setMatchCode(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">
              CS2 Match History
            </label>
            <input
              type="text"
              placeholder="Lien vers ton historique ou profil CS2"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
              value={matchHistory}
              onChange={(e) => setMatchHistory(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-950/40 rounded-md p-2">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Création..." : "Valider"}
            </button>

            <Link
              to="/"
              className="flex-1 text-center bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
