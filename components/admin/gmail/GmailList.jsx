'use client';

import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Loader2, Inbox, CloudCog } from 'lucide-react';
import { IoReload } from "react-icons/io5";

import axios from "axios";

export default function GmailList() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [autoUpdating, setAutoUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const ITEMS_PER_PAGE = 10;

  // Fetching Logic using our API
  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/gmails?page=${currentPage}&limit=${ITEMS_PER_PAGE}&search=${searchTerm}`
      );
      const result = await response.json();

      if (response.ok) {
        console.log(result.data);
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

  // Debounced search effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurrentPage(0); // Reset page to 0 on new search
      getData();
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Page change hole fetch kora
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

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden font-sans">
      {/* Search Header */}
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-lg font-bold text-gray-800">Gmail Database</h3>

        <div className="flex items-center justify-center p-1">
          <button
            onClick={autoGmailUpdateBtn}
            disabled={autoUpdating}
            className="text-white flex space-x-1 bg-linear-to-r from-green-500 via-green-600 to-green-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-2xl cursor-pointer"
          >
            {autoUpdating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <IoReload size={20} />
                <span>Auto Update</span>
              </>
            )}
          </button>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by email address..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold">Gmail</th>
              <th className="px-6 py-4 font-semibold">Movies</th>
              <th className="px-6 py-4 font-semibold">Used Space</th>
              <th className="px-6 py-4 font-semibold">Last Login</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="3" className="py-20 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto" />
                </td>
              </tr>
            ) : emails.length > 0 ? (
              emails.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{item.name}</td>
                  <td className="px-6 py-4">
                    {item.movies.split(',').map((movie, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-md text-[11px] font-medium"
                      >
                        {movie.trim()}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${item.is_used ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                      }`}>
                      {item.is_used ? 'Used' : 'Available'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-20 text-center">
                  <Inbox className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No data found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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