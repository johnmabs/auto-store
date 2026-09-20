import { logout } from "@/features/auth/logout.actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="rounded-lg border px-4 py-2 text-sm">
        Se déconnecter
      </button>
    </form>
  );
}
