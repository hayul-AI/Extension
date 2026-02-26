import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';

export default function RemoveExif() {
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
        
        const dataUrl = canvas.toDataURL(selectedFile.type || 'image/jpeg', 1.0);
        setResultUrl(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const seoData = {
    what: "Our EXIF Metadata Remover completely erases hidden data embedded in your photos, such as GPS location, camera model, date/time, and exposure settings.",
    how: "The tool works by reading the image pixels directly into your browser's memory using a Canvas element, and then redrawing it. Since it only copies the visible pixels and ignores the file's header metadata, the resulting image is 100% EXIF-free. No data is ever uploaded to a server.",
    example: "If you take a photo with your smartphone, it likely contains your exact GPS coordinates. Before posting it to a public forum, use this tool to strip the location data, ensuring your home or current whereabouts remain private.",
    interpretation: "The downloaded file will look identical to the original image but will have a slightly different file size. If you inspect the properties of the new file, fields like 'Location' and 'Camera Make' will be completely blank.",
    faqs: [
      { q: "Is the image quality reduced?", a: "No. The tool uses a 100% quality setting when redrawing the pixels, so there is virtually no loss in visual quality for standard formats." },
      { q: "Can this process be reversed?", a: "No. Once the EXIF data is stripped and you download the new file, the metadata is permanently gone from that specific copy." },
      { q: "Is it safe to use for sensitive photos?", a: "Yes. The processing is entirely local. We have no backend servers receiving your files, so your photos cannot be intercepted or viewed by us." }
    ]
  };

  return (
    <ToolShell 
      title="EXIF Metadata Remover" 
      description="Securely strip GPS location, camera details, and hidden metadata from your photos without uploading them."
      seoData={seoData}
      canonicalPath="/tool-remove-exif"
    >
      {!resultUrl ? (
        <FileDrop onFileSelect={processImage} accept="image/*" />
      ) : (
        <div className="result-area">
          <h3>EXIF Data Removed Successfully!</h3>
          <img src={resultUrl} alt="Preview" style={{maxHeight: '300px'}} />
          <div>
            <a href={resultUrl} download={`cleaned_${file.name}`} className="btn">
              Download Clean Image
            </a>
            <button onClick={() => {setFile(null); setResultUrl(null)}} className="btn" style={{background: 'var(--text-light)', marginLeft: '1rem'}}>
              Process Another
            </button>
          </div>
        </div>
      )}
    </ToolShell>
  );
}