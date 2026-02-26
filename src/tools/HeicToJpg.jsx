import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';
import heic2any from 'heic2any';
import ProgressBar from '../components/ProgressBar';

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
    what: "Converts Apple's high-efficiency HEIC photo format into standard JPGs, ensuring compatibility with older devices, Windows PCs, and websites.",
    how: "We use a specialized JavaScript library (heic2any) that decodes the HEIC file locally within your browser. It parses the HEVC video stream inside the file and paints it to a canvas before exporting it as a standard JPG.",
    example: "You transferred photos from your iPhone to your Windows computer, but they won't open. Use this tool to quickly make them viewable JPGs.",
    interpretation: "The result is a universally compatible JPG file. Visual quality is preserved, and you can now open the image in any standard photo viewer.",
    faqs: [
      { q: "Is HEIC better than JPG?", a: "HEIC generally offers better compression, meaning higher quality at half the file size. However, it lacks the universal compatibility of JPG." },
      { q: "Why does it take a few seconds?", a: "HEIC decoding is computationally heavy. Since it's running directly on your device's processor rather than a massive cloud server, it might take a moment depending on your hardware." },
      { q: "Do I lose Live Photo functionality?", a: "Yes. JPG is a static image format. The video component of an iOS Live Photo is discarded during conversion." }
    ]
  };

  return (
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
          <img src={resultUrl} alt="Preview" style={{maxHeight: '300px'}} />
          <div>
            <a href={resultUrl} download={file.name.replace(/\.heic$/i, '.jpg')} className="btn">
              Download JPG
            </a>
            <button onClick={() => {setFile(null); setResultUrl(null)}} className="btn" style={{background: 'var(--text-light)', marginLeft: '1rem'}}>
              Convert Another
            </button>
          </div>
        </div>
      )}
    </ToolShell>
  );
}