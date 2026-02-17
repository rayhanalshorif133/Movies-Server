import Badge from '@/components/common/Badge';
import DBBadge from '@/components/admin/movie/badge/DBBadge';
import React from 'react';
import { HiOutlinePencilAlt, HiOutlineTrash, HiCalendar, HiDatabase } from 'react-icons/hi';
import { MdOutgoingMail } from "react-icons/md";
import TypeBadge from './badge/TypeBadge';


export default function MovieRow({ movie }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <tr className="group border-b border-gray-100 hover:bg-blue-50/30 transition-all duration-200">
            <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                        <img
                            src={movie.poster || 'https://via.placeholder.com/150'}
                            alt={movie.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-gray-800 text-base leading-tight group-hover:text-blue-600 transition-colors">
                        {movie.title}
                    </span>
                    <div>
                        <Badge title={movie.part_name} /> <TypeBadge title={movie.type} />
                    </div>
                </div>
            </td>

            {/* Technical Specs */}
            <td className="px-6 py-4">
                <div className="flex flex-col gap-2">
                    <DBBadge sourceGmailName={movie.movie_source} movieSize={movie.size}/>
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-gray-700">{movie.dubbed_lang}</span>
                </div>
            </td>

            {/* Date Section */}
            <td className="px-6 py-4">
                <div className="flex items-center text-gray-500 text-sm">
                    <HiCalendar className="mr-2 opacity-70" />
                    {formatDate(movie.created_at)}
                </div>
            </td>

            {/* Action Buttons */}
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <button
                        title="Edit Movie"
                        className="p-2 hover:bg-blue-100 text-blue-600 rounded-full transition-all active:scale-90"
                    >
                        <HiOutlinePencilAlt size={20} />
                    </button>
                    <button
                        title="Delete Movie"
                        className="p-2 hover:bg-red-100 text-red-500 rounded-full transition-all active:scale-90"
                    >
                        <HiOutlineTrash size={20} />
                    </button>
                </div>
            </td>
        </tr>
    );
}