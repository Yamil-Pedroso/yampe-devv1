import { createContext, useEffect, useState } from "react";

export interface AdminAuthContextType {
  authorized: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}
const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);

  // Load initial state
  useEffect(() => {
    const token = localStorage.getItem("admin_auth");
    if (token === "1") setAuthorized(true);
  }, []);

  function login(password: string) {
    if (password === "Carfolear23") {
      localStorage.setItem("admin_auth", "1");
      setAuthorized(true);
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem("admin_auth");
    setAuthorized(false);
  }

  return (
    <AdminAuthContext.Provider value={{ authorized, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export { AdminAuthContext };
