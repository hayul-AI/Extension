import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';

export default function JpgToPng() {
  const [file, setFile] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  const processImage = (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setResultUrl(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const seoData = {
    what: "This tool transforms JPG (or JPEG) images into PNG format. PNG is a lossless format, making it ideal for images requiring pristine quality.",
    how: "Your browser leverages local HTML5 rendering APIs to read the JPG pixels and repackage them into a lossless PNG container, bypassing the need for cloud servers.",
    example: "You want to edit a photo heavily and need a lossless format to prevent degradation during multiple saves. Converting the starting JPG to PNG is the first step.",
    interpretation: "The new file is a PNG image. It will look exactly like the original JPG, but the file size will typically be larger due to the lossless nature of the PNG format.",
    faqs: [
      { q: "Does converting to PNG improve the quality?", a: "No. Converting a lossy JPG to a lossless PNG cannot restore details that were already lost in the JPG compression. It simply prevents further loss if you edit the new file." },
      { q: "Why is the output file so much larger?", a: "JPG uses complex algorithms to discard imperceptible data and shrink file size. PNG stores the exact pixel data, which takes up more space." },
      { q: "Are my images safe?", a: "Absolutely. Everything happens in your browser's local memory. We don't have access to your files." }
    ]
  };

  return (
    <ToolShell 
      title="Convert JPG to PNG" 
      description="Instantly turn JPG photos into lossless PNG images. 100% private and offline."
      seoData={seoData}
      canonicalPath="/online-jpg-to-png"
    >
      {!resultUrl ? (
        <FileDrop onFileSelect={processImage} accept="image/jpeg, image/jpg" />
      ) : (
        <div className="result-area">
          <h3>Converted to PNG!</h3>
          <img src={resultUrl} alt="Preview" style={{maxHeight: '300px'}} />
          <div>
            <a href={resultUrl} download={file.name.replace(/\.jpe?g$/i, '.png')} className="btn">
              Download PNG
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