"use client"

import ImageUploader from '@/components/common/ImageUploader';
import MultiImageUploader from '@/components/common/MultiImageUploader';
import { getMovieFileInfo } from '@/utils/google/movie-info';
import React, { useEffect, useState } from 'react'
import { MdClear } from "react-icons/md";
import axios from "axios";
import Swal from 'sweetalert2';

export default function UpdateGame({ game }) {
  const [loading, setLoading] = useState(false);
  const [driveId, setDriveId] = useState('');
  const [driveIds, setDriveIds] = useState([]);
  const [type, setTypes] = useState('');
  const [errorMsg, setErrorMsg] = useState();

  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    url: '',
    size: 0,
    asset_type: '',
    game_type: '',
    gmail: '',
    thumbnail_image: '',
    asset_images: [],
    asset_gif_images: [],
  });

  // Helper to generate Google Drive Preview Link
  const getImageUrl = (id) => {
    if (!id) return 'https://placehold.co/400x300?text=No+Image';
    // Replace this URL with your actual image proxy or direct link logic
    return `https://lh3.googleusercontent.com/d/${id}`;
  };

  const fetchTypes = async () => {
    try {
      const res = await fetch("/api/games/type");
      const data = await res.json();
      if (res.ok) setTypes(data);
    } catch (error) {
      console.error("Failed to fetch types:", error);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    if (game) {
      setFormData({
        _id: game.id || game._id,
        title: game.title || '',
        url: game.url || '',
        size: game.size || 0,
        asset_type: game.asset_type || '',
        game_type: game.game_type || '',
        gmail: game.gmail || '',
        thumbnail_image: game.thumbnail_image || '',
        asset_images: game.asset_images || [],
        asset_gif_images: game.asset_gif_images || [],
      });
    }
  }, [game]);

  // ... (handlePaste, clearURL, and driveId useEffects remain the same)

  useEffect(() => {
    if (driveId) {
      setFormData(prev => ({ ...prev, thumbnail_image: driveId }));
    }
  }, [driveId]);

  useEffect(() => {
    if (driveIds.length === 0) return;
    const images = [];
    const gifs = [];

    driveIds.forEach(file => {
      if (file.type.includes("gif")) {
        gifs.push(file.id);
      } else {
        images.push(file.id);
      }
    });

    setFormData(prev => ({
      ...prev,
      asset_images: [...prev.asset_images, ...images],
      asset_gif_images: [...prev.asset_gif_images, ...gifs]
    }));
  }, [driveIds]);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    axios.put('/api/games', formData)
      .then(response => {
        Swal.fire({ icon: 'success', title: 'Updated!', text: 'Game updated successfully.' });
        setTimeout(() => {
          window.location.href = `/admin/games?search=${encodeURIComponent(formData.title)}&page=1`;
        }, 1500);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }

  return (
    <div className="max-w-full mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Update Game</h3>
      <form onSubmit={handleUpload} className="space-y-6">
        
        {/* ... URL and Metadata inputs remain same ... */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Thumbnail Section */}
          <div className='flex flex-col items-center bg-gray-50 p-4 rounded-lg'>
            <label className="font-semibold text-sm block mb-2 w-full text-center">Main Thumbnail</label>
            <div className="relative group mb-3">
              <img
                alt="Thumbnail"
                className="h-48 w-48 object-cover rounded-lg border shadow-sm"
                src={getImageUrl(formData.thumbnail_image)}
              />
            </div>
            <ImageUploader setDriveId={setDriveId} />
          </div>

          {/* Preview Images/GIFs Section */}
          <div className='flex flex-col bg-gray-50 p-4 rounded-lg'>
            <label className="font-semibold text-sm block mb-2">Preview Images & GIFs</label>
            
            <div className='grid grid-cols-3 gap-2 mb-4 overflow-y-auto max-h-48 p-2 border bg-white rounded-md'>
              {/* Show Existing Images */}
              {formData.asset_images.map((imgId, idx) => (
                <img key={`img-${idx}`} src={getImageUrl(imgId)} className="h-20 w-full object-cover rounded border" alt="preview" />
              ))}
              {/* Show Existing GIFs */}
              {formData.asset_gif_images.map((gifId, idx) => (
                <img key={`gif-${idx}`} src={getImageUrl(gifId)} className="h-20 w-full object-cover rounded border" alt="gif preview" />
              ))}
              
              {formData.asset_images.length === 0 && formData.asset_gif_images.length === 0 && (
                <p className="col-span-3 text-center text-gray-400 text-xs py-4">No preview files uploaded</p>
              )}
            </div>

            <MultiImageUploader setDriveIds={setDriveIds} />
            <p className="text-xs text-gray-400 mt-2">Upload new files to add to the existing gallery.</p>
          </div>
        </div>

        <button
          disabled={loading || !formData.thumbnail_image}
          className={`w-full py-4 rounded-lg font-bold text-white ${loading || !formData.thumbnail_image ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Updating..." : "Update Game Asset"}
        </button>
      </form>
    </div>
  )
}