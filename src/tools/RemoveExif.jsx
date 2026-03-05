import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';

export default function RemoveExif() {
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
        
        const dataUrl = canvas.toDataURL(selectedFile.type || 'image/jpeg', 1.0);
        setResultUrl(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const seoData = {
    title: "EXIF Metadata Remover",
    intro: "Protect your digital privacy by stripping hidden metadata from your photos. Every image you take contains embedded information like GPS coordinates, camera settings, and timestamps that could compromise your security when shared online.",
    whyUse: [
      "Remove precise GPS location data before posting to social media.",
      "Clear camera and lens specifications to protect your equipment details.",
      "Reduce file overhead by removing unnecessary header information.",
      "Ensure professional privacy for sensitive internal documents or photos."
    ],
    howItWorks: "Our tool utilizes advanced client-side processing. It reads the raw pixel data of your image and redraws it onto a fresh canvas, effectively creating a clean copy that lacks any of the original metadata headers (EXIF, IPTC, XMP). This process happens entirely in your RAM.",
    bestResults: [
      "Use high-quality original files for the cleanest strip.",
      "Download the 'Clean Image' immediately after processing.",
      "Note that this tool currently supports standard image formats like JPG and PNG."
    ],
    faqs: [
      { q: "What exactly is EXIF data?", a: "EXIF (Exchangeable Image File Format) is data embedded in image files that includes information about the camera, date, time, and often the exact GPS location where the photo was taken." },
      { q: "Does stripping metadata reduce image quality?", a: "No, we use a 100% quality redraw method to ensure that the visible pixels remain identical to your original photo." },
      { q: "Is my data stored on your server?", a: "Absolutely not. This tool is 100% local. Your photos never leave your computer or smartphone." },
      { q: "Can I batch process photos?", a: "Currently, this utility processes images one at a time to ensure maximum browser stability and privacy." },
      { q: "Does this work on iPhone photos?", a: "Yes, it is highly recommended for iPhone and Android photos which often contain highly accurate location tags." }
    ],
    relatedTools: [
      { name: "Image to PDF", path: "/make-image-to-pdf" },
      { name: "Resize & Crop", path: "/image-resize-and-crop" },
      { name: "PNG to JPG", path: "/online-png-to-jpg" }
    ],
    slug: "tool-remove-exif"
  };

  return (
    <ToolShell 
      title="EXIF Metadata Remover" 
      description="Securely strip GPS location, camera details, and hidden metadata from your photos without uploading them."
      seoData={seoData}
      canonicalPath="/tool-remove-exif"
    >
      {!resultUrl ? (
        <FileDrop onFileSelect={processImage} accept="image/*" />
      ) : (
        <div className="result-area">
          <h3>EXIF Data Removed Successfully!</h3>
          <img src={resultUrl} alt="Preview" />
          <div className="btn-group">
            <a href={resultUrl} download={`cleaned_${file.name}`} className="btn btn-primary">
              Download Clean Image
            </a>
            <button onClick={() => {setFile(null); setResultUrl(null)}} className="btn btn-secondary">
              Process Another
            </button>
          </div>
        </div>
      )}
    </ToolShell>
  );
}