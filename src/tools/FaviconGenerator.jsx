import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ProgressBar from '../components/ProgressBar';

export default function FaviconGenerator() {
  const [isGenerating, setIsProcessing] = useState(false);

  const processImage = async (file) => {
    setIsProcessing(true);
    const zip = new JSZip();
    const sizes = [16, 32, 48, 64, 128, 180, 192, 512];
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const img = new Image();
      img.onload = async () => {
        for (let size of sizes) {
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, size, size);
          
          const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
          zip.file(`favicon-${size}x${size}.png`, blob);
          if (size === 180) zip.file('apple-touch-icon.png', blob);
        }
        
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "favicon_pack.zip");
        setIsProcessing(false);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const seoData = {
    title: "Website Favicon Pack Generator",
    intro: "Create a complete, cross-browser compatible favicon package for your website in seconds. A single upload is all it takes to generate every standard icon size needed for modern browsers, iOS devices, and Android home screens.",
    whyUse: [
      "Generate all essential icon sizes (16x16 to 512x512) in one click.",
      "Ensure your website looks professional on iPhone and Android bookmarks.",
      "Save time by automating the resizing process for multiple platforms.",
      "Maintain absolute privacy by generating your site's icons locally."
    ],
    howItWorks: "Our utility handles all image resizing using your browser's native rendering engine. It creates multiple virtual canvases, resamples your original logo to the necessary dimensions, and then bundles all files into a structured ZIP archive using the JSZip library—all without ever leaving your machine.",
    bestResults: [
      "Use a square original image (1:1 aspect ratio) for the cleanest icons.",
      "We recommend uploading a high-resolution file (at least 512x512 pixels).",
      "Check the included 'apple-touch-icon.png' for iOS-specific compatibility."
    ],
    faqs: [
      { q: "Which icon sizes are included in the ZIP?", a: "The pack includes 16x16, 32x32, 48x48, 64x64, 128x128, 180x180, 192x192, and 512x512 pixel PNG files." },
      { q: "Is the 'favicon.ico' format included?", a: "The pack currently provides modern PNG variants which are now the preferred standard for most websites. For legacy IE support, you can rename the 32x32 PNG to favicon.ico." },
      { q: "Will my icons have a transparent background?", a: "If your original upload has a transparent background (like a PNG or WebP), the generated icons will also maintain that transparency." },
      { q: "Are my logos safe?", a: "Yes. All icon generation happens in your browser's private memory. No images are uploaded to any cloud server." },
      { q: "What is the apple-touch-icon.png for?", a: "This is a specific icon size (180x180) required by iOS devices to show a high-quality icon when a user adds your site to their home screen." }
    ],
    relatedTools: [
      { name: "Resize & Crop", path: "/image-resize-and-crop" },
      { name: "PNG to JPG", path: "/online-png-to-jpg" },
      { name: "Dominant Color Palette", path: "/get-color-palette" }
    ],
    slug: "generate-favicon-now"
  };

  return (
    <ToolShell 
      title="Favicon Generator" 
      description="Create multi-size favicon packs for your websites."
      seoData={seoData}
      canonicalPath="/generate-favicon-now"
    >
      {isGenerating ? (
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