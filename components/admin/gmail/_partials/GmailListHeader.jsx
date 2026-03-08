import React from 'react'
import { Search ,Loader2 } from 'lucide-react';
import { IoReload } from "react-icons/io5";

export default function GmailListHeader(props) {
    const {setSearchTerm,searchTerm,autoGmailUpdateBtn,autoUpdating,color} = props;
    return (
        <div className="p-6 border-b flex justify-between items-center gap-4">

            <h3 className="text-lg font-bold text-gray-800">
                Gmail Database
            </h3>

            <button
                onClick={autoGmailUpdateBtn}
                disabled={autoUpdating}
                style={color}
                className="inline-flex items-center px-3 py-2 rounded-full text-xs font-bold border transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm"
            >
                {autoUpdating ?
                    <>
                        <Loader2 className="w-4 h-4 animate-spin mx-2" />
                        Updating...
                    </>
                    :
                    <>
                        <IoReload className="w-4 h-4 mx-2" />
                        Auto Update
                    </>
                }
            </button>

            <div className="relative w-72">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    placeholder="Search email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

        </div>
    )
}
