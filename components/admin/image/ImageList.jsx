"use client"
import { getGoogleDriveImageUrl } from '@/utils/google/manage';
import React, { useState } from 'react';

export default function ImageList() {
  const imageIds = [
    "10fYFyja98QDnyfxscqdwWnvUq08thnOM", "1r0LfRQ5rHOqfvlRGlGyy_u1l4p-Uj2QG", 
    "1YZh6G5-CKZufmTuJEljf6dKtc1VtveXa", "119TNpsm6CoVKK6oK8QKwpeYcPSy_uRGd", 
    "1Ag1tHNh4PyXnmEBjGcrWYg_ZCt_if3UF", "1bgL4zLHr9QmpJiOauC0Ww0yNDNZOolo1", 
    "1cmDRP-WgDrJrQpkG_evsdDH4yk5mKV1a", "1fg65PNsdpEt2EysFQlgND7utQ7PzBf0B", 
    "1LGaZE1FaprPtQbAFEv_xbAgE1l66hi7c", "1-yUD82EYHzUYcYtpJ8pkjjM8RrNxK8s-", 
    "1GERQD_Jn2oExtpaWPTZ4I1LAejtSv3Vw", "1CBcp2YJfNDbHr67HQ-MYx_VFjYexZSQS", 
    "1QsIFH4lkyoh-llUEPkRSFYXuM3vBWtoO", "1ECmphXwQ2yhQ_b3VkDYsl0p4HL3mpQFS", 
    "1JDp16SYfc6qOZBzEL3yreY-2ajo3NqAL", "1eBFi_AQA267FPTrxpVxhQGJB8wBSQV9G", 
    "1WarjKVeeYhdeCcJSowf9C9_50Wnj3NRQ", "1gHsoO6J8ZKACFsNYxa4itDs0TxxLFhBw", 
    "13oadVlkJJxa5355dad0uvj-LobHMaVZA", "1sOajXLiX08qu7J7mCXbtTpWdymp2wN5U", 
    "1L9YdfMfrK4KXO7kVF6wR9y-p-uouwmtM", "1TF1aD1mAxXTY9IUrvdJhcVJ9f3cB1QWg", 
    "1aqujUhDgrHHd507PYB5uorw-yuwI7JzD", "1Hl7ZMrWK4E8VmvdC6fEUYyBVq7bLix1C", 
    "1xs2c6GYpn82wfqaakqTytbWp6xxT_MPW", "1T3bfBs9yVWMzYJ8NhJ_mjQ7KRAPnOeKl", 
    "1rJBt3tbe0YjOtoT-Dgl7utt72lnUFRGc", "1ZHl8c5PkemZvUCI8TFEH0hWv_6VREqiY", 
    "1K7EOdjN4HVJI3o4mS34Ar3y3TBKLEVaZ", "1pGGdop9h-DYVjHKZOI_IGQDrLtxCDefJ", 
    "1CjWcYgEX3DizF5AuOhH8e2IllG7jpJ36", "10cUc7sefFclRKSkyqTm3xuosdErozWqN", 
    "1VdcYkIqfYkLXVn0d1CFokG8NvWxvDBIc", "1NQjKpK-NTo4x09KlFQ6pSXHGRH_qmwzs", 
    "1aY1vZZZrXQtth1Xa_33uEWX5XdpqiHI4", "1HwyVeKk8BZwSHvAY_-WA1KScKgF_hgtf", 
    "10kOyFTdD5cyoGKlSkjA3jDoL1N7xGjXP"
  ];

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
      
      {/* Thumbnail Grid */}
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

      {/* Slider / Lightbox Modal */}
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