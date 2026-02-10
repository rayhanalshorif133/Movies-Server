import Header from '@/components/admin/Header'
import Sidebar from '@/components/admin/Sidebar'
import React from 'react'
import { createClient } from '@/utils/supabase/server';

export default async function Page() {
    const supabase = await createClient();

    // Database theke real-time count ana hochhe
    const { count: movieCount } = await supabase
        .from('movies')
        .select('*', { count: 'exact', head: true });

    const { count: gameCount } = await supabase
        .from('games')
        .select('*', { count: 'exact', head: true });

    const { count: gmailCount } = await supabase
        .from('gmail_inventory')
        .select('*', { count: 'exact', head: true });

    const { count: usedGmailCount } = await supabase
        .from('gmails')
        .select('*', { count: 'exact', head: true });


    const { count: availableGmailCount } = await supabase
        .from('gmail_inventory')
        .select('*', { count: 'exact', head: true })
        .eq('is_used', false); 


    return (
        <div className="bg-gray-50 flex">
            <Sidebar />

            <div className="flex-1 ml-64 p-8">
                <Header title={'Dashboard'} />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {/* Total Movies */}
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-teal-500">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-teal-500">Total Movies</span>
                        </div>
                        <div className="text-2xl font-bold mt-2 text-teal-800">
                            {movieCount || 0}
                        </div>
                    </div>

                    {/* Games Assets */}
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-yellow-400">
                        <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                            <span>Games Assets</span>
                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                            </svg>
                        </div>
                        <div className="text-2xl font-bold mt-2 text-gray-800">
                            {gameCount || 0}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-yellow-400">
                        <div className="text-sm font-medium text-gray-500">Total Gmails</div>
                        <div className="text-2xl font-bold mt-2 text-yellow-600">
                            {gmailCount || 0}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-yellow-400">
                        <div className="text-sm font-medium text-gray-500">Used Gmails</div>
                        <div className="text-2xl font-bold mt-2 text-yellow-600">
                            {usedGmailCount || 0}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-yellow-400">
                        <div className="text-sm font-medium text-gray-500">Avaiable Gmails</div>
                        <div className="text-2xl font-bold mt-2 text-green-600">
                            {availableGmailCount || 0}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}