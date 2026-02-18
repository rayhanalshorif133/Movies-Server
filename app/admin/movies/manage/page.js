import UpdateMovie from '@/components/admin/movie/UpdateMovie'
import UploadMovie from '@/components/admin/movie/UploadMovie'
import Sidebar from '@/components/admin/Sidebar'
import UploadImage from '@/components/common/UploadImage';

export async function generateMetadata() {
    return {
        title: "Manage Movie | Admin Panel",
    };
}

export default async function page({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const isUpdate = !!resolvedSearchParams.id;



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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500">Total Movies</span>
                            <span className="text-green-500 text-xs">↑ 12%</span>
                        </div>
                        <div className="text-2xl font-bold mt-2 text-gray-800">1,248</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                            <span>Games Assets</span>
                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                        </div>
                        <div className="text-2xl font-bold mt-2 text-gray-800">452</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-yellow-400">
                        <div className="text-sm font-medium text-gray-500">Unread Gmails</div>
                        <div className="text-2xl font-bold mt-2 text-yellow-600">24</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                        <div className="text-sm font-medium text-gray-500">Active Game Sessions</div>
                        <div className="text-2xl font-bold mt-2 text-gray-800">5.2k</div>
                    </div>
                </div>
                {
                    isUpdate ? <UpdateMovie id={resolvedSearchParams.id} /> : <UploadMovie />
                }
                <UploadImage />
            </div>


        </div>
    )
}
