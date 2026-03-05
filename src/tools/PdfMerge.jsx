import React from 'react';
import SEO from '../components/SEO';
import ToolShell from '../components/ToolShell';
import ContentPageShell from '../components/ContentPageShell';

export default function PdfMerge() {
  return (
    <>
      <SEO 
        title="PDF Merge Tool | ImageConverter"
        description="Combine multiple PDF files into a single document quickly and securely. No registration or software installation needed."
        path="/pdf-merge"
      />
      <ToolShell
        title="PDF Merge"
        description="Combine multiple PDFs into one document."
      >
        <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <h2 style={{ marginBottom: '1rem' }}>Coming Soon</h2>
          <p style={{ color: 'var(--text-soft)' }}>Merge your PDF files securely and fast with our upcoming tool.</p>
        </div>
      </ToolShell>
      <ContentPageShell>
        <div className="seo-section">
          <h2>Merge PDFs Easily</h2>
          <p>Our PDF merge tool will allow you to combine multiple documents into a single PDF file without uploading anything to a server.</p>
        </div>
      </ContentPageShell>
    </>
  );
}
