'use client';
import { useState } from 'react';

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Prothome ekti image select korun!");

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert("Upload Safol Hoyeche! File ID: " + data.fileId);
      } else {
        alert("Upload hoyni: " + data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-10">
      <form onSubmit={handleUpload}>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          accept="image/*"
        />
        <button 
          type="submit" 
          disabled={uploading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {uploading ? 'Uploading...' : 'Upload to Drive'}
        </button>
      </form>
    </div>
  );
}