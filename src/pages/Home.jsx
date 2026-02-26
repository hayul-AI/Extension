import React from 'react';
import { Helmet } from 'react-helmet-async';
import ToolCard from '../components/ToolCard';

const tools = [
  { title: "Remove EXIF", path: "/tool-remove-exif", icon: "🗑️", desc: "Strip metadata securely" },
  { title: "PNG to JPG", path: "/online-png-to-jpg", icon: "🖼️", desc: "Convert PNG to JPG" },
  { title: "JPG to PNG", path: "/online-jpg-to-png", icon: "🌄", desc: "Convert JPG to PNG" },
  { title: "HEIC to JPG", path: "/convert-heic-to-jpg", icon: "📱", desc: "Apple HEIC to JPG" },
  { title: "WEBP to JPG", path: "/convert-webp-to-jpg", icon: "🌐", desc: "WebP images to JPG" },
  { title: "Image to PDF", path: "/make-image-to-pdf", icon: "📄", desc: "Merge images into PDF" },
  { title: "Favicon Gen", path: "/generate-favicon-now", icon: "⭐", desc: "Create favicon packs" },
  { title: "Resize & Crop", path: "/image-resize-and-crop", icon: "✂️", desc: "Adjust image size" },
  { title: "Color Palette", path: "/get-color-palette", icon: "🎨", desc: "Extract colors" },
  { title: "OCR to Text", path: "/extract-text-from-image", icon: "📝", desc: "Extract text from image" },
];

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Free Online Image Converter | Secure Local Tools</title>
        <meta name="description" content="A suite of free, secure, local image conversion tools. Strip EXIF data, convert HEIC/WEBP, generate favicons, and extract text without server uploads." />
      </Helmet>
      
      <div style={{textAlign: 'center', marginBottom: '3rem'}}>
        <h1 style={{fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-dark)'}}>Secure, Fast, Local Image Tools</h1>
        <p style={{fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto'}}>
          All processing happens directly in your browser. No server uploads, no privacy risks, instant results.
        </p>
      </div>

      <div className="card-grid">
        {tools.map(tool => (
          <ToolCard 
            key={tool.path}
            title={tool.title}
            description={tool.desc}
            icon={tool.icon}
            path={tool.path}
          />
        ))}
      </div>
    </div>
  );
}