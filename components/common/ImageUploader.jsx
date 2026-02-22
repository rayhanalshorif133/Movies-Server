"use client";

import { uploadImageInGoogleDrive } from '@/utils/google/manage-image';
import { useState } from 'react';

export default function ImageUploader({setDriveId}) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ১. লোকাল প্রিভিউ দেখানো (আপলোড হওয়ার আগেই)
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    setLoading(true);
    const driveId = await uploadImageInGoogleDrive(file);
    setLoading(false);

    if (driveId) {
      setFileUrl(`https://drive.google.com/uc?id=${driveId}`);
      setDriveId(driveId);
    }
  };

  return (
    <div className="mx-auto w-full mt-10">
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-yellow-400 transition cursor-pointer relative bg-gray-50 overflow-hidden">
        
        {preview ? (
          <div className="flex flex-col items-center">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-48 rounded-md mb-2 object-cover" 
            />
            {loading ? (
              <p className="text-xs text-yellow-600 animate-pulse">Uploading to Drive...</p>
            ) : (
              <p className="text-xs text-green-600 font-bold">Uploaded ✅</p>
            )}
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-700">Upload Poster (JPG/PNG)</p>
            <p className="text-xs text-gray-400 mt-1">Click or drag to select</p>
          </>
        )}

        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        />
      </div>

      {fileUrl && (
        <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs break-all">
          <strong>Drive URL:</strong> <a href={fileUrl} target="_blank" className="text-blue-600 underline">{fileUrl}</a>
        </div>
      )}
    </div>
  );
}