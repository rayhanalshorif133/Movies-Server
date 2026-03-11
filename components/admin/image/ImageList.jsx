"use client"
import { deleteFileFromGoogleDrive, getGoogleDriveImageUrl } from '@/utils/google/manage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Swal from 'sweetalert2';

export default function ImageList({ images }) {

  const [imageIds, setImageIds] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);

  useEffect(() => {
    if (images && images.length > 0) {
      const ids = images.map((item) => item.drive_id);
      setImageIds(ids);
    }
  }, [images]);

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

  const deleteImageBtn = (targetId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will remove the selected image.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`/api/images/?drive_id=${targetId}`);

        const deleteImageFromDrive = deleteFileFromGoogleDrive(targetId);

        if (deleteImageFromDrive) {
          setImageIds(prevIds => prevIds.filter(id => id !== targetId));

          Swal.fire('Deleted!', 'Your image has been deleted.', 'success');
        } else {
          Swal.fire('Error!', 'Failed to delete the image from Drive.', 'error');
        }
      }
    });
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h2 className="text-3xl font-bold text-center mb-10">
        Google Drive Gallery
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

        {imageIds.map((id, index) => (

          <div
            key={index}
            className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
          >

            <img
              onClick={() => openSlider(index)}
              src={getGoogleDriveImageUrl(id)}
              alt={`Item ${index + 1}`}
              className="w-full h-44 object-cover group-hover:scale-110 transition duration-500"
              loading="lazy"
            />

            {/* Delete Button */}
            <div
              onClick={() => deleteImageBtn(id)}
              className="absolute top-2 right-2 backdrop-blur-md bg-white/60 hover:bg-red-500 hover:text-white text-red-500 transition p-1.5 rounded-full shadow cursor-pointer"
            >
              <RxCross2 size={14} />
            </div>

          </div>

        ))}

      </div>

      {/* MODAL SLIDER */}
      {selectedIdx !== null && (

        <div
          onClick={closeSlider}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
        >

          {/* CLOSE */}
          <button
            onClick={closeSlider}
            className="absolute top-6 right-10 text-white text-4xl hover:text-red-400"
          >
            <RxCross2 size={14} />
          </button>

          {/* PREV */}
          <button
            onClick={prevSlide}
            className="absolute left-6 text-white text-3xl bg-white/20 hover:bg-white/40 p-4 rounded-full"
          >
            ◀
          </button>

          {/* IMAGE */}
          <div className="text-center">

            <img
              src={getGoogleDriveImageUrl(imageIds[selectedIdx])}
              alt="Preview"
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl"
            />

            <p className="text-white mt-4 text-lg">
              {selectedIdx + 1} / {imageIds.length}
            </p>

          </div>

          <button
            onClick={nextSlide}
            className="absolute right-6 text-white text-3xl bg-white/20 hover:bg-white/40 p-4 rounded-full"
          >
            ▶
          </button>

        </div>

      )}

    </div>
  );
}