/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAdminAuth } from "../../lib/hooks/useAdminAuth";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { authorized } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authorized) {
      navigate({ to: "/admin/login" } as any);
    }
  }, [authorized, navigate]);

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
