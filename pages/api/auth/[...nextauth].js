// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,  // Asegúrate de definir esta variable en tu entorno

  // Configura los callbacks para personalizar la sesión
  callbacks: {
    async session({ session, token }) {
      // Incluye el userId en la sesión a partir del token
      session.user.id = token.sub; // token.sub contiene el userId después del login
      return session; // Retorna la sesión con el userId agregado
    },
  },
});
