import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';
import Tesseract from 'tesseract.js';
import ProgressBar from '../components/ProgressBar';

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
    what: "Our Optical Character Recognition (OCR) tool analyzes images containing text (like scanned documents or screenshots) and extracts the text into a selectable, editable format.",
    how: "This tool loads a compiled WebAssembly version of the famous Tesseract OCR engine directly into your browser. The intensive pattern-recognition algorithms run locally using your device's CPU. No text or images are sent to the cloud.",
    example: "You have a screenshot of an error message or a scanned PDF of a book page. Upload it here, and you can easily copy-paste the text instead of typing it out manually.",
    interpretation: "The output is raw text displayed in a text box. You can copy it to your clipboard for use in word processors or emails.",
    faqs: [
      { q: "Is the extraction 100% accurate?", a: "OCR accuracy depends heavily on the image quality, font size, and contrast. Blurry or handwritten text will have higher error rates than a crisp screenshot of digital text." },
      { q: "Are other languages supported?", a: "Yes, you can select from various languages in the dropdown before uploading your image to load the correct language model." },
      { q: "Why does it take a while to process?", a: "Because OCR involves complex machine learning algorithms running entirely on your local device, it may take a few seconds depending on your processor's speed and the size of the image." }
    ]
  };

  return (
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
          <div>
            <button onClick={() => navigator.clipboard.writeText(text)} className="btn">
              Copy Text
            </button>
            <button onClick={() => {setFile(null); setText('');}} className="btn" style={{background: 'var(--text-light)', marginLeft: '1rem'}}>
              Extract Another
            </button>
          </div>
        </div>
      )}
    </ToolShell>
  );
}