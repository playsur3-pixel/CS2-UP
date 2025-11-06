import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Creation from "@/pages/Creation";
import Dashboard from "@/pages/Dashboard";
import { useAuth } from "@/contexts/useAuth"; // si tu as séparé le hook
// ou: import { useAuth } from "@/contexts/AuthContext";

export default function App() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );

  return (
    <Routes>
      {/* page de connexion */}
      <Route
        path="/"
        element={!user ? <Home /> : <Navigate to="/dashboard" />}
      />

      {/* inscription */}
      <Route
        path="/creation"
        element={!user ? <Creation /> : <Navigate to="/dashboard" />}
      />

      {/* dashboard protégé */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/" />}
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
