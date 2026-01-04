import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

import { supabase, supabaseConfigured } from "@/lib/supabaseClient";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn: (params: { email: string; password: string }) => Promise<void>;
  signUp: (params: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(() => supabaseConfigured);

  useEffect(() => {
    if (!supabaseConfigured || !supabase) return;

    let alive = true;

    supabase.auth
      .getSession()
      .then(({ data }: { data: { session: Session | null } }) => {
        if (!alive) return;
        setSession(data.session ?? null);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, next: Session | null) => {
        setSession(next);
      }
    );

    return () => {
      alive = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async ({ email, password }: { email: string; password: string }) => {
    if (!supabaseConfigured || !supabase) {
      throw new Error(
        "Supabase não está configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env."
      );
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signUp = useCallback(async ({ email, password }: { email: string; password: string }) => {
    if (!supabaseConfigured || !supabase) {
      throw new Error(
        "Supabase não está configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env."
      );
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    if (!supabaseConfigured || !supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [loading, session?.user, signIn, signOut, signUp]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
