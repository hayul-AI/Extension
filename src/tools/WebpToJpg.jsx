import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';

export default function WebpToJpg() {
  const [file, setFile] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  const processImage = (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setResultUrl(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const seoData = {
    what: "Converts modern WebP images into the universally recognized JPG format.",
    how: "Your browser loads the WebP image, renders it onto a hidden HTML5 Canvas, fills any transparent background with white, and then exports the canvas data as a new JPG file.",
    example: "You downloaded an image from a website that saved as a .webp file, but the software you need to use it with doesn't support WebP. Convert it to JPG to fix the compatibility issue.",
    interpretation: "The converted JPG file will be visually identical to the WebP but will have a different file extension and likely a different file size.",
    faqs: [
      { q: "What happens to WebP animations?", a: "JPG does not support animation. If you upload an animated WebP, only the first frame will be captured in the resulting JPG." },
      { q: "Is transparency preserved?", a: "No, JPG cannot handle transparency. Any transparent areas in your WebP will become solid white." },
      { q: "Is my image uploaded?", a: "No, all conversion logic is executed securely on your own device." }
    ]
  };

  return (
    <ToolShell 
      title="Convert WEBP to JPG" 
      description="Quickly convert WebP images to JPG format for maximum compatibility. 100% local processing."
      seoData={seoData}
      canonicalPath="/convert-webp-to-jpg"
    >
      {!resultUrl ? (
        <FileDrop onFileSelect={processImage} accept="image/webp" />
      ) : (
        <div className="result-area">
          <h3>Converted to JPG!</h3>
          <img src={resultUrl} alt="Preview" style={{maxHeight: '300px'}} />
          <div>
            <a href={resultUrl} download={file.name.replace(/\.webp$/i, '.jpg')} className="btn">
              Download JPG
            </a>
            <button onClick={() => {setFile(null); setResultUrl(null)}} className="btn" style={{background: 'var(--text-light)', marginLeft: '1rem'}}>
              Convert Another
            </button>
          </div>
        </div>
      )}
    </ToolShell>
  );
}