import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { LogoutButton } from "@/features/auth/logout-button";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <Link href="/admin" className="text-lg font-semibold">
              Auto Store
            </Link>

            <p className="text-xs text-neutral-500">Administration</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-neutral-600 sm:block">
              {session.user.name ?? session.user.email}
            </span>

            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl md:grid-cols-[220px_1fr]">
        <aside className="border-r bg-white p-6">
          <nav className="space-y-1">
            <Link
              href="/admin"
              className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100"
            >
              Tableau de bord
            </Link>

            <Link
              href="/admin/vehicles"
              className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100"
            >
              Véhicules
            </Link>

            <Link
              href="/admin/requests"
              className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100"
            >
              Demandes clients
            </Link>
          </nav>
        </aside>

        <main className="min-w-0 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
