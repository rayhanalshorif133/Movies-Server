"use client"
import React, { useState } from 'react'
import { MdClear } from "react-icons/md";


export default function UploadMovie() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    movieType: 'Movie', // Default type
    movieUrl: '',
    source: '',
    size: '',
    isSeries: false,
  })

  const [videoFile, setVideoFile] = useState(null)
  const [posterImage, setPosterImage] = useState(null)

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      console.log(text);
      setFormData({ ...formData, movieUrl: text });
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };
  const clearURL = async () => {
    setFormData({ ...formData, movieUrl: '' });
  };

  const handleUpload = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log({ ...formData, videoFile, posterImage })
    setTimeout(() => setLoading(false), 2000) // Demo loading
  }

  return (
    <div className="max-w-full mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 my-10">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Upload New Movie</h3>

      <form onSubmit={handleUpload} className="space-y-6">

        <div className="grid grid-cols-1">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex">
              Source <button onClick={clearURL} className='h-5 w-5 mx-2 cursor-pointer hover:scale-105 rounded-full bg-gray-300 hover:bg-red-500 hover:text-white flex items-center justify-center'><MdClear size={14} className='flex items-center justify-center'/></button>
            </label>
            <input
              type="url"
              placeholder="https://example.com/movie"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              value={formData.movieUrl}
              onClick={handlePaste}
              onChange={(e) => setFormData({ ...formData, movieUrl: e.target.value })}
            />
          </div>
        </div>

        {/* Auto-Fill Section Box */}
        <div className="bg-gray-200 border-2 border-dashed border-gray-200 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Auto Details</span>
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Movie Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Movie Title</label>
              <input
                type="text"
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none transition bg-white"
                placeholder="e.g. Interstellar"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Size (MB) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size (MB)</label>
              <input
                type="number"
                placeholder="e.g. 700"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none bg-white"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              />
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
              <input
                type="text"
                placeholder="e.g. Netflix, Torrent"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none bg-white"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              />
            </div>
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Movie Type</label>
            <select
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              value={formData.movieType}
              onChange={(e) => setFormData({ ...formData, movieType: e.target.value })}
            >
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Horror">Horror</option>
            </select>
          </div>
          <div className="flex items-center mt-8">
            <input
              type="checkbox"
              id="isSeries"
              className="w-5 h-5 accent-yellow-500"
              checked={formData.isSeries}
              onChange={(e) => setFormData({ ...formData, isSeries: e.target.checked })}
            />
            <label htmlFor="isSeries" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">Movie Series?</label>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-yellow-400 transition cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setPosterImage(e.target.files[0])}
            />
            <p className="text-sm font-medium text-gray-700">
              {posterImage ? posterImage.name : "Upload Poster (JPG/PNG)"}
            </p>
          </div>
        </div>

        <button
          disabled={loading}
          className={`w-full py-4 rounded-lg font-bold text-white transition ${loading ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600 shadow-lg shadow-yellow-100'
            }`}
        >
          {loading ? 'Uploading Assets...' : 'Publish Movie'}
        </button>
      </form>
    </div>
  )
}