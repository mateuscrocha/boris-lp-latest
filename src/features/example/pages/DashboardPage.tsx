import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Página de exemplo, sem regras de negócio, para começar rápido.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Estrutura</CardTitle>
            <CardDescription>Organização por app, features e componentes.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Comece criando novas features em <span className="text-foreground">src/features</span>.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Auth</CardTitle>
            <CardDescription>Fluxo pronto com Supabase Auth.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Rotas protegidas funcionam com <span className="text-foreground">ProtectedRoute</span>.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrações</CardTitle>
            <CardDescription>Clientes prontos para evoluir rápido.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Supabase e Evolution API já têm clients em <span className="text-foreground">src/lib</span>.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

