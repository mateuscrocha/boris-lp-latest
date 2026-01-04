import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-dvh bg-background text-foreground">
        <div className="mx-auto flex min-h-dvh w-full max-w-6xl items-center justify-center px-6">
          <div className="text-sm text-muted-foreground">Carregando…</div>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return <>{children}</>;
}
