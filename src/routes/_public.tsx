import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNavbar />
      <Outlet />
      <Footer />
    </div>
  );
}
