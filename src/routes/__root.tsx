import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <p className="mt-4 text-muted-foreground">This page drifted off the map.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something gentle went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again — we're here.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lunara — Your Female Health OS" },
      { name: "description", content: "AI-powered cycle, hormone and emotional wellbeing companion." },
      { property: "og:title", content: "Lunara — Your Female Health OS" },
      { name: "twitter:title", content: "Lunara — Your Female Health OS" },
      { property: "og:description", content: "AI-powered cycle, hormone and emotional wellbeing companion." },
      { name: "twitter:description", content: "AI-powered cycle, hormone and emotional wellbeing companion." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5b308b45-7800-4e76-bebb-62dfdafcb5b5/id-preview-6016607d--097e3b99-ccd9-4360-8684-f1546b0d914e.lovable.app-1779898288965.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5b308b45-7800-4e76-bebb-62dfdafcb5b5/id-preview-6016607d--097e3b99-ccd9-4360-8684-f1546b0d914e.lovable.app-1779898288965.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AuthListener() {
  const router = useRouter();
  const queryClient = useQueryClient();
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      router.invalidate();
      queryClient.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, [router, queryClient]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthListener />
      <Outlet />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
