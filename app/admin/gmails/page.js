import Header from '@/components/admin/Header'
import Sidebar from '@/components/admin/Sidebar'
import React from 'react'
import { createClient } from '@/utils/supabase/server';


export default async function page() {
    const supabase = await createClient();

    const [
        { count: totalGmail },
        { count: usedGmailCount },
        { count: unUsedGmailCount },
    ] = await Promise.all([
        supabase.from('gmail_inventory').select('*', { count: 'exact', head: true }),
        supabase.from('gmails').select('*', { count: 'exact', head: true }),
        supabase.from('gmail_inventory').select('*', { count: 'exact', head: true }).eq('is_used', false)
    ]);


    return (
        <div className="bg-gray-50 flex">

            <Sidebar />

            <div className="flex-1 ml-64 p-8">

                <Header title={'Gmails'} />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-green-700">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 font-semibold">Total Gmails</span>
                            <span className="text-green-600 text-sm font-semibold">
                                {totalGmail * 15} GB
                            </span>
                        </div>
                        <div className="text-2xl font-bold mt-2 text-gray-800">
                            {totalGmail}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-teal-400">
                        <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                            <span className='font-semibold'>Used Gmails</span>
                            <span className="text-green-600 text-sm font-semibold">
                                {usedGmailCount * 15} GB
                            </span>
                        </div>
                        <div className="text-2xl font-bold mt-2 text-gray-800">{usedGmailCount}</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-yellow-400">
                        <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                            <span className="font-semibold">Unused Gmails</span>
                            <span className="text-green-600 text-sm font-semibold">
                                {unUsedGmailCount * 15} GB
                            </span>
                        </div>
                        <div className="text-2xl font-bold mt-2 text-yellow-600">{unUsedGmailCount}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}
