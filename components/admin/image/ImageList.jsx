"use client"
import { deleteFileFromGoogleDrive, getGoogleDriveImageUrl } from '@/utils/google/manage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2, RxCheck } from 'react-icons/rx';
import Swal from 'sweetalert2';

export default function ImageList({ images }) {
  const [imageIds, setImageIds] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  
  // Multi-select state
  const [selectedForDelete, setSelectedForDelete] = useState([]);

  useEffect(() => {
    if (images && images.length > 0) {
      const ids = images.map((item) => item.drive_id);
      setImageIds(ids);
    }
  }, [images]);

  // Toggle selection for an image
  const toggleSelect = (id) => {
    setSelectedForDelete((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openSlider = (index) => setSelectedIdx(index);
  const closeSlider = () => setSelectedIdx(null);

  const nextSlide = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev + 1) % imageIds.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev - 1 + imageIds.length) % imageIds.length);
  };

  // Bulk Delete Function
  const deleteSelectedImages = async () => {
    if (selectedForDelete.length === 0) return;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${selectedForDelete.length} image(s).`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete all!',
    });

    if (result.isConfirmed) {
      try {
        // সব আইডি এর জন্য ডিলিট রিকোয়েস্ট পাঠানো
        const deletePromises = selectedForDelete.map(async (id) => {
          await axios.delete(`/api/images/?drive_id=${id}`);
          return deleteFileFromGoogleDrive(id);
        });

        await Promise.all(deletePromises);

        // UI আপডেট করা
        setImageIds((prevIds) => prevIds.filter((id) => !selectedForDelete.includes(id)));
        setSelectedForDelete([]); // সিলেকশন ক্লিয়ার করা
        
        Swal.fire('Deleted!', 'Selected images have been removed.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-3xl font-bold">Google Drive Gallery</h2>
        
        {/* Multi-delete Button */}
        {selectedForDelete.length > 0 && (
          <button
            onClick={deleteSelectedImages}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-lg transition-all animate-bounce"
          >
            Delete Selected ({selectedForDelete.length})
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {imageIds.map((id, index) => {
          const isSelected = selectedForDelete.includes(id);
          
          return (
            <div
              key={id}
              className={`group relative rounded-xl overflow-hidden shadow-lg transition duration-300 border-4 ${
                isSelected ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <img
                onClick={() => openSlider(index)}
                src={getGoogleDriveImageUrl(id)}
                alt={`Item ${index + 1}`}
                className="w-full h-44 object-cover group-hover:scale-105 transition duration-500 cursor-pointer"
                loading="lazy"
              />

              {/* Selection Checkbox */}
              <div
                onClick={() => toggleSelect(id)}
                className={`absolute top-2 left-2 p-1.5 rounded-full cursor-pointer transition shadow-md ${
                  isSelected ? 'bg-blue-500 text-white' : 'bg-white/80 text-gray-400 hover:text-blue-500'
                }`}
              >
                <RxCheck size={18} />
              </div>

              {/* Individual Overlay for feedback */}
              {isSelected && (
                 <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL SLIDER (আগের মতোই থাকবে) */}
      {selectedIdx !== null && (
        <div
          onClick={closeSlider}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <button onClick={closeSlider} className="absolute top-6 right-10 text-white hover:text-red-400">
            <RxCross2 size={30} />
          </button>

          <button onClick={prevSlide} className="absolute left-6 text-white text-3xl bg-white/20 hover:bg-white/40 p-4 rounded-full">
            ◀
          </button>

          <div className="text-center">
            <img
              src={getGoogleDriveImageUrl(imageIds[selectedIdx])}
              alt="Preview"
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl"
            />
            <p className="text-white mt-4 text-lg">{selectedIdx + 1} / {imageIds.length}</p>
          </div>

          <button onClick={nextSlide} className="absolute right-6 text-white text-3xl bg-white/20 hover:bg-white/40 p-4 rounded-full">
            ▶
          </button>
        </div>
      )}
    </div>
  );
}