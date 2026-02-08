'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData) {
  const supabase = await createClient()

  const email = formData.get('email')
  const password = formData.get('password')

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Error hole message pathiye login-ei redirect hobe
    return redirect('/login?error=' + encodeURIComponent(error.message))
  }

  // Success hole dashboard-e pathabe
  redirect('/dashboard')
}


export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log('Error logging out:', error.message)
  }
  redirect('/login')
}