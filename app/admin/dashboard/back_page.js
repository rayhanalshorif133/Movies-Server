import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { logout } from '../../login/actions' // Action-ti import korun

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // User-er data niye asha
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          
          <form action={logout}>
            <button 
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Logout
            </button>
          </form>
        </div>

        <div className="mt-6">
          <p className="text-gray-600">Welcome back,</p>
          <h2 className="text-xl font-semibold text-blue-600">
            {user?.email}
          </h2>
        </div>

        <div className="mt-8 p-10 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400">
          Apnar dashboard-er content ekhane thakbe...
        </div>
      </div>
    </div>
  )
}