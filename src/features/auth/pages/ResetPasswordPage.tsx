import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabaseConfigured } from "@/lib/supabaseClient";

export function ResetPasswordPage() {
  const { user, loading, updatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!loading && !user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl items-center justify-center px-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Definir nova senha</CardTitle>
            <CardDescription>Crie uma senha nova para a sua conta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!supabaseConfigured ? (
              <div className="rounded-md border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
                Configure o Supabase no arquivo <span className="text-foreground">.env</span> para habilitar a troca de senha.
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="password">Nova senha</Label>
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
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-3">
            <Button
              disabled={!supabaseConfigured || submitting || password.length < 8}
              onClick={async () => {
                setError(null);
                setSubmitting(true);
                try {
                  await updatePassword({ password });
                  navigate("/login", { replace: true });
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Falha ao atualizar senha.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {submitting ? "Salvando…" : "Salvar nova senha"}
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">Voltar para o login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
