import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import SEO from '../components/SEO';
import ToolShell from '../components/ToolShell';
import ContentPageShell from '../components/ContentPageShell';
import ProgressBar from '../components/ProgressBar';

export default function PdfMerge() {
  const [files, setFiles] = useState([]);
  const [merging, setMerging] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    setFiles(prev => [...prev, ...pdfFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] }
  });

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setMerging(true);
    setProgress(10);

    try {
      const mergedPdf = await PDFDocument.create();
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        setProgress(10 + Math.floor(((i + 1) / files.length) * 80));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `merged_${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setProgress(100);
      setTimeout(() => {
        setMerging(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Failed to merge PDFs. Please ensure all files are valid PDF documents.');
      setMerging(false);
      setProgress(0);
    }
  };

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
        <div 
          {...getRootProps()} 
          style={{ 
            padding: '3rem 2rem', 
            textAlign: 'center', 
            background: isDragActive ? 'var(--bg-accent-soft)' : 'var(--bg-card)', 
            borderRadius: '12px', 
            border: '2px dashed var(--border-subtle)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '2rem'
          }}
        >
          <input {...getInputProps()} />
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
          {isDragActive ? (
            <p style={{ color: 'var(--accent)', fontWeight: '600' }}>Drop the PDF files here...</p>
          ) : (
            <>
              <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Drag & drop PDF files here, or click to select
              </p>
              <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem' }}>
                Select 2 or more PDF files to merge
              </p>
            </>
          )}
        </div>

        {files.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Selected Files ({files.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {files.map((file, index) => (
                <div 
                  key={`${file.name}-${index}`}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '0.75rem 1rem', 
                    background: 'var(--bg-card)', 
                    border: '1px solid var(--border-subtle)', 
                    borderRadius: '8px' 
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                    <span style={{ fontSize: '1.2rem' }}>📄</span>
                    <span style={{ 
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      fontSize: '0.95rem'
                    }}>
                      {file.name}
                    </span>
                    <span style={{ color: 'var(--text-soft)', fontSize: '0.8rem' }}>
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button 
                    onClick={() => removeFile(index)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#ff4d4f', 
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      padding: '0.2rem 0.5rem'
                    }}
                    title="Remove file"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {merging && <ProgressBar progress={progress} label="Merging PDFs..." />}

        <button
          onClick={mergePdfs}
          disabled={files.length < 2 || merging}
          className="btn-primary"
          style={{ 
            width: '100%', 
            padding: '1rem', 
            fontSize: '1.1rem', 
            fontWeight: '600',
            opacity: (files.length < 2 || merging) ? 0.6 : 1,
            cursor: (files.length < 2 || merging) ? 'not-allowed' : 'pointer'
          }}
        >
          {merging ? 'Merging...' : files.length < 2 ? 'Select at least 2 files' : 'Merge PDFs'}
        </button>
      </ToolShell>
      <ContentPageShell>
        <div className="seo-section">
          <h2>Merge PDFs Easily and Privately</h2>
          <p>Our PDF merge tool allows you to combine multiple documents into a single PDF file without uploading anything to a server. All processing happens directly in your browser, ensuring your sensitive data never leaves your device.</p>
          
          <h3>How to merge PDF files:</h3>
          <ol>
            <li>Select the PDF files you want to combine by dragging and dropping them or clicking the upload area.</li>
            <li>Review the list of selected files and remove any if necessary.</li>
            <li>Click the "Merge PDFs" button to start the process.</li>
            <li>The merged PDF will be automatically downloaded to your device.</li>
          </ol>
        </div>
      </ContentPageShell>
    </>
  );
}
