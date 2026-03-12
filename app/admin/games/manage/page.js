"use client";

import { useState } from "react";
// Icons er jonno (npm install lucide-react jodi na thake)
import { LayoutGrid, UploadCloud, ChevronRight } from "lucide-react"; 

import UpdateGame from '@/components/admin/game/UpdateGame';
import UploadGame from '@/components/admin/game/UploadGame';
import Sidebar from '@/components/admin/Sidebar';
import GameType from "@/components/admin/game/GameType";

export default function Page({ game, isUpdate, movie }) {
    const [activeTab, setActiveTab] = useState("upload");

    return (
        <div className="bg-gray-50 min-h-screen flex">
            <Sidebar />

            <div className="flex-1 ml-64 p-10">
                {/* Header Section */}
                <header className="mb-10">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <span>Admin</span>
                        <ChevronRight size={14} />
                        <span>Gaming Center</span>
                        <ChevronRight size={14} />
                        <span className="text-blue-600 font-medium">
                            {isUpdate ? "Update" : "Upload"}
                        </span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        Gaming Management
                    </h2>
                </header>

                {/* Modern Tabs Design */}
                <div className="flex p-1 bg-gray-200/50 rounded-xl w-fit mb-8">
                    <button
                        onClick={() => setActiveTab("type")}
                        className={`flex cursor-pointer items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 
                        ${activeTab === "type"
                                ? "bg-white text-blue-600 shadow-md"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <LayoutGrid size={18} />
                        Game Type
                    </button>

                    <button
                        onClick={() => setActiveTab("upload")}
                        className={`flex cursor-pointer items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 
                        ${activeTab === "upload"
                                ? "bg-white text-blue-600 shadow-md"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <UploadCloud size={18} />
                        {isUpdate ? "Update Details" : "Upload Content"}
                    </button>
                </div>

                {/* Tab Content Area */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        {activeTab === "type" && <GameType/>}

                        {activeTab === "upload" && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                {isUpdate ? (
                                    <UpdateGame game={game} /> 
                                ) : (
                                    <UploadGame />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}