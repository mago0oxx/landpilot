import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getPostHogServer } from "@/lib/posthogServer";
import { prisma } from "@/lib/prisma";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email;
      const password = credentials?.password;
      if (typeof email !== "string" || typeof password !== "string") return null;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user?.passwordHash) return null;

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return null;

      return { id: user.id, name: user.name, email: user.email, image: user.image };
    },
  }),
];

// Google sign-in is opt-in — omit it entirely rather than erroring at startup
// when the investor hasn't created OAuth credentials yet (see .env.example).
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // Credentials sign-in is only supported with JWT sessions — database sessions
  // rely on an OAuth token exchange that the Credentials provider doesn't have.
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers,
  events: {
    // Only fires for adapter-created users — i.e. OAuth sign-up (Google). Credentials
    // sign-up goes through /api/register directly and captures "user_signed_up" there.
    async createUser({ user }) {
      if (user.id) {
        await getPostHogServer()?.captureImmediate({ distinctId: user.id, event: "user_signed_up", properties: { method: "google" } });
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (!session.user) return session;
      session.user.id = token.id as string;

      // Re-read name/email/image from the DB on every session check rather than trusting
      // the JWT's copy from sign-in time — otherwise a profile edit (see ProfileForm) never
      // shows up in the Sidebar/Header until the user signs out and back in.
      const fresh = await prisma.user.findUnique({
        where: { id: token.id as string },
        select: { name: true, email: true, image: true },
      });
      if (fresh) {
        session.user.name = fresh.name;
        session.user.email = fresh.email ?? session.user.email;
        session.user.image = fresh.image;
      }
      return session;
    },
  },
});
