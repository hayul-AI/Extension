import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';

export default function PngToJpg() {
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
    what: "This tool converts PNG images into the JPG format, which is widely supported and often results in smaller file sizes.",
    how: "Using HTML5 Canvas, your browser loads the PNG file, paints a white background (since JPG does not support transparency), and then exports the image as a compressed JPG. No server processing is involved.",
    example: "You have a large, high-resolution PNG graphic that you need to upload to a website with strict file size limits. Converting it to JPG reduces the size while maintaining acceptable quality.",
    interpretation: "The output file is a standard JPG. If your original PNG had transparent areas, they will appear solid white in the resulting JPG.",
    faqs: [
      { q: "What happens to transparency?", a: "JPG format does not support transparency. Any transparent areas in your PNG will be filled with a solid white background." },
      { q: "Will I lose image quality?", a: "JPG uses lossy compression. While we use a high quality setting (90%), there may be slight artifacts compared to the lossless PNG, particularly around sharp text." },
      { q: "Is there a file size limit?", a: "Since processing relies on your device's memory, extremely large files (e.g., over 50MB) might cause your browser to slow down, but there is no hard limit imposed by us." }
    ]
  };

  return (
    <ToolShell 
      title="Convert PNG to JPG" 
      description="Quickly convert PNG images to JPG format directly in your browser. Handles transparency automatically."
      seoData={seoData}
      canonicalPath="/online-png-to-jpg"
    >
      {!resultUrl ? (
        <FileDrop onFileSelect={processImage} accept="image/png" />
      ) : (
        <div className="result-area">
          <h3>Converted to JPG!</h3>
          <img src={resultUrl} alt="Preview" style={{maxHeight: '300px'}} />
          <div>
            <a href={resultUrl} download={file.name.replace(/\.png$/i, '.jpg')} className="btn">
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