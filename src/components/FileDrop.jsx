import React, { useCallback, useState } from 'react';

export default function FileDrop({ onFileSelect, accept, multiple = false }) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (multiple) {
        onFileSelect(Array.from(e.dataTransfer.files));
      } else {
        onFileSelect(e.dataTransfer.files[0]);
      }
    }
  }, [onFileSelect, multiple]);

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      if (multiple) {
        onFileSelect(Array.from(e.target.files));
      } else {
        onFileSelect(e.target.files[0]);
      }
    }
  };

  return (
    <div 
      className={`file-drop ${isDragActive ? 'active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload').click()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{margin: '0 auto'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
      <p>Drag and drop your file(s) here, or click to select</p>
      <input 
        id="file-upload" 
        type="file" 
        accept={accept} 
        multiple={multiple}
        style={{ display: 'none' }} 
        onChange={handleChange} 
      />
    </div>
  );
}