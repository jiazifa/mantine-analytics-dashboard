import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: 'Phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log(`BASE_URL`, BASE_URL);
        return { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' };
        const res = await fetch('你的登录接口URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        const data = await res.json();

        // 如果登录成功并且返回了 token
        if (res.ok && data.token) {
          return { token: data.token };
        } else {
          throw new Error('登录失败');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Initial sign in
      // 用户登录时调用，将 token 添加到 JWT 中
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      // 在每次请求时调用，将 token 添加到会话中
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
