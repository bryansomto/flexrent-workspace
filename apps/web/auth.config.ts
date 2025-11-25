import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnAuth = nextUrl.pathname.startsWith('/auth');

      // 1. Admin Route Logic
      if (isOnAdmin) {
        if (isLoggedIn && userRole === 'ADMIN') return true;
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // 2. Dashboard Logic
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } 

      // 3. Auth Logic (Redirect logged-in users away from login page)
      else if (isLoggedIn && isOnAuth) {
        return Response.redirect(new URL('/dashboard/overview', nextUrl));
      }
      
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;