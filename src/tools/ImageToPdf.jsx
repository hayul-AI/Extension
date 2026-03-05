import React, { useState, useCallback, useEffect, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';
import ProgressBar from '../components/ProgressBar';

export default function ImageToPdf() {
  const [files, setFiles] = useState([]); // [{ id, file, previewUrl }]
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Options
  const [pageSize, setPageSize] = useState('auto'); // auto, a4
  const [margin, setMargin] = useState('none'); // none, small
  const [fitMode, setFitMode] = useState('fit'); // fit, fill
  const [quality, setQuality] = useState('high'); // high, balanced, small

  const draggedItemIndex = useRef(null);

  const handleFileSelect = (newFiles) => {
    const incoming = Array.isArray(newFiles) ? newFiles : [newFiles];
    const validImages = incoming.filter(f => f.type.startsWith('image/'));
    
    const mapped = validImages.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      previewUrl: URL.createObjectURL(file)
    }));
    
    setFiles(prev => [...prev, ...mapped]);
  };

  const removeFile = (id) => {
    setFiles(prev => {
      const filtered = prev.filter(f => f.id !== id);
      const removed = prev.find(f => f.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return filtered;
    });
  };

  // Drag & Drop Reorder
  const onDragStart = (e, index) => {
    draggedItemIndex.current = index;
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e, index) => {
    e.preventDefault();
  };

  const onDrop = (e, index) => {
    e.preventDefault();
    const targetIndex = index;
    const startIndex = draggedItemIndex.current;
    if (startIndex === targetIndex) return;

    const newList = [...files];
    const [movedItem] = newList.splice(startIndex, 1);
    newList.splice(targetIndex, 0, movedItem);
    setFiles(newList);
    draggedItemIndex.current = null;
  };

  const generatePdf = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setProgress(10);

    try {
      const pdfDoc = await PDFDocument.create();
      const qualityMap = { high: 0.92, balanced: 0.82, small: 0.65 };
      const marginPoints = margin === 'small' ? 24 : 0;
      
      for (let i = 0; i < files.length; i++) {
        const { file } = files[i];
        
        // Load image
        const img = new Image();
        const dataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
        
        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = dataUrl;
        });

        // Determine Page Size
        let pWidth, pHeight;
        if (pageSize === 'a4') {
          pWidth = 595.28; // points
          pHeight = 841.89;
        } else {
          // Auto: use image dimensions (px to pt approximation 1:1 for simplicity or 0.75)
          // We use 0.75pt per pixel as a standard 96dpi to 72pt conversion
          pWidth = img.width * 0.75;
          pHeight = img.height * 0.75;
        }

        const page = pdfDoc.addPage([pWidth, pHeight]);
        
        const contentWidth = pWidth - (marginPoints * 2);
        const contentHeight = pHeight - (marginPoints * 2);

        // Draw to canvas for resizing/cropping
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Target canvas size based on content area points (scaled back to px for quality)
        // We'll use a high density for the canvas to keep quality
        const scaleFactor = 2; 
        canvas.width = contentWidth * scaleFactor;
        canvas.height = contentHeight * scaleFactor;

        if (fitMode === 'fit') {
          // Contain
          const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
          const drawW = img.width * ratio;
          const drawH = img.height * ratio;
          const offsetX = (canvas.width - drawW) / 2;
          const offsetY = (canvas.height - drawH) / 2;
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        } else {
          // Cover (Fill)
          const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
          const drawW = img.width * ratio;
          const drawH = img.height * ratio;
          const offsetX = (canvas.width - drawW) / 2;
          const offsetY = (canvas.height - drawH) / 2;
          ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        }

        const jpgDataUrl = canvas.toDataURL('image/jpeg', qualityMap[quality]);
        const jpgImage = await pdfDoc.embedJpg(jpgDataUrl);
        
        page.drawImage(jpgImage, {
          x: marginPoints,
          y: marginPoints,
          width: contentWidth,
          height: contentHeight,
        });

        setProgress(10 + Math.round(((i + 1) / files.length) * 80));
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `images-to-pdf-${Date.now()}.pdf`;
      link.click();
      
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setProgress(100);
    } catch (e) {
      console.error(e);
      alert("Error generating PDF. Please try again.");
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      files.forEach(f => URL.revokeObjectURL(f.previewUrl));
    };
  }, []);

  const seoData = {
    title: "Image to PDF Converter",
    intro: "Transform your photos and graphics into a single, organized PDF document directly in your browser. Our professional-grade utility offers precise control over page sizes, margins, and output quality without ever uploading your files to a server.",
    whyUse: [
      "Combine multiple JPG, PNG, or WebP images into one shareable document.",
      "Support for standard A4 formatting or automatic image-based sizing.",
      "Control margins and image fit modes for a polished, professional look.",
      "Adjust output quality to balance between visual clarity and file size."
    ],
    howItWorks: "Using the powerful pdf-lib library and HTML5 Canvas, your browser processes each image locally. It calculates the correct scaling, applies your chosen fit mode (Fit or Fill), and embeds the data into a binary PDF structure. Everything stays within your device's memory for absolute privacy.",
    bestResults: [
      "For documents, use 'A4' page size and 'Fit' mode to avoid cropping text.",
      "Use 'Fill' mode for photo albums to create borderless, full-page spreads.",
      "Reorder your pages easily by dragging the thumbnails before clicking 'Create PDF'.",
      "Choose 'Small' quality if you need to meet strict email attachment limits."
    ],
    faqs: [
      { q: "Is my data secure?", a: "Yes. This tool is 100% serverless. Your images are never transmitted or stored outside your own computer." },
      { q: "How many images can I add?", a: "There is no fixed limit, but adding dozens of high-resolution images may require significant RAM." },
      { q: "What is the difference between Fit and Fill?", a: "'Fit' ensures the entire image is visible without cropping. 'Fill' expands the image to cover the entire page area, which may crop the edges." },
      { q: "Does it support transparent PNGs?", a: "Yes, but since PDF images are embedded as JPGs for compatibility, transparent areas will appear white." },
      { q: "Can I reorder pages after uploading?", a: "Absolutely. Simply drag and drop the thumbnails in the preview grid to set your desired order." },
      { q: "Which page sizes are supported?", a: "We support 'Auto' (which matches the image size) and standard 'A4' (portrait)." }
    ],
    relatedTools: [
      { name: "PNG to JPG", path: "/online-png-to-jpg" },
      { name: "Resize & Crop", path: "/image-resize-and-crop" },
      { name: "OCR Text Extraction", path: "/extract-text-from-image" },
      { name: "EXIF Remover", path: "/tool-remove-exif" }
    ],
    slug: "image-to-pdf"
  };

  return (
    <ToolShell 
      title="Image to PDF" 
      description="Turn multiple images into a single professional PDF with A4 support and margin control."
      seoData={seoData}
      canonicalPath="/tools/image-to-pdf"
    >
      <div className="pdf-tool-container">
        <div className="pdf-config-zone">
          <div className="content-card" style={{padding: '1.5rem', marginBottom: '1.5rem'}}>
            <h3 style={{marginBottom: '1rem'}}>PDF Options</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem'}}>
              <div className="form-group">
                <label>Page Size</label>
                <select value={pageSize} onChange={e => setPageSize(e.target.value)}>
                  <option value="auto">Auto (Image Size)</option>
                  <option value="a4">Standard A4</option>
                </select>
              </div>
              <div className="form-group">
                <label>Margins</label>
                <select value={margin} onChange={e => setMargin(e.target.value)}>
                  <option value="none">None</option>
                  <option value="small">Small (24pt)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fit Mode</label>
                <select value={fitMode} onChange={e => setFitMode(e.target.value)}>
                  <option value="fit">Fit (Contain)</option>
                  <option value="fill">Fill (Crop to Page)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quality</label>
                <select value={quality} onChange={e => setQuality(e.target.value)}>
                  <option value="high">High (Best)</option>
                  <option value="balanced">Balanced</option>
                  <option value="small">Small (Compressed)</option>
                </select>
              </div>
            </div>
          </div>

          <FileDrop onFileSelect={handleFileSelect} accept="image/*" multiple={true} />
          
          {files.length > 0 && (
            <button 
              onClick={generatePdf} 
              className="btn btn-primary" 
              disabled={isProcessing}
              style={{marginTop: '1.5rem', height: '56px', fontSize: '1.1rem'}}
            >
              {isProcessing ? 'Creating PDF...' : `Create PDF (${files.length} Pages)`}
            </button>
          )}
          
          {isProcessing && <ProgressBar progress={progress} text="Generating your document locally" />}
        </div>

        {files.length > 0 && (
          <div className="pdf-preview-zone" style={{marginTop: '3rem'}}>
            <h3 style={{marginBottom: '1.5rem', textAlign: 'center'}}>Preview & Reorder Pages</h3>
            <div className="thumbnail-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '1rem'
            }}>
              {files.map((item, index) => (
                <div 
                  key={item.id}
                  className="thumb-card"
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragOver={(e) => onDragOver(e, index)}
                  onDrop={(e) => onDrop(e, index)}
                  style={{
                    position: 'relative',
                    aspectRatio: '1/1.4',
                    background: 'var(--card)',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                    cursor: 'grab'
                  }}
                >
                  <img 
                    src={item.previewUrl} 
                    alt={`Page ${index + 1}`}
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    background: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    fontSize: '0.7rem',
                    padding: '4px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {index + 1}. {item.file.name}
                  </div>
                  <button 
                    onClick={() => removeFile(item.id)}
                    style={{
                      position: 'absolute',
                      top: '4px', right: '4px',
                      width: '24px', height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ef4444',
                      fontWeight: 'bold'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {files.length > 12 && (
              <p style={{textAlign: 'center', marginTop: '1rem', color: 'var(--text-soft)', fontSize: '0.9rem'}}>
                + {files.length - 12} more images
              </p>
            )}
          </div>
        )}
      </div>
    </ToolShell>
  );
}