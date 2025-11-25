import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from './lib/validations/zodAuth';
import { prisma } from './lib/prisma';
import bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';
 
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.role = user.role as UserRole;
        }
        return token;
    },
    async session({ session, token }) {
        if (session.user && token.role) {
            session.user.role = token.role as UserRole;
        }
        return session;
    },
  },
  providers: [Credentials({
    async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
        

        const user = await prisma.user.findUnique({
            where: {email},
        });

        if (!user) return null;

        if (!user.password) {
            console.log("User has no password set (likely OAuth user)");
            return null;
          }

        const passwordsMatch =  await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
            return {...user, role: user.role};
        }}

        console.log('Invalid credentials');
        return null;
        },
  })],
});