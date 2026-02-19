import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { nanoid } from "nanoid";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

callbacks: {
  async signIn(params: any) {
    const { user, account } = params;

    if (account?.provider === "credentials") return true;

    const existingUser = await prisma.user.findFirst({
      where: { email: user.email! },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: nanoid(),
          email: user.email!,
          role: "user",
          password: null,
        },
      });
    }

    return true;
  },

  async jwt(params: any) {
    const { token, user } = params;

    if (user) {
      token.role = user.role;
      token.id = user.id;
      token.iat = Math.floor(Date.now() / 1000);
    }

    const now = Math.floor(Date.now() / 1000);
    const tokenAge = now - (token.iat as number);
    const maxAge = 15 * 60;

    if (tokenAge > maxAge) {
      return {};
    }

    return token;
  },

  async session(params: any) {
    const { session, token } = params;

    if (token && session.user) {
      session.user.role = token.role;
      session.user.id = token.id;
    }

    return session;
  },
},


  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt" as const,
    maxAge: 15 * 60,
    updateAge: 5 * 60,
  },

  jwt: {
    maxAge: 15 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
