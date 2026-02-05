import { NextResponse } from 'next/server'

export function middleware(request) {
    const token = request.cookies.get('admin_token')

    // if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }

    return NextResponse.next();
}
