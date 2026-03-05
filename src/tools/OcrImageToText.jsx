import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';
import Tesseract from 'tesseract.js';
import ProgressBar from '../components/ProgressBar';
import SEO from '../components/SEO';

const LANGUAGES = [
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
  const [lang, setLang] = useState('eng');

  const processImage = async (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setIsProcessing(true);
    setText('');
    setProgress(0);
    
    try {
      const result = await Tesseract.recognize(
        selectedFile,
        lang,
        {
          logger: m => {
            setStatus(m.status);
            if (m.status === 'recognizing text') {
              setProgress(m.progress * 100);
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
            <div className="form-group" style={{maxWidth: '300px', margin: '0 auto 2rem auto'}}>
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
          <div style={{padding: '3rem', textAlign: 'center'}}>
            <h3>Extracting Text...</h3>
            <p style={{color: 'var(--text-light)', marginBottom: '1rem'}}>{status}</p>
            <ProgressBar progress={progress} text="Running local Tesseract engine" />
          </div>
        ) : (
          <div className="result-area">
            <h3>Extraction Complete</h3>
            <textarea 
              className="form-input" 
              rows="10" 
              value={text} 
              readOnly 
              style={{marginTop: '1rem', marginBottom: '1rem', resize: 'vertical'}}
            ></textarea>
            <div className="btn-group">
              <button onClick={() => navigator.clipboard.writeText(text)} className="btn btn-primary">
                Copy Text
              </button>
              <button onClick={() => {setFile(null); setText('');}} className="btn btn-secondary">
                Extract Another
              </button>
            </div>
          </div>
        )}
      </ToolShell>
    </>
  );
}
