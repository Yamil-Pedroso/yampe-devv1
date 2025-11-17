import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/hooks/useAdminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const ok = login(password);

    if (!ok) {
      setError("Invalid password");
      return;
    }

    navigate({ to: "/admin/notifications" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-6">
      <div className="w-full max-w-sm bg-neutral-900 p-8 rounded-xl shadow-xl border border-neutral-800">
        <h2 className="text-center text-xl font-semibold mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm opacity-80">Password</label>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-400 focus:outline-none"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-stone-900 hover:bg-stone-900 text-white font-medium transition cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
