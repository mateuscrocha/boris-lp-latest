import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabaseConfigured } from "@/lib/supabaseClient";

export function RegisterPage() {
  const { user, loading, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!loading && user) return <Navigate to="/app" replace />;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl items-center justify-center px-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Criar conta</CardTitle>
            <CardDescription>Registre-se para acessar o painel protegido.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!supabaseConfigured ? (
              <div className="rounded-md border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
                Configure o Supabase no arquivo <span className="text-foreground">.env</span> para habilitar o cadastro.
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo recomendado: 8 caracteres"
              />
            </div>
            {error ? <div className="text-sm text-destructive">{error}</div> : null}
            {success ? <div className="text-sm text-primary">{success}</div> : null}
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-3">
            <Button
              disabled={!supabaseConfigured || submitting || !email || !password}
              onClick={async () => {
                setError(null);
                setSuccess(null);
                setSubmitting(true);
                try {
                  await signUp({ email, password });
                  setSuccess("Conta criada. Se necessário, confirme o e-mail e faça login.");
                  navigate("/login", { replace: true });
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Falha ao cadastrar.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {submitting ? "Criando…" : "Criar conta"}
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">Já tenho conta</Link>
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
