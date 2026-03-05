import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';

export default function JpgToPng() {
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
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setResultUrl(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const seoData = {
    title: "JPG to PNG Converter",
    intro: "Transform your JPG (JPEG) images into high-quality PNG files effortlessly. PNG is a lossless format that is perfect for digital art, graphics, and images that require further editing without degrading quality.",
    whyUse: [
      "Prevent generation loss when editing and saving images multiple times.",
      "Prepare photos for graphics software that requires PNG input.",
      "Preserve sharp edges and fine details in digital illustrations.",
      "Convert compressed camera photos to a lossless archive format."
    ],
    howItWorks: "The tool utilizes your browser's internal imaging engine. It decodes the compressed JPG data into raw pixels and then re-encodes those pixels into a lossless PNG bitstream. No external servers are used, ensuring your data remains private.",
    bestResults: [
      "Use this tool when you plan to perform detailed editing on a photo.",
      "Keep in mind that the file size will likely increase as PNG is a lossless format.",
      "Upload high-quality JPGs to ensure the best possible starting point for the PNG conversion."
    ],
    faqs: [
      { q: "Does this improve the quality of my original JPG?", a: "No. Converting a lossy JPG to a lossless PNG cannot restore data that was already discarded during the initial JPG compression. It simply stops further quality loss." },
      { q: "Can I make the background transparent?", a: "Standard JPGs do not contain transparency data. To make a background transparent, you would need to use a background removal tool after converting to PNG." },
      { q: "Why is the resulting PNG file larger?", a: "JPG shrinks file size by discarding data. PNG stores exact pixel data losslessly, which inherently requires more storage space." },
      { q: "Is there a limit on the number of conversions?", a: "No, you can use our local converter as many times as you like for free." },
      { q: "Is my image security guaranteed?", a: "Yes. Because the code runs entirely on your local machine, no third party—including us—can see your images." }
    ],
    relatedTools: [
      { name: "PNG to JPG", path: "/online-png-to-jpg" },
      { name: "Image to PDF", path: "/make-image-to-pdf" },
      { name: "Resize & Crop", path: "/image-resize-and-crop" }
    ],
    slug: "online-jpg-to-png"
  };

  return (
    <ToolShell 
      title="Convert JPG to PNG" 
      description="Instantly turn JPG photos into lossless PNG images. 100% private and offline."
      seoData={seoData}
      canonicalPath="/online-jpg-to-png"
    >
      {!resultUrl ? (
        <FileDrop onFileSelect={processImage} accept="image/jpeg, image/jpg" />
      ) : (
        <div className="result-area">
          <h3>Converted to PNG!</h3>
          <img src={resultUrl} alt="Preview" />
          <div className="btn-group">
            <a href={resultUrl} download={file.name.replace(/\.jpe?g$/i, '.png')} className="btn btn-primary">
              Download PNG
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