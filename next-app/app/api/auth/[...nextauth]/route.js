import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

let baseUrl = process.env.NEXTAUTH_URL;
if (baseUrl) {
  try {
    new URL(baseUrl);
  } catch {
    console.warn(
      '[Auth] NEXTAUTH_URL is invalid, defaulting to http://localhost:3000',
    );
    baseUrl = 'http://localhost:3000';
  }
} else {
  baseUrl = 'http://localhost:3000';
}
process.env.NEXTAUTH_URL = baseUrl;

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
