import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('Attempting to authenticate:', credentials?.email)

        // For testing purposes, allow login with these credentials
        if (credentials?.email === 'test@test.com' && credentials?.password === 'test123') {
          return {
            id: '1',
            email: credentials.email,
            name: 'Test User'
          }
        }

        throw new Error('Invalid credentials')
      }
    })
  ],
  debug: true, // Enable debug messages
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  }
})

export { handler as GET, handler as POST }