import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ProgressBar from '../components/ProgressBar';

export default function FaviconGenerator() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  const processImage = async (selectedFile) => {
    setFile(selectedFile);
    setProcessing(true);
    
    try {
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(selectedFile);
      });

      const img = new Image();
      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = dataUrl;
      });

      const sizes = [16, 32, 48, 192, 512];
      const zip = new JSZip();

      sizes.forEach(size => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);
        
        const base64 = canvas.toDataURL('image/png').split(',')[1];
        zip.file(`favicon-${size}x${size}.png`, base64, {base64: true});
        
        if (size === 32) {
          zip.file(`favicon.ico`, base64, {base64: true}); // Approximation for ICO
        }
      });

      const content = await zip.generateAsync({type: 'blob'});
      saveAs(content, 'favicons.zip');
    } catch (e) {
      console.error(e);
      alert("Failed to generate favicons");
    } finally {
      setProcessing(false);
      setFile(null); // reset UI
    }
  };

  const seoData = {
    what: "This tool takes a standard image (like a PNG or JPG) and generates a zip file containing various sizes required for website favicons (the tiny icon in the browser tab).",
    how: "The browser uses HTML5 Canvas to resize your uploaded image into multiple standard dimensions (16x16, 32x32, 192x192, etc.). It then packages these resized images into a ZIP file using a local JavaScript library.",
    example: "You designed a new logo for your website. Upload the square version here, and instantly download a ZIP file containing the `favicon.ico` and PNG formats needed for all modern browsers and devices.",
    interpretation: "You will receive a ZIP file download. Extract it and place the files in the root directory of your website.",
    faqs: [
      { q: "What sizes are generated?", a: "We typically generate 16x16, 32x32, 48x48, 192x192, and 512x512 pixels to cover standard browsers and Android/iOS home screens." },
      { q: "Does the image need to be square?", a: "Yes, for best results, upload a square image. Non-square images will be squashed to fit the square dimensions of a favicon." },
      { q: "Is the generated ICO file a true ICO format?", a: "For simplicity and maximum browser compatibility, our generator typically outputs a 32x32 PNG disguised as an ICO, which modern browsers natively support." }
    ]
  };

  return (
    <ToolShell 
      title="Favicon Generator" 
      description="Create a complete package of favicon sizes for your website from a single image."
      seoData={seoData}
      canonicalPath="/generate-favicon-now"
    >
      {processing ? (
        <div style={{padding: '3rem', textAlign: 'center'}}>
          <h3>Generating Icons & Packaging ZIP...</h3>
          <ProgressBar progress={100} />
        </div>
      ) : (
        <FileDrop onFileSelect={processImage} accept="image/*" />
      )}
    </ToolShell>
  );
}