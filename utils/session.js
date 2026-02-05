import 'server-only'
import { cookies } from 'next/headers'

export async function createSession(name, userId) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const cookieStore = cookies();

    cookieStore.set(name, userId, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });

   return { success: true }
}