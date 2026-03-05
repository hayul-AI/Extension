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
    title: "PNG to JPG Converter",
    intro: "Convert your PNG files to highly compatible JPG format instantly. While PNG is great for transparency, JPG is often superior for photographs and web use due to its efficient compression and universal support.",
    whyUse: [
      "Significantly reduce file size for faster website loading speeds.",
      "Ensure compatibility with software that doesn't support the PNG format.",
      "Perfect for saving space on mobile devices and cloud storage.",
      "Convert screenshots (usually PNG) to smaller files for easy emailing."
    ],
    howItWorks: "Your browser loads the PNG image and renders it onto a background canvas. Since JPG does not support transparency, we apply a solid white background before exporting the final image as a compressed JPG file. This entire transition is computed locally.",
    bestResults: [
      "Use this for photos or complex images where 100% pixel-per-pixel accuracy isn't required.",
      "Avoid using this for logos or text with transparent backgrounds if you need to keep transparency.",
      "The tool uses a 90% quality setting to balance small file size with sharp visual fidelity."
    ],
    faqs: [
      { q: "Will I lose image quality during conversion?", a: "JPG uses lossy compression, so there is a minor loss of data. However, at our high quality setting, the visual difference is virtually indistinguishable to the human eye." },
      { q: "What happens to my transparent background?", a: "Because the JPG format is incapable of handling alpha channels (transparency), all transparent areas will be filled with a solid white color." },
      { q: "Is it safe to upload my personal photos?", a: "You aren't uploading them! The conversion happens inside your browser's execution environment. No data is sent to our servers." },
      { q: "Can I convert large PNG files?", a: "Yes, though very high-resolution images (e.g., 8K+) may consume significant browser memory during the canvas rendering phase." },
      { q: "Is there a cost to use this converter?", a: "No, this is a free professional utility provided by hotplmedia for the developer and creative community." }
    ],
    relatedTools: [
      { name: "JPG to PNG", path: "/online-jpg-to-png" },
      { name: "WEBP to JPG", path: "/convert-webp-to-jpg" },
      { name: "HEIC to JPG", path: "/convert-heic-to-jpg" }
    ],
    slug: "online-png-to-jpg"
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
          <img src={resultUrl} alt="Preview" />
          <div className="btn-group">
            <a href={resultUrl} download={file.name.replace(/\.png$/i, '.jpg')} className="btn btn-primary">
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