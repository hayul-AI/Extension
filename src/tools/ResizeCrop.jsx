import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';

export default function ResizeCrop() {
  const [file, setFile] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [resultUrl, setResultUrl] = useState(null);

  const processImage = (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImgData(img);
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleResize = () => {
    if (!imgData) return;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgData, 0, 0, width, height);
    setResultUrl(canvas.toDataURL(file.type || 'image/jpeg'));
  };

  const seoData = {
    what: "This tool allows you to change the dimensions (width and height) of an image instantly in your browser.",
    how: "By loading the image onto an HTML5 Canvas, the browser's native rendering engine resamples the pixels to fit your specified dimensions before exporting the new file.",
    example: "You have a 4000x3000 photo that is 5MB in size, but you need a 800x600 version for a blog post. Use this tool to shrink the dimensions, which also massively reduces the file size.",
    interpretation: "The downloaded file will have the exact pixel dimensions you typed. Note that changing the aspect ratio might stretch or squash the image.",
    faqs: [
      { q: "Will my image look stretched?", a: "If you change the width and height independently without maintaining the original aspect ratio, the image will appear distorted." },
      { q: "Is the file size reduced?", a: "Yes, reducing the pixel dimensions generally results in a smaller file size." },
      { q: "Are the images uploaded securely?", a: "No images are uploaded at all. The resizing happens solely via your device's processor." }
    ]
  };

  return (
    <ToolShell 
      title="Image Resize & Crop" 
      description="Quickly resize your images to specific pixel dimensions locally."
      seoData={seoData}
      canonicalPath="/image-resize-and-crop"
    >
      {!imgData ? (
        <FileDrop onFileSelect={processImage} accept="image/*" />
      ) : !resultUrl ? (
        <div className="result-area">
          <h3>Original Size: {imgData.width} x {imgData.height}</h3>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', margin: '2rem 0'}}>
            <div className="form-group" style={{marginBottom: 0}}>
              <label>Width (px)</label>
              <input type="number" className="form-input" value={width} onChange={e => setWidth(Number(e.target.value))} />
            </div>
            <div className="form-group" style={{marginBottom: 0}}>
              <label>Height (px)</label>
              <input type="number" className="form-input" value={height} onChange={e => setHeight(Number(e.target.value))} />
            </div>
          </div>
          <button onClick={handleResize} className="btn">Apply Resize</button>
        </div>
      ) : (
        <div className="result-area">
          <h3>Resized Successfully!</h3>
          <img src={resultUrl} alt="Preview" style={{maxHeight: '300px'}} />
          <div>
            <a href={resultUrl} download={`resized_${file.name}`} className="btn">
              Download Image
            </a>
            <button onClick={() => {setImgData(null); setResultUrl(null)}} className="btn" style={{background: 'var(--text-light)', marginLeft: '1rem'}}>
              Start Over
            </button>
          </div>
        </div>
      )}
    </ToolShell>
  );
}