import React from 'react';
import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';

const IconRemoveExif = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-shake">
    <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5l4 4m0-4l-4 4" />
  </svg>
);

const IconConvert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-slide">
    <path d="M16 3l4 4-4 4m-8 10l-4-4 4-4m-4 4h16m-12-10h12" />
  </svg>
);

const IconHeic = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

const IconWebp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-rotate">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const IconPdf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 15h6" />
    <path d="M9 11h6" />
    <path d="M9 19h1" />
  </svg>
);

const IconFavicon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-rotate">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconResize = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-scan">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M21 15V9" />
    <path d="M9 21h6" />
    <path d="M15 3h-6" />
    <path d="M3 9v6" />
  </svg>
);

const IconPalette = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const IconOcr = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-scan">
    <path d="M7 3H5a2 2 0 0 0-2 2v2m14-4h2a2 2 0 0 1 2 2v2m-4 14h2a2 2 0 0 0 2-2v-2M7 21H5a2 2 0 0 1-2-2v-2" />
    <path d="M9 12h6" />
    <path d="M12 9v6" />
  </svg>
);

const IconBlur = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M7 7l10 10" />
    <path d="M17 7L7 10" />
  </svg>
);

const tools = [
  { title: "Remove EXIF", path: "/tool-remove-exif", desc: "Strip sensitive metadata from your photos securely.", icon: <IconRemoveExif /> },
  { title: "PNG to JPG", path: "/online-png-to-jpg", desc: "Convert PNG images to JPG format while maintaining quality.", icon: <IconConvert /> },
  { title: "JPG to PNG", path: "/online-jpg-to-png", desc: "Turn JPG images into high-quality transparent PNGs.", icon: <IconConvert /> },
  { title: "HEIC to JPG", path: "/convert-heic-to-jpg", desc: "Convert Apple HEIC photos to compatible JPG format.", icon: <IconHeic /> },
  { title: "WEBP to JPG", path: "/convert-webp-to-jpg", desc: "Fast conversion from WebP images to standard JPGs.", icon: <IconWebp /> },
  { title: "Image to PDF", path: "/tools/image-to-pdf", desc: "Turn multiple images into a single PDF with A4 support.", icon: <IconPdf /> },
  { title: "Image Compressor", path: "/image-compressor", desc: "Reduce JPG and PNG file size while maintaining quality.", icon: <IconResize /> },
  { title: "Blur Face / Mosaic", path: "/tools/blur-face", desc: "Censor sensitive areas instantly. 100% local.", icon: <IconBlur /> },
  { title: "Favicon Generator", path: "/generate-favicon-now", desc: "Create multi-size favicon packs for your websites.", icon: <IconFavicon /> },
  { title: "Resize & Crop", path: "/image-resize-and-crop", desc: "Perfectly adjust image dimensions and aspect ratios.", icon: <IconResize /> },
  { title: "Color Palette", path: "/get-color-palette", desc: "Extract dominant color schemes from any image.", icon: <IconPalette /> },
  { title: "OCR to Text", path: "/extract-text-from-image", desc: "Extract editable text from images using high-power OCR.", icon: <IconOcr /> },
];

export default function Home() {
  return (
    <div>
      <SEO 
        title="ImageConverter - Free Online File Converter & Image Tools"
        description="Free online tools to convert and edit images instantly. Convert between formats, resize, crop, and extract text using OCR directly in your browser. No installation required."
        path="/"
      />
      
      <div style={{textAlign: 'center', marginBottom: '5rem'}}>
        <h1 style={{fontSize: '3rem', fontWeight: '800', letterSpacing: '-0.05em', marginBottom: '1.25rem', color: 'var(--text-main)', lineHeight: '1.1'}}>
          Professional Image Tools.<br/>
          <span style={{color: 'var(--accent)'}}>Zero Privacy Risks.</span>
        </h1>
        <p style={{fontSize: '1.25rem', color: 'var(--text-soft)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6'}}>
          All processing happens directly on your device. Your files never leave your browser, ensuring absolute security and speed.
        </p>
      </div>

      <h2 style={{fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '2rem', textAlign: 'left', borderLeft: '4px solid var(--accent)', paddingLeft: '1rem'}}>
        Popular Conversion Tools
      </h2>

      <div className="card-grid">
        {tools.map(tool => (
          <ToolCard 
            key={tool.path}
            title={tool.title}
            description={tool.desc}
            path={tool.path}
            icon={tool.icon}
          />
        ))}
      </div>

      <div style={{marginTop: '6rem', backgroundColor: 'var(--card)', borderRadius: 'var(--radius-card)', padding: '4rem 3rem', border: '1px solid var(--border)', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
        <h2 style={{fontSize: '2rem', fontWeight: '800', marginBottom: '1rem', position: 'relative', zIndex: 1}}>Why choose ImageConverter?</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginTop: '4rem', position: 'relative', zIndex: 1}}>
          <div>
            <h3 style={{fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--accent)'}}>Private</h3>
            <p style={{fontSize: '1rem', color: 'var(--text-soft)'}}>Your images stay on your computer. We never see them.</p>
          </div>
          <div>
            <h3 style={{fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--accent)'}}>Instant</h3>
            <p style={{fontSize: '1rem', color: 'var(--text-soft)'}}>No waiting for uploads or server queues. Instant processing.</p>
          </div>
          <div>
            <h3 style={{fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--accent)'}}>Premium</h3>
            <p style={{fontSize: '1rem', color: 'var(--text-soft)'}}>Professional features without subscription or limitations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
