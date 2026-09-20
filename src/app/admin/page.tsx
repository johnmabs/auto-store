import { auth } from "@/auth";
import { LogoutButton } from "@/features/auth/logout-button";

export default async function AdminPage() {
  const session = await auth();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">Administration</h1>

          <p className="mt-2 text-neutral-600">
            Bienvenue {session?.user?.name ?? session?.user?.email}.
          </p>
        </div>

        <div>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
