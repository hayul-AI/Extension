import React from 'react';
import SEO from '../components/SEO';
import ToolShell from '../components/ToolShell';
import ContentPageShell from '../components/ContentPageShell';

export default function PdfCompressor() {
  return (
    <>
      <SEO 
        title="PDF Compressor | ImageConverter"
        description="Compress PDF files online while maintaining readability and quality. Ideal for email attachments and web uploads."
        path="/pdf-compressor"
      />
      <ToolShell
        title="PDF Compressor"
        description="Reduce PDF file size without losing quality."
      >
        <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <h2 style={{ marginBottom: '1rem' }}>Coming Soon</h2>
          <p style={{ color: 'var(--text-soft)' }}>Shrink your PDF files for easier sharing and uploading.</p>
        </div>
      </ToolShell>
      <ContentPageShell>
        <div className="seo-section">
          <h2>Compress PDF Files</h2>
          <p>Our PDF compressor will help you reduce the size of your documents while keeping them legible and professional.</p>
        </div>
      </ContentPageShell>
    </>
  );
}
