import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';
import heic2any from 'heic2any';
import ProgressBar from '../components/ProgressBar';
import SEO from '../components/SEO';

export default function HeicToJpg() {
  const [file, setFile] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const processImage = async (selectedFile) => {
    setFile(selectedFile);
    setLoading(true);
    try {
      const convertedBlob = await heic2any({
        blob: selectedFile,
        toType: "image/jpeg",
        quality: 0.9
      });
      const blobToUse = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      setResultUrl(URL.createObjectURL(blobToUse));
    } catch (error) {
      console.error(error);
      alert("Failed to convert HEIC. Ensure the file is a valid HEIC image.");
    } finally {
      setLoading(false);
    }
  };

  const seoData = {
    title: "iPhone HEIC to JPG Converter",
    intro: "Convert Apple's modern HEIC (High Efficiency Image Container) photos to universally compatible JPG format. HEIC is great for saving space on your iPhone, but it often causes compatibility issues when transferring photos to Windows PCs or older software.",
    whyUse: [
      "Open your iPhone photos on any Windows or Android device without extra software.",
      "Upload your high-efficiency photos to websites that only support JPG or PNG.",
      "Maintain the visual beauty of your shots while gaining universal compatibility.",
      "Quickly convert entire albums locally for sharing with friends and family."
    ],
    howItWorks: "This tool uses a powerful JavaScript library that runs directly in your browser. It decodes the HEVC (High Efficiency Video Coding) based image data inside the HEIC container and re-renders it as a high-quality JPG. This complex process is handled entirely on your local CPU.",
    bestResults: [
      "Keep in mind that HEIC files are very high resolution; large files may take a few seconds to decode.",
      "The conversion process is static—if you upload a 'Live Photo,' only the primary still image is converted.",
      "Ensure you use a modern browser (like Chrome or Safari) for the fastest decoding speeds."
    ],
    faqs: [
      { q: "Is HEIC better than JPG?", a: "Technically, yes. HEIC offers similar image quality at about half the file size. However, it lacks the 30-year history of universal support that JPG enjoys." },
      { q: "Why does it take longer than PNG conversion?", a: "HEIC is a highly compressed format that requires intensive mathematical decoding (using HEVC) before it can be converted, which is more demanding on your processor." },
      { q: "Are my photos uploaded to a server?", a: "No. Your sensitive personal photos never leave your device. The decoding and encoding happen in your browser's private memory." },
      { q: "Can I convert HEIF files too?", a: "Yes, HEIF is the base standard for HEIC, and this tool supports both extensions." },
      { q: "Is there a file size limit?", a: "There is no hard limit, but very large images might temporarily freeze older browsers during the intensive decoding phase." }
    ],
    relatedTools: [
      { name: "PNG to JPG", path: "/online-png-to-jpg" },
      { name: "WEBP to JPG", path: "/convert-webp-to-jpg" },
      { name: "Image to PDF", path: "/make-image-to-pdf" }
    ],
    slug: "convert-heic-to-jpg"
  };

  return (
    <>
      <SEO 
        title="HEIC to JPG Converter | ImageConverter"
        description="Convert HEIC iPhone photos to JPG instantly online. Fast browser-based conversion with no uploads stored and no software installation required."
        path="/convert-heic-to-jpg"
      />
      <ToolShell 
        title="Convert HEIC to JPG" 
        description="Easily change Apple iPhone HEIC photos to standard JPG format. Processed safely on your device."
        seoData={seoData}
        canonicalPath="/convert-heic-to-jpg"
      >
        {!resultUrl ? (
          loading ? (
            <div style={{padding: '3rem', textAlign: 'center'}}>
              <h3>Processing...</h3>
              <ProgressBar progress={100} text="Decoding HEIC file locally" />
            </div>
          ) : (
            <FileDrop onFileSelect={processImage} accept=".heic, .heif" />
          )
        ) : (
          <div className="result-area">
            <h3>Converted to JPG!</h3>
            <img src={resultUrl} alt="Preview" />
            <div className="btn-group">
              <a href={resultUrl} download={file.name.replace(/\.heic$/i, '.jpg')} className="btn btn-primary">
                Download JPG
              </a>
              <button onClick={() => {setFile(null); setResultUrl(null)}} className="btn btn-secondary">
                Convert Another
              </button>
            </div>
          </div>
        )}
      </ToolShell>
    </>
  );
}
