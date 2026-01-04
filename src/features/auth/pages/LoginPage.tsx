import { useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabaseConfigured } from "@/lib/supabaseClient";

export function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = useMemo(() => {
    const state = location.state as { from?: string } | null;
    return state?.from ?? "/app";
  }, [location.state]);

  if (!loading && user) return <Navigate to={from} replace />;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl items-center justify-center px-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>Acesse o painel protegido do template.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!supabaseConfigured ? (
              <div className="rounded-md border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
                Configure o Supabase no arquivo <span className="text-foreground">.env</span> para habilitar o login.
              </div>
            ) : null}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error ? <div className="text-sm text-destructive">{error}</div> : null}
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-3">
            <Button
              disabled={!supabaseConfigured || submitting || !email || !password}
              onClick={async () => {
                setError(null);
                setSubmitting(true);
                try {
                  await signIn({ email, password });
                  navigate(from, { replace: true });
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Falha ao entrar.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {submitting ? "Entrando…" : "Entrar"}
            </Button>
            <Button variant="outline" asChild>
              <Link to="/register">Criar conta</Link>
            </Button>
            <div className="text-center text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">
                Voltar para a home
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
