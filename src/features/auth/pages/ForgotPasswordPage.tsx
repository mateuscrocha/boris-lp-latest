import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabaseConfigured } from "@/lib/supabaseClient";

export function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl items-center justify-center px-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Recuperar senha</CardTitle>
            <CardDescription>Enviamos um link para você definir uma nova senha.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!supabaseConfigured ? (
              <div className="rounded-md border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
                Configure o Supabase no arquivo <span className="text-foreground">.env</span> para habilitar a recuperação.
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

            {error ? <div className="text-sm text-destructive">{error}</div> : null}
            {success ? <div className="text-sm text-primary">{success}</div> : null}
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-3">
            <Button
              disabled={!supabaseConfigured || submitting || !email}
              onClick={async () => {
                setError(null);
                setSuccess(null);
                setSubmitting(true);
                try {
                  await requestPasswordReset({ email });
                  setSuccess("Link enviado. Confira seu e-mail (e a caixa de spam).");
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Falha ao enviar link de recuperação.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {submitting ? "Enviando…" : "Enviar link"}
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">Voltar para o login</Link>
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
