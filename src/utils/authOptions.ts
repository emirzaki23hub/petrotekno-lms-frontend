import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   id: "credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //     async authorize(credentials) {
    //       if (!credentials) return null;

    //       try {
    //         const user = await restAuth.postLogin({
    //           email: credentials.email,
    //           password: credentials.password,
    //         });

    //         if (user) return { user: user.token } as User;
    //       } catch (error) {}

    //       return null;
    //     },
    //   async authorize(credentials) {
    //     if (!credentials) return null;

    //     try {
    //       const response = await restAuth.postLogin({
    //         email: credentials.email,
    //         password: credentials.password,
    //       });

    //       const userToken = response?.data?.token;

    //       if (userToken) {
    //         return { user: { token: userToken } } as unknown as User;
    //       }
    //     } catch (error) {
    //       console.error("Error occurred during authentication:", error);
    //     }

    //     return null;
    //   },
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const storedUser = {
          id: "1",
          name: "admin",
          email: "admin@admin.com",
          password: "password",
        };

        if (
          credentials?.email === storedUser.email &&
          credentials?.password === storedUser.password
        ) {
          // Return the user object if credentials are valid
          return storedUser;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { user: undefined, ...token, ...user };
    },
    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
};
