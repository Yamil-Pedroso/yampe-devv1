import { useContext } from "react";
import { AdminAuthContext } from "@/context/AdminAuthContext";

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext); // ✅ now it's used
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
}
