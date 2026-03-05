import React from 'react';
import SEO from '../components/SEO';
import ToolShell from '../components/ToolShell';
import ContentPageShell from '../components/ContentPageShell';
import { Link } from 'react-router-dom';

export default function ImageConverterTool() {
  return (
    <>
      <SEO 
        title="PNG, JPG & WEBP Image Converter | ImageConverter"
        description="Convert images between PNG, JPG, and WEBP formats easily online. Fast, secure, and no download or installation required."
        path="/image-converter"
      />
      <ToolShell
        title="Image Converter"
        description="Switch between popular image formats instantly."
      >
        <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Select a format to convert</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            <Link to="/online-png-to-jpg" className="tool-card" style={{ padding: '1rem', textDecoration: 'none' }}>PNG to JPG</Link>
            <Link to="/online-jpg-to-png" className="tool-card" style={{ padding: '1rem', textDecoration: 'none' }}>JPG to PNG</Link>
            <Link to="/convert-webp-to-jpg" className="tool-card" style={{ padding: '1rem', textDecoration: 'none' }}>WebP to JPG</Link>
            <Link to="/convert-heic-to-jpg" className="tool-card" style={{ padding: '1rem', textDecoration: 'none' }}>HEIC to JPG</Link>
          </div>
        </div>
      </ToolShell>
      <ContentPageShell>
        <div className="seo-section">
          <h2>Universal Image Conversion</h2>
          <p>Easily convert your photos and graphics between all major web formats: PNG, JPG, and WebP. Our tool works entirely in your browser, keeping your data private.</p>
        </div>
      </ContentPageShell>
    </>
  );
}
