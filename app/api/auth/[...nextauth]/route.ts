import NextAuth, { Session, SessionStrategy, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

console.log("BEFORE authOptions: Is prisma defined?", !!prisma);

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // Providers for OAuth options
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Custom Credentials, login using email and password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      // credentials including the email and password input from Login Form
      async authorize(credentials, req) {

        // To advoid undefinded error
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        //Testing
        if (credentials.email === "test@example.com" && credentials.password === "123123") {
          return {
            id: "1",
            email: "test@example.com",
            username: "Test User",
            name: "Test User"
          };
        }

        try {
          const emailInput = credentials.email.trim();

          console.log("email input: " + emailInput);
          console.log("password input: " + credentials.password);

          // 1. Check if email is existing in database
          const user = await prisma.member.findUnique({ where: { email: emailInput } })

          // 2. If user not found, throw error
          if (!user) {
            console.log("User not found!");
            throw new Error("User not found");
          } else {
            console.log(user);
          }

          // 3. If user found, compare password
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          console.log("Password result: " + isPasswordCorrect);

          // 4. Handle result after verify password
          if (isPasswordCorrect) {
            const { password: _, ...memberWithoutPassword } = user;
            console.log("return from server: ", JSON.stringify(memberWithoutPassword, null, 2));
            return {
              ...memberWithoutPassword,
              name: user.username,
            }
          } else {
            console.log("Email / Password incorrect!");
            throw new Error("Email / Password incorrect!");
          }
        } catch (error) {
          console.log("Error: " + error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "database" as SessionStrategy,
  },
  callbacks: {
    // The jwt callback is generally not critical when using a database strategy
    // unless you have specific reasons to populate a JWT even with database sessions.
    // For now, let's ensure it's safe.
    async jwt({ token, user }: { token: JWT; user: User;}) {
      console.log('[JWT Callback] Token:', JSON.stringify(token, null, 2));
      console.log('[JWT Callback] User:', JSON.stringify(user, null, 2));
      if (user) {
        token.id = user.id;
        // Potentially add other details from user or account to token if needed
      }
      return token;
    },
    async session({ session, token, user }: { session: Session; token: JWT; user: User }) {
      // With database strategy, the `user` object from the database should be available here.
      // The `token` object is more relevant for JWT strategy.
      console.log('[Session Callback] Initial Session:', JSON.stringify(session, null, 2));
      console.log('[Session Callback] Token (if any):', JSON.stringify(token, null, 2));
      console.log('[Session Callback] User (from DB):', JSON.stringify(user, null, 2));

      // The PrismaAdapter should provide the user object from the database directly to this callback.
      // This 'user' parameter in the session callback is the user from your database.
      if (user && session.user) {
        (session.user as any).id = user.id; // Assign the database user's id to session.user.id
        // You can also add other properties from the database 'user' object to 'session.user'
        // For example, if your User model has 'username':
        // (session.user as any).username = user.username;
      } else {
        console.log('[Session Callback] session.user or user parameter is undefined. Current session.user:', session.user, 'DB user:', user);
      }
      console.log('[Session Callback] Modified Session:', JSON.stringify(session, null, 2));
      return session;
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }