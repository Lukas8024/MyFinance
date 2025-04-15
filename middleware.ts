import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
	function middleware(req: NextRequestWithAuth) {
		if (req.nextUrl.pathname === '/' && !req.nextauth.token) {
			return NextResponse.redirect(new URL('/login', req.url))
		}
		return NextResponse.next()
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
)

export const config = {
	matcher: ['/'],
}
