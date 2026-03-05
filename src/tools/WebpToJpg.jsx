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
    title: "WebP to JPG Converter",
    intro: "Convert modern WebP images into the universally recognized JPG format instantly. WebP is excellent for web performance, but many image viewers, social media platforms, and legacy editing tools still do not fully support it.",
    whyUse: [
      "Open downloaded website images in any standard photo viewer or editor.",
      "Ensure your graphics are visible on all social media and messaging platforms.",
      "Easily share high-quality images with users on older operating systems.",
      "Quickly convert 'Save as WebP' browser images back to standard JPGs."
    ],
    howItWorks: "The conversion happens natively in your browser. Our tool loads the WebP binary data, renders the image onto a hidden HTML5 canvas element, and then exports that canvas as a compressed JPG stream. No server bandwidth is used, keeping your conversion fast and private.",
    bestResults: [
      "If the WebP image is animated, only the first frame will be converted to a static JPG.",
      "Since JPG doesn't support transparency, any transparent WebP areas will become white.",
      "The output quality is set to 90%, providing a perfect balance of clarity and file size."
    ],
    faqs: [
      { q: "Is WebP better than JPG?", a: "Yes, WebP typically provides 25-35% better compression than JPG at the same quality level. It's the modern standard for the web, but JPG remains the universal standard for compatibility." },
      { q: "Can I convert animated WebP to GIF?", a: "This specific tool converts WebP to static JPG. For animations, you would need a WebP-to-GIF specific converter." },
      { q: "Is there any privacy risk?", a: "None. All processing is 100% client-side. We have no backend server receiving or storing your image files." },
      { q: "Does it support large WebP files?", a: "Yes, it can handle large files, although extremely high resolutions might be limited by your computer's available RAM." },
      { q: "Why did my transparent image turn white?", a: "The JPG format is older and does not support transparency (alpha channels). Our converter automatically fills these areas with white for a clean look." }
    ],
    relatedTools: [
      { name: "PNG to JPG", path: "/online-png-to-jpg" },
      { name: "Image to PDF", path: "/make-image-to-pdf" },
      { name: "Resize & Crop", path: "/image-resize-and-crop" }
    ],
    slug: "convert-webp-to-jpg"
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
          <img src={resultUrl} alt="Preview" />
          <div className="btn-group">
            <a href={resultUrl} download={file.name.replace(/\.webp$/i, '.jpg')} className="btn btn-primary">
              Download JPG
            </a>
            <button onClick={() => {setFile(null); setResultUrl(null)}} className="btn btn-secondary">
              Convert Another
            </button>
          </div>
        </div>
      )}
    </ToolShell>
  );
}