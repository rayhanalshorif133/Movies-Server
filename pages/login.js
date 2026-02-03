'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClient()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Login Success!')
      // Redirect korte paren: window.location.href = '/dashboard'
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