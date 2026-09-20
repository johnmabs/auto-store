import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request }) {
      const isAuthenticated = Boolean(auth?.user);

      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

      if (isAdminRoute) {
        return isAuthenticated;
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
