import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import credentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";
import { debug } from "util";
//import prisma from "@/app/lib/prisma";

const prisma = new PrismaClient();

export const authOptions = {
  //adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    credentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      credentials: {
        //username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      type: "credentials",
      async authorize(credentials) {
        // check to see if email and password is valid
        if (!credentials.email || !credentials.password) {
          return null;
        }

        // check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        // check to see if password match
        const passwordMath = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordMath) {
          return null;
        }
        return user;

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ...add more providers here
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        return true;
      }
      return false;
    },
    async jwt({ token, user, account, session }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.role = 'admin';
      }
      //console.log(token);
      //console.log("session");
      //console.log(session);
      return session;
    },
  },

  Session: {
    strategy: "jwt",
    //maxAge: 3000,
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },

  /*   cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        domain: ".localhost",
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false
      }
    }
  },
   */

  jwt: {
    maxAge: 60 * 60 * 24 * 30,
    //jet incoding and decoding configrations
  },
  //callbacks: {
  // signIn, session, callbacks
  //},
  secret: process.env.NEXTAUTH_SECRET,
  //debug: process.env.NODE_ENV === "development",
  pages: {
    signIn:'/auth/signin'
  },
};
