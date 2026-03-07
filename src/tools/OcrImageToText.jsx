import React, { useState, useRef, useEffect } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';
import Tesseract from 'tesseract.js';
import ProgressBar from '../components/ProgressBar';
import SEO from '../components/SEO';

const LANGUAGES = [
  { code: 'eng+kor', name: 'Korean + English (Auto)' },
  { code: 'eng', name: 'English' },
  { code: 'spa', name: 'Spanish' },
  { code: 'fra', name: 'French' },
  { code: 'deu', name: 'German' },
  { code: 'ita', name: 'Italian' },
  { code: 'por', name: 'Portuguese' },
  { code: 'kor', name: 'Korean' },
  { code: 'jpn', name: 'Japanese' },
  { code: 'chi_sim', name: 'Chinese (Simplified)' },
  { code: 'chi_tra', name: 'Chinese (Traditional)' },
  { code: 'rus', name: 'Russian' },
  { code: 'hin', name: 'Hindi' },
  { code: 'ara', name: 'Arabic' },
];

export default function OcrImageToText() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lang, setLang] = useState('eng+kor');
  const [previewUrl, setPreviewUrl] = useState('');
  const [scale, setScale] = useState(1);
  const imageContainerRef = useRef(null);

  // Drag to pan state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    const handleWheelNative = (e) => {
      e.preventDefault(); // Prevent native scrolling

      setScale(prev => {
        // Use a multiplier for smooth, relative zooming
        const sensitivity = 0.001;
        const multiplier = 1 - (e.deltaY * sensitivity);
        let newScale = prev * multiplier;

        // Boundaries
        if (newScale > 5) newScale = 5;
        if (newScale < 0.1) newScale = 0.1;

        return newScale;
      });
    };

    // Use native event listener for passive: false
    container.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => container.removeEventListener('wheel', handleWheelNative);
  }, [previewUrl]); // re-bind when preview becomes available


  const preprocessImage = (fileToProcess) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');

          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Enhanced Contrast and Grayscale filter
          const contrast = 1.3; // Increase contrast by 30%
          const intercept = 128 * (1 - contrast);

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Grayscale extraction
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;

            // Contrast adjustment
            let finalColor = gray * contrast + intercept;
            if (finalColor > 255) finalColor = 255;
            if (finalColor < 0) finalColor = 0;

            data[i] = finalColor;
            data[i + 1] = finalColor;
            data[i + 2] = finalColor;
          }

          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(fileToProcess);
    });
  };

  const processImage = async (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setScale(1); // Reset zoom
    setIsProcessing(true);
    setText('');
    setProgress(0);

    try {
      setStatus('Preprocessing image to enhance accuracy...');
      setProgress(5);
      const preprocessedDataUrl = await preprocessImage(selectedFile);

      const result = await Tesseract.recognize(
        preprocessedDataUrl,
        lang,
        {
          logger: m => {
            setStatus(m.status);
            if (m.status === 'recognizing text') {
              setProgress(5 + (m.progress * 95));
            }
          }
        }
      );
      setText(result.data.text);
    } catch (e) {
      console.error(e);
      setText("An error occurred during text extraction.");
    } finally {
      setIsProcessing(false);
    }
  };

  const seoData = {
    title: "OCR Image to Text Extractor",
    intro: "Convert any image containing text into editable, selectable digital text instantly. Our high-performance OCR (Optical Character Recognition) utility is perfect for digitizing scanned documents, notes, or extracting text from screenshots without manual typing.",
    whyUse: [
      "Instantly digitize paper documents and handwritten notes.",
      "Extract error messages or data from software screenshots.",
      "Support for 10+ global languages for accurate recognition.",
      "Save hours of manual data entry by automating text extraction."
    ],
    howItWorks: "This tool runs a WebAssembly port of the industry-standard Tesseract OCR engine. When you upload an image, your browser's CPU analyzes the visual patterns of letters and symbols to reconstruct them as digital strings. This intensive calculation is performed locally, meaning your text is never sent to a third-party server.",
    bestResults: [
      "Use high-contrast images with clear, upright text for maximum accuracy.",
      "Select the correct document language from the dropdown before processing.",
      "Ensure the image is not blurry or significantly rotated."
    ],
    faqs: [
      { q: "Is the text extraction 100% accurate?", a: "OCR accuracy depends on image quality. While digital screenshots are often 99%+ accurate, blurry photos or complex fonts may require minor manual corrections." },
      { q: "Can I extract text from a PDF?", a: "This utility currently focuses on image formats (JPG, PNG, WebP). To extract from PDF, you should convert the PDF page to an image first." },
      { q: "Are my sensitive documents private?", a: "Yes. Because the recognition logic is executed in your local browser environment, your documents and the extracted text stay exclusively on your device." },
      { q: "How many languages are supported?", a: "We currently support 13 major languages, including English, Korean, Spanish, Chinese, and Arabic." },
      { q: "Why does the first extraction take a few seconds?", a: "On the first use, your browser needs to download the specific language model data. After that, subsequent extractions will be much faster." }
    ],
    relatedTools: [
      { name: "Image to PDF", path: "/make-image-to-pdf" },
      { name: "EXIF Remover", path: "/tool-remove-exif" },
      { name: "Color Palette", path: "/get-color-palette" }
    ],
    slug: "extract-text-from-image"
  };

  return (
    <>
      <SEO
        title="Image to Text Converter (OCR) | ImageConverter"
        description="Extract editable text from images using online OCR. Works with screenshots, scanned documents, and photos directly in your browser."
        path="/extract-text-from-image"
      />
      <ToolShell
        title="OCR Image to Text Extractor"
        description="Extract text from images locally. Secure, accurate, and supports multiple languages."
        seoData={seoData}
        canonicalPath="/extract-text-from-image"
      >
        {!isProcessing && !text ? (
          <>
            <div className="form-group" style={{ maxWidth: '300px', margin: '0 auto 2rem auto' }}>
              <label>Select Document Language</label>
              <select className="form-input" value={lang} onChange={e => setLang(e.target.value)}>
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>{l.name} ({l.code})</option>
                ))}
              </select>
            </div>
            <FileDrop onFileSelect={processImage} accept="image/*" />
          </>
        ) : isProcessing ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h3>Extracting Text...</h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>{status}</p>
            <ProgressBar progress={progress} text="Running local Tesseract engine" />
          </div>
        ) : (
          <div className="result-area" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {/* Image Preview Area */}
            <div style={{ flex: '1 1 350px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Original Image</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-soft)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span>{Math.round(scale * 100)}%</span>
                  <button onClick={() => setScale(prev => Math.max(prev - 0.2, 0.1))} className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem', minWidth: '30px' }}>-</button>
                  <button onClick={() => setScale(prev => Math.min(prev + 0.2, 5))} className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem', minWidth: '30px' }}>+</button>
                  <button onClick={() => setScale(1)} className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>Reset</button>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)', marginBottom: '0.5rem' }}>Use mouse wheel to zoom, click & drag to pan.</p>
              <div
                ref={imageContainerRef}
                onMouseDown={(e) => {
                  setIsDragging(true);
                  setDragStart({ x: e.pageX, y: e.pageY });
                  setScrollStart({ left: imageContainerRef.current.scrollLeft, top: imageContainerRef.current.scrollTop });
                }}
                onMouseLeave={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}
                onMouseMove={(e) => {
                  if (!isDragging) return;
                  e.preventDefault();
                  const dx = e.pageX - dragStart.x;
                  const dy = e.pageY - dragStart.y;
                  imageContainerRef.current.scrollLeft = scrollStart.left - dx;
                  imageContainerRef.current.scrollTop = scrollStart.top - dy;
                }}
                style={{
                  marginTop: '0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-card)',
                  backgroundColor: 'var(--bg-color)',
                  flexGrow: 1,
                  minHeight: '600px',
                  overflow: 'auto',
                  position: 'relative',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  // Hide scrollbars for a cleaner drag experience
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                <div style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                  minWidth: '100%',
                  minHeight: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '1rem',
                  pointerEvents: 'none' // Prevent image drag conflict
                }}>
                  <img src={previewUrl} alt="Uploaded for OCR" draggable="false" style={{ maxWidth: '100%', objectFit: 'contain' }} />
                </div>
              </div>
            </div>

            {/* Text Edit Area */}
            <div style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <h3>Extraction Complete (Editable)</h3>
              <textarea
                className="form-input"
                rows="18"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Extracted text will appear here. You can manually correct any mistakes."
                style={{ marginTop: '1rem', marginBottom: '1rem', resize: 'vertical', flexGrow: 1 }}
              ></textarea>
              <div className="btn-group">
                <button onClick={() => navigator.clipboard.writeText(text)} className="btn btn-primary">
                  Copy Text
                </button>
                <button onClick={() => { setFile(null); setText(''); setPreviewUrl(''); }} className="btn btn-secondary">
                  Extract Another
                </button>
              </div>
            </div>
          </div>
        )}
      </ToolShell>
    </>
  );
}
