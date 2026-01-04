import type { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function AppShell({ children }: PropsWithChildren) {
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-semibold tracking-wide">
              Starter Template
            </Link>
            <div className="hidden text-xs text-muted-foreground md:block">{location.pathname}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                void signOut();
              }}
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}

