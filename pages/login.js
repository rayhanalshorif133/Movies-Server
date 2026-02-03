'use client'

import { useState } from 'react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        const res = await fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), // JSON-e convert korun
        });

        const data = await res.json();

       

        if (data.status) {
            console.log(data);
        } else {
             console.log('error',data);
        }
    }

    return (
        <div className="flex flex-col gap-4 p-10">
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2"
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2"
            />
            <button onClick={handleLogin} className="bg-blue-500 text-white p-2">
                Log In
            </button>
        </div>
    )
}