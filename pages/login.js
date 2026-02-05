'use client'

import { useState } from 'react'
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState('rayhan@gmail.com')
    const [password, setPassword] = useState('rayhan@gmail.com')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false) // Loading state
    const router = useRouter();


    const handleLogin = async () => {
        setLoading(true)
        setError('') // Reset error

        try {
            const res = await fetch('/api/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            console.clear();
            console.log(data);

            return false;

            if (data.status === true) {
                // Hard refresh help kore middleware session properly catch korte
                router.push('/admin/dashboard')
                router.refresh();
            } else {
                setError(data.error || 'Login failed')
            }
        } catch (err) {
            setError('Something went wrong!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-4 p-10 max-w-md mx-auto">
            <h2 className="text-2xl font-bold">Admin Login</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                    {error}
                </div>
            )}

            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded"
                value={email}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded"
                value={password}
            />
            <button
                onClick={handleLogin}
                disabled={loading}
                className={`p-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {loading ? 'Logging in...' : 'Log In'}
            </button>
        </div>
    )
}