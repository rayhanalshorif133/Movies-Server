"use client"
import { getGoogleDriveImageUrl } from '@/utils/google/manage';
import React, { useEffect, useState } from 'react';

export default function ImageList({ images }) {

  const [imageIds, setImageIds] = useState([]);

  useEffect(() => {
    if (images && images.length > 0) {
      const ids = images.map((item) => item.drive_id);
      setImageIds(ids);
    }
  }, [images]); 


  // Logic states
  const [selectedIdx, setSelectedIdx] = useState(null);

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

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center' }}>Google Drive Gallery</h2>

      <div style={styles.grid}>
        {imageIds.map((id, index) => (
          <div key={index} style={styles.card} onClick={() => openSlider(index)}>
            <img
              src={getGoogleDriveImageUrl(id)}
              alt={`Item ${index + 1}`}
              style={styles.image}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {selectedIdx !== null && (
        <div style={styles.overlay} onClick={closeSlider}>
          <button style={styles.closeBtn} onClick={closeSlider}>✕</button>

          <button style={{ ...styles.navBtn, left: '20px' }} onClick={prevSlide}>◀</button>

          <div style={styles.modalContent}>
            <img
              src={getGoogleDriveImageUrl(imageIds[selectedIdx])}
              alt="Preview"
              style={styles.fullImage}
            />
            <p style={styles.counter}>{selectedIdx + 1} / {imageIds.length}</p>
          </div>

          <button style={{ ...styles.navBtn, right: '20px' }} onClick={nextSlide}>▶</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '1200px', margin: '0 auto' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px'
  },
  card: {
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  image: { width: '100%', height: '200px', objectFit: 'cover' },

  // Slider Styles
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: { textAlign: 'center', position: 'relative' },
  fullImage: { maxWidth: '90vw', maxHeight: '80vh', borderRadius: '5px' },
  closeBtn: {
    position: 'absolute', top: '20px', right: '30px',
    background: 'none', border: 'none', color: 'white',
    fontSize: '30px', cursor: 'pointer'
  },
  navBtn: {
    position: 'absolute',
    background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
    padding: '15px', cursor: 'pointer', fontSize: '20px', borderRadius: '50%'
  },
  counter: { color: 'white', marginTop: '10px' }
};