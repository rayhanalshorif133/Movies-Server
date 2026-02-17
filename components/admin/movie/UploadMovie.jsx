"use client"
import React, { useState } from 'react'


export default function UploadMovie() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [videoFile, setVideoFile] = useState(null)

  const handleUpload = async (e) => {
    e.preventDefault()
    setLoading(true)

   
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Upload New Movie</h3>
      
      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Movie Title</label>
          <input 
            type="text"
            required
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none transition"
            placeholder="e.g. Interstellar"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            rows="4"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none transition"
            placeholder="Describe the movie..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>

        <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center hover:border-yellow-400 transition cursor-pointer relative">
          <input 
            type="file" 
            accept="video/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
          <div className="text-gray-500">
            <p className="font-medium text-gray-700">
              {videoFile ? videoFile.name : "Click to upload video file"}
            </p>
            <p className="text-xs mt-1">MP4, MKV or MOV (Max 500MB)</p>
          </div>
        </div>

        <button 
          disabled={loading}
          className={`w-full py-4 rounded-lg font-bold text-white transition ${
            loading ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600 shadow-lg shadow-yellow-100'
          }`}
        >
          {loading ? 'Uploading Assets...' : 'Publish Movie'}
        </button>
      </form>
    </div>
  )
}