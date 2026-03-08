'use client';

import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Loader2, Inbox, Eye } from 'lucide-react';
import { IoReload } from "react-icons/io5";
import axios from "axios";
import ShowMovies from './ShowMovies';
import Badge from '@/components/common/Badge';

export default function GmailList() {

  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [autoUpdating, setAutoUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [openRow, setOpenRow] = useState(null); // 👈 fix

  const ITEMS_PER_PAGE = 10;

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/gmails?page=${currentPage}&limit=${ITEMS_PER_PAGE}&search=${searchTerm}`
      );

      const result = await response.json();

      if (response.ok) {
        setEmails(result.data || []);
        setTotalCount(result.total || 0);
        setTotalPages(result.totalPages || 0);
      }

    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurrentPage(0);
      getData();
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    getData();
  }, [currentPage]);

  const autoGmailUpdateBtn = async () => {
    setAutoUpdating(true);
    try {
      await axios.get('/api/gmails/autoupdate');
      await getData();
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setAutoUpdating(false);
    }
  }

  const toggleMovies = (id) => {
    if (openRow === id) {
      setOpenRow(null);
    } else {
      setOpenRow(id);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b flex justify-between items-center gap-4">

        <h3 className="text-lg font-bold text-gray-800">
          Gmail Database
        </h3>

        <button
          onClick={autoGmailUpdateBtn}
          disabled={autoUpdating}
          className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          {autoUpdating ?
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Updating...
            </>
            :
            <>
              <IoReload size={18} />
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

      {/* Table */}
      <table className="w-full text-left">

        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-6 py-4">Gmail</th>
            <th className="px-6 py-4">Movies</th>
            <th className="px-6 py-4">Used Space</th>
            <th className="px-6 py-4">Last Login</th>
          </tr>
        </thead>

        <tbody>

          {loading ? (

            <tr>
              <td colSpan="4" className="py-20 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-green-600" />
              </td>
            </tr>

          ) : emails.map((item) => {

            const movies = item.movies ? item.movies.split(',') : [];

            return (
              <React.Fragment key={item.id}>

                <tr className="hover:bg-gray-50">

                  <td className="px-6 py-4 text-sm font-medium">
                    {item.name}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleMovies(item.id)}
                      className="flex cursor-pointer items-center gap-1 bg-gray-100 px-2 py-1 rounded"
                    >
                      <Eye size={12} />
                      <span className="text-xs">{movies.length}</span>
                    </button>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <Badge title={`${item.used_space} GB`} />
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    <Badge title={new Date(item.last_login).toLocaleDateString()}/>
                  </td>

                </tr>

                {openRow === item.id && (
                  <ShowMovies items={item} className="w-full mx-auto flex justify-center"/>
                )}

              </React.Fragment>
            )

          })}

        </tbody>

      </table>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
        <span className="text-xs text-gray-500">
          Total: <span className="font-bold">{totalCount}</span> Gmails
        </span>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0 || loading}
            className="p-1.5 border rounded hover:bg-white disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-semibold">
            {currentPage + 1} / {totalPages || 1}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1 || loading}
            className="p-1.5 border rounded hover:bg-white disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}