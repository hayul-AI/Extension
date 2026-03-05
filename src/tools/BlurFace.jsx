import React, { useState, useRef, useEffect, useCallback } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';

export default function BlurFace() {
  const [file, setFile] = useState(null);
  const [imgElement, setImgElement] = useState(null);
  const [regions, setRegions] = useState([]); // [{ x, y, w, h, id }]
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  
  const [blurType, setBlurType] = useState('blur'); // 'blur' or 'mosaic'
  const [strength, setStrength] = useState(20);
  const canvasRef = useRef(null);

  const processImage = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImgElement(img);
        setRegions([]);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgElement) return;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions based on container
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Scale image to fit container while maintaining aspect ratio
    const scale = Math.min(rect.width / imgElement.width, 520 / imgElement.height);
    const cvW = imgElement.width * scale;
    const cvH = imgElement.height * scale;
    
    canvas.width = cvW * dpr;
    canvas.height = cvH * dpr;
    canvas.style.width = `${cvW}px`;
    canvas.style.height = `${cvH}px`;
    ctx.scale(dpr, dpr);

    // Draw base image
    ctx.drawImage(imgElement, 0, 0, cvW, cvH);

    // Apply blur/mosaic to regions
    regions.forEach(region => {
      applyEffect(ctx, region, cvW, cvH);
    });

    // Draw current drawing rectangle
    if (isDrawing) {
      ctx.strokeStyle = 'var(--accent)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      const x = Math.min(startPos.x, currentPos.x);
      const y = Math.min(startPos.y, currentPos.y);
      const w = Math.abs(startPos.x - currentPos.x);
      const h = Math.abs(startPos.y - currentPos.y);
      ctx.strokeRect(x, y, w, h);
      ctx.setLineDash([]);
    }
  }, [imgElement, regions, isDrawing, startPos, currentPos, blurType, strength]);

  const applyEffect = (ctx, region, cvW, cvH) => {
    const { x, y, w, h } = region;
    if (w <= 0 || h <= 0) return;

    // Create a temporary canvas for the effect
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = w;
    tempCanvas.height = h;

    // Draw the specific region from original image
    tempCtx.drawImage(imgElement, 
      (x / cvW) * imgElement.width, (y / cvH) * imgElement.height, 
      (w / cvW) * imgElement.width, (h / cvH) * imgElement.height,
      0, 0, w, h
    );

    if (blurType === 'blur') {
      ctx.save();
      ctx.filter = `blur(${strength}px)`;
      ctx.drawImage(tempCanvas, x, y, w, h);
      ctx.restore();
    } else {
      // Mosaic (Pixelate)
      const size = Math.max(1, strength / 2);
      const pW = Math.ceil(w / size);
      const pH = Math.ceil(h / size);
      
      const smallCanvas = document.createElement('canvas');
      smallCanvas.width = pW;
      smallCanvas.height = pH;
      const smallCtx = smallCanvas.getContext('2d');
      smallCtx.imageSmoothingEnabled = false;
      smallCtx.drawImage(tempCanvas, 0, 0, pW, pH);
      
      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(smallCanvas, x, y, w, h);
      ctx.restore();
    }
    
    // Draw region border
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);
  };

  useEffect(() => {
    draw();
  }, [draw]);

  const handlePointerDown = (e) => {
    if (!imgElement) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setStartPos({ x, y });
    setCurrentPos({ x, y });
  };

  const handlePointerMove = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentPos({ x, y });
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    const x = Math.min(startPos.x, currentPos.x);
    const y = Math.min(startPos.y, currentPos.y);
    const w = Math.abs(startPos.x - currentPos.x);
    const h = Math.abs(startPos.y - currentPos.y);
    
    if (w > 5 && h > 5) {
      setRegions(prev => [...prev, { x, y, w, h, id: Date.now() }]);
    }
    setIsDrawing(false);
  };

  const exportImage = (format) => {
    const canvas = document.createElement('canvas');
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    const ctx = canvas.getContext('2d');

    // Draw base
    ctx.drawImage(imgElement, 0, 0);

    // Draw regions
    const cvW = canvasRef.current.width / (window.devicePixelRatio || 1);
    const cvH = canvasRef.current.height / (window.devicePixelRatio || 1);

    regions.forEach(region => {
      const scaleX = imgElement.width / cvW;
      const scaleY = imgElement.height / cvH;
      const realRegion = {
        x: region.x * scaleX,
        y: region.y * scaleY,
        w: region.w * scaleX,
        h: region.h * scaleY
      };

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = realRegion.w;
      tempCanvas.height = realRegion.h;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(imgElement, realRegion.x, realRegion.y, realRegion.w, realRegion.h, 0, 0, realRegion.w, realRegion.h);

      if (blurType === 'blur') {
        ctx.save();
        ctx.filter = `blur(${strength * scaleX}px)`;
        ctx.drawImage(tempCanvas, realRegion.x, realRegion.y, realRegion.w, realRegion.h);
        ctx.restore();
      } else {
        const size = Math.max(1, (strength / 2) * scaleX);
        const pW = Math.ceil(realRegion.w / size);
        const pH = Math.ceil(realRegion.h / size);
        const smallCanvas = document.createElement('canvas');
        smallCanvas.width = pW;
        smallCanvas.height = pH;
        const smallCtx = smallCanvas.getContext('2d');
        smallCtx.imageSmoothingEnabled = false;
        smallCtx.drawImage(tempCanvas, 0, 0, pW, pH);
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(smallCanvas, realRegion.x, realRegion.y, realRegion.w, realRegion.h);
        ctx.restore();
      }
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL(format === 'png' ? 'image/png' : 'image/jpeg', 0.92);
    link.download = `censored_${Date.now()}.${format}`;
    link.click();
  };

  const seoData = {
    title: "Blur Face & Mosaic Tool",
    intro: "Quickly censor sensitive areas in your images with our professional blur and mosaic utility. Protect identities, hide private information, and ensure privacy before sharing photos online.",
    whyUse: [
      "Instantly blur faces to protect individual privacy.",
      "Apply mosaic effects to hide license plates or addresses.",
      "Ensure document security by censoring sensitive text.",
      "100% private processing—no images are uploaded to servers."
    ],
    howItWorks: "Our tool processes your images locally using the Canvas API. When you select a region, the browser applies high-performance Gaussian blur or pixelation algorithms directly to that area's pixel data.",
    bestResults: [
      "Drag your mouse or finger over the canvas to select a region.",
      "Adjust the strength slider to control the level of censorship.",
      "Use 'Mosaic' for a classic pixelated look or 'Blur' for a smoother transition."
    ],
    faqs: [
      { q: "How do I select an area?", a: "Simply click and drag on the image to create a censorship box." },
      { q: "Can I remove multiple areas?", a: "Yes, you can draw as many rectangles as you need." },
      { q: "Is the blur permanent?", a: "The effect is applied to the copy you download. Your original file remains untouched." },
      { q: "Can I undo a selection?", a: "Use the 'Clear All' button to start over if you make a mistake." }
    ],
    relatedTools: [
      { name: "EXIF Remover", path: "/tool-remove-exif" },
      { name: "Resize & Crop", path: "/image-resize-and-crop" },
      { name: "Image to PDF", path: "/tools/image-to-pdf" }
    ],
    slug: "blur-face"
  };

  return (
    <ToolShell 
      title="Blur Face / Mosaic" 
      description="Censor sensitive areas instantly. Protect privacy with local blur and pixelation."
      seoData={seoData}
      canonicalPath="/tools/blur-face"
    >
      {!imgElement ? (
        <FileDrop onFileSelect={processImage} accept="image/*" />
      ) : (
        <div className="editor-container">
          <div className="editor-toolbar">
            <div className="toolbar-group">
              <label>Effect Type</label>
              <div className="segmented-control">
                {['blur', 'mosaic'].map(t => (
                  <button key={t} className={blurType === t ? 'active' : ''} onClick={() => setBlurType(t)}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="toolbar-group">
              <label>Strength</label>
              <input 
                type="range" min="5" max="100" value={strength} 
                onChange={e => setStrength(parseInt(e.target.value))} 
                style={{ width: '120px' }}
              />
            </div>
            <div className="toolbar-group">
              <button className="btn btn-secondary" style={{ height: '36px', minWidth: 'auto' }} onClick={() => setRegions([])}>Clear All</button>
            </div>
          </div>

          <div 
            className="canvas-wrapper"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{ touchAction: 'none', background: '#f8fafc', height: 'auto', minHeight: '300px' }}
          >
            <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto', cursor: 'crosshair' }} />
            <div className="canvas-hint">Drag to select areas to censor</div>
          </div>

          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => exportImage('jpg')}>Download JPG</button>
            <button className="btn btn-primary" onClick={() => exportImage('png')}>Download PNG</button>
            <button className="btn btn-secondary" onClick={() => {setImgElement(null); setFile(null)}}>Start Over</button>
          </div>
        </div>
      )}
    </ToolShell>
  );
}