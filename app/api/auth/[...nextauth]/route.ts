import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../prisma/prisma";
import bcrypt from "bcrypt";

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
            return memberWithoutPassword;
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
  debug: true,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }