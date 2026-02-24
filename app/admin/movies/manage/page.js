import UpdateMovie from '@/components/admin/movie/UpdateMovie'
import UploadMovie from '@/components/admin/movie/UploadMovie'
import Sidebar from '@/components/admin/Sidebar'
import { createClient } from '@/utils/supabase/server';

export async function generateMetadata() {
    return {
        title: "Manage Movie | Admin Panel",
    };
}

export default async function page({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const isUpdate = !!resolvedSearchParams.id;
    let movie = null;

    if (isUpdate) {
        const supabase = await createClient();
        const { data } = await supabase
            .from('movies')
            .select('*')
            .eq('id', resolvedSearchParams.id)
            .single();
        movie = data || null;
    }



    return (
        <div className="bg-gray-50 flex">

            <Sidebar />

            <div className="flex-1 ml-64 p-8">

                <header className="flex justify-between items-center mb-8">
                    <div>
                        <nav className="text-xs text-gray-500 mb-1">Home / Movies / Upload</nav>
                        <h2 className="text-2xl font-bold text-gray-800">Media Center</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button>
                        <div className="flex items-center gap-2 border-l pl-4">
                            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-xs">M</div>
                            <span className="text-sm font-medium">Movie</span>
                        </div>
                    </div>
                </header>
                {
                    isUpdate ? <UpdateMovie movie={movie} /> : <UploadMovie />
                }
            </div>


        </div>
    )
}
