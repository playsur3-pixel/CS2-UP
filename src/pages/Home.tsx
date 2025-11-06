export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-950 via-slate-900 to-amber-900 flex items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-200/60 mb-3">
          CS2 Coaching by playSURE
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Progresse sur CS2 avec un vrai suivi de performance.
        </h1>
        <p className="text-slate-200 mb-8">
          Suivi de stats, VOD review, entrainements personnalisés. Connecte-toi
          pour accéder à ton dashboard.
        </p>
        <a
          href="/login"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Accéder à la plateforme
        </a>
      </div>
    </div>
  );
}
