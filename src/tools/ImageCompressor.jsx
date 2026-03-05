import React from 'react';
import SEO from '../components/SEO';
import ToolShell from '../components/ToolShell';
import ContentPageShell from '../components/ContentPageShell';

export default function ImageCompressor() {
  return (
    <>
      <SEO 
        title="Image Compressor (JPG & PNG) | ImageConverter"
        description="Reduce JPG and PNG image file size without noticeable quality loss. Optimize photos for websites, email, and uploads directly in your browser."
        path="/image-compressor"
      />
      <ToolShell
        title="Image Compressor"
        description="Reduce file size while maintaining quality."
      >
        <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <h2 style={{ marginBottom: '1rem' }}>Coming Soon</h2>
          <p style={{ color: 'var(--text-soft)' }}>We are working hard to bring you the best in-browser image compression tool.</p>
        </div>
      </ToolShell>
      <ContentPageShell>
        <div className="seo-section">
          <h2>Optimize Your Images</h2>
          <p>This tool will allow you to compress JPG and PNG images directly in your browser, ensuring your data never leaves your device.</p>
        </div>
      </ContentPageShell>
    </>
  );
}
