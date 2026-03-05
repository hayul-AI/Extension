import React, { useState, useRef, useEffect, useCallback } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';

const FONT_OPTIONS = [
  "Inter", "system-ui", "Arial", "Georgia", "Times New Roman", "Courier New", "Verdana", "Trebuchet MS", "Impact"
];

const FILTER_PRESETS = [
  { name: 'Original', b: 1, c: 1, s: 1, blur: 0, g: 0, sep: 0 },
  { name: 'Vivid', b: 1.05, c: 1.15, s: 1.35, blur: 0, g: 0, sep: 0 },
  { name: 'Soft', b: 1.08, c: 0.95, s: 1.05, blur: 0.6, g: 0, sep: 0 },
  { name: 'Warm', b: 1.05, c: 1.05, s: 1.15, blur: 0, g: 0, sep: 0.15 },
  { name: 'Cool', b: 1.02, c: 1.08, s: 1.05, blur: 0, g: 0.05, sep: 0 },
  { name: 'B&W', b: 1.05, c: 1.2, s: 0, blur: 0.2, g: 1, sep: 0 },
  { name: 'Doc Boost', b: 1.12, c: 1.35, s: 0.85, blur: 0, g: 0.1, sep: 0 },
  { name: 'Matte', b: 1.05, c: 0.9, s: 0.95, blur: 0, g: 0, sep: 0 },
  { name: 'Night', b: 0.85, c: 1.25, s: 0.9, blur: 0, g: 0.05, sep: 0 },
  { name: 'Vintage', b: 1.02, c: 0.95, s: 0.9, blur: 0.4, g: 0, sep: 0.35 },
];

export default function ResizeCrop() {
  const [file, setFile] = useState(null);
  const [imgElement, setImgElement] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Transformation State
  const [aspect, setAspect] = useState('1:1');
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [isDraggingText, setIsDraggingText] = useState(false);
  const [lastMousePos, setLastLastMousePos] = useState({ x: 0, y: 0 });

  // Filters State
  const [filters, setFilters] = useState(FILTER_PRESETS[0]);

  // Text Overlay State
  const [textOverlays, setTextOverlays] = useState([]);
  const [activeTextId, setActiveTextId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [caretIndex, setCaretIndex] = useState(0);
  const [isCanvasFocused, setIsCanvasFocused] = useState(false);
  const [blink, setBlink] = useState(true);
  const [draftText, setDraftText] = useState("");
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isPendingAddText, setIsPendingAddText] = useState(false);

  const processImage = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImgElement(img);
        setZoom(1.0);
        setPan({ x: 0, y: 0 });
        setTextOverlays([]);
        setFilters(FILTER_PRESETS[0]);
        setEditingId(null);
        setActiveTextId(null);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const getCropDimensions = useCallback((canvasWidth, canvasHeight) => {
    let w, h;
    const padding = 40;
    const maxW = canvasWidth - padding * 2;
    const maxH = canvasHeight - padding * 2;

    if (aspect === '16:9') {
      w = maxW; h = w * (9 / 16);
      if (h > maxH) { h = maxH; w = h * (16 / 9); }
    } else if (aspect === '1:1') {
      const size = Math.min(maxW, maxH);
      w = h = size;
    } else if (aspect === '9:16') {
      h = maxH; w = h * (9 / 16);
      if (w > maxW) { w = maxW; h = w * (16 / 9); }
    }
    return { w, h, x: (canvasWidth - w) / 2, y: (canvasHeight - h) / 2 };
  }, [aspect]);

  const commitEdit = useCallback(() => {
    if (!editingId) return;
    setTextOverlays(prev => prev.map(to => 
      to.id === editingId ? { ...to, locked: true } : to
    ));
    setEditingId(null);
  }, [editingId]);

  const cancelEdit = useCallback(() => {
    if (!editingId) return;
    setTextOverlays(prev => {
      const active = prev.find(to => to.id === editingId);
      if (draftText === "" && active && active.text === "") return prev.filter(to => to.id !== editingId);
      return prev.map(to => to.id === editingId ? { ...to, text: draftText, locked: true } : to);
    });
    setEditingId(null);
  }, [editingId, draftText]);

  const clampPan = useCallback((p, currentZoom) => {
    if (!imgElement || !canvasRef.current) return p;
    const rect = canvasRef.current.getBoundingClientRect();
    const crop = getCropDimensions(rect.width, rect.height);
    const initialScale = Math.max(crop.w / imgElement.width, crop.h / imgElement.height);
    const scaledW = imgElement.width * initialScale * currentZoom;
    const scaledH = imgElement.height * initialScale * currentZoom;
    
    const maxPanX = Math.max(0, (scaledW - crop.w) / 2);
    const maxPanY = Math.max(0, (scaledH - crop.h) / 2);
    
    return {
      x: Math.min(Math.max(p.x, -maxPanX), maxPanX),
      y: Math.min(Math.max(p.y, -maxPanY), maxPanY)
    };
  }, [imgElement, getCropDimensions]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgElement) return;
    const ctx = canvas.getContext('2d');
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const cvW = rect.width;
    const cvH = rect.height;
    const crop = getCropDimensions(cvW, cvH);

    ctx.clearRect(0, 0, cvW, cvH);
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, cvW, cvH);

    ctx.save();
    ctx.beginPath();
    ctx.rect(crop.x, crop.y, crop.w, crop.h);
    ctx.clip();

    // Apply Filters
    ctx.filter = `brightness(${filters.b}) contrast(${filters.c}) saturate(${filters.s}) blur(${filters.blur}px) grayscale(${filters.g}) sepia(${filters.sep})`;

    const centerX = crop.x + crop.w / 2;
    const centerY = crop.y + crop.h / 2;
    ctx.translate(centerX + pan.x, centerY + pan.y);
    ctx.scale(zoom, zoom);
    
    const initialScale = Math.max(crop.w / imgElement.width, crop.h / imgElement.height);
    const drawW = imgElement.width * initialScale;
    const drawH = imgElement.height * initialScale;
    
    ctx.drawImage(imgElement, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    // Dimmed overlay
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.rect(0, 0, cvW, cvH);
    ctx.moveTo(crop.x, crop.y);
    ctx.lineTo(crop.x, crop.y + crop.h);
    ctx.lineTo(crop.x + crop.w, crop.y + crop.h);
    ctx.lineTo(crop.x + crop.w, crop.y);
    ctx.closePath();
    ctx.fill('evenodd');

    ctx.strokeStyle = 'var(--accent)';
    ctx.lineWidth = 2;
    ctx.strokeRect(crop.x, crop.y, crop.w, crop.h);

    // Draw Text Overlays
    textOverlays.forEach(to => {
      ctx.save();
      ctx.translate(centerX + to.x, centerY + to.y);
      ctx.rotate((to.rotation * Math.PI) / 180);
      
      const font = `${to.fontWeight || 600} ${to.size}px ${to.fontFamily}, sans-serif`;
      ctx.font = font;

      if (to.shadow && to.shadow.enabled) {
        const hex = to.shadow.color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${to.shadow.opacity})`;
        ctx.shadowBlur = to.shadow.blur;
        ctx.shadowOffsetX = to.shadow.offsetX;
        ctx.shadowOffsetY = to.shadow.offsetY;
      }

      ctx.fillStyle = to.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(to.text, 0, 0);

      // Caret
      if (to.id === editingId && isCanvasFocused && blink) {
        ctx.shadowColor = "transparent";
        const textBefore = to.text.slice(0, caretIndex);
        const widthBefore = ctx.measureText(textBefore).width;
        const totalWidth = ctx.measureText(to.text).width;
        const caretX = widthBefore - totalWidth / 2;
        
        ctx.strokeStyle = to.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(caretX + 1, -to.size / 2);
        ctx.lineTo(caretX + 1, to.size / 2);
        ctx.stroke();
      }

      // Selection Highlight
      if (to.id === activeTextId && !editingId) {
        ctx.shadowColor = "transparent";
        ctx.strokeStyle = 'var(--accent)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        const totalWidth = ctx.measureText(to.text).width || 40;
        ctx.strokeRect(-totalWidth/2 - 10, -to.size/2 - 5, totalWidth + 20, to.size + 10);
      }

      ctx.restore();
    });
  }, [imgElement, getCropDimensions, pan, zoom, filters, textOverlays, editingId, isCanvasFocused, blink, caretIndex, activeTextId]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    if (!editingId) return;
    const interval = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(interval);
  }, [editingId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!editingId || !isCanvasFocused) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        commitEdit();
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        cancelEdit();
        return;
      }

      const active = textOverlays.find(to => to.id === editingId);
      if (!active) return;

      let newTextStr = active.text;
      let newCaret = caretIndex;

      if (e.key === 'Backspace') {
        e.preventDefault();
        if (caretIndex > 0) {
          newTextStr = active.text.slice(0, caretIndex - 1) + active.text.slice(caretIndex);
          newCaret = caretIndex - 1;
        }
      } else if (e.key === 'Delete') {
        e.preventDefault();
        if (caretIndex < active.text.length) {
          newTextStr = active.text.slice(0, caretIndex) + active.text.slice(caretIndex + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        newCaret = Math.max(0, caretIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        newCaret = Math.min(active.text.length, caretIndex + 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        newCaret = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newCaret = active.text.length;
      } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        newTextStr = active.text.slice(0, caretIndex) + e.key + active.text.slice(caretIndex);
        newCaret = caretIndex + 1;
      }

      if (newTextStr !== active.text || newCaret !== caretIndex) {
        setTextOverlays(prev => prev.map(to => to.id === editingId ? { ...to, text: newTextStr } : to));
        setCaretIndex(newCaret);
        setBlink(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingId, isCanvasFocused, textOverlays, caretIndex, commitEdit, cancelEdit]);

  const handleWheel = (e) => {
    if (!imgElement) return;
    e.preventDefault();
    const scaleFactor = 1.1;
    let newZoom = e.deltaY > 0 ? zoom / scaleFactor : zoom * scaleFactor;
    newZoom = Math.min(Math.max(newZoom, 0.2), 6);
    setZoom(newZoom);
    setPan(prev => clampPan(prev, newZoom));
  };

  const handlePointerDown = (e) => {
    if (!imgElement) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cvW = rect.width;
    const cvH = rect.height;
    const crop = getCropDimensions(cvW, cvH);
    const centerX = crop.x + crop.w / 2;
    const centerY = crop.y + crop.h / 2;

    const currentTime = Date.now();
    const isDoubleClick = (currentTime - lastClickTime < 300);
    setLastClickTime(currentTime);

    const hitId = textOverlays.findLast(to => {
      const tx = centerX + to.x;
      const ty = centerY + to.y;
      const hitBoxW = Math.max(40, to.size * 2);
      const hitBoxH = Math.max(20, to.size);
      return Math.abs(x - tx) < hitBoxW/2 && Math.abs(y - ty) < hitBoxH/2;
    })?.id;

    if (isPendingAddText) {
      commitEdit();
      const newId = Date.now().toString();
      const newOverlay = {
        id: newId, text: "", x: x - centerX, y: y - centerY, size: 42, rotation: 0, color: '#ffffff',
        fontFamily: 'Inter', fontWeight: 600, locked: false,
        shadow: { enabled: false, color: '#000000', blur: 10, offsetX: 2, offsetY: 2, opacity: 0.5 }
      };
      setTextOverlays(prev => [...prev, newOverlay]);
      setEditingId(newId);
      setActiveTextId(newId);
      setCaretIndex(0);
      setDraftText("");
      setIsPendingAddText(false);
    } else if (hitId) {
      if (editingId && editingId !== hitId) commitEdit();
      setActiveTextId(hitId);
      if (isDoubleClick) {
        setEditingId(hitId);
        const overlay = textOverlays.find(t => t.id === hitId);
        setDraftText(overlay.text);
        setCaretIndex(overlay.text.length);
        setIsDraggingText(false);
        setIsPanning(false);
      } else {
        if (!editingId) setIsDraggingText(true);
      }
    } else {
      if (editingId) {
        commitEdit();
      } else {
        setIsPanning(true);
        setActiveTextId(null);
      }
    }
    setLastLastMousePos({ x: e.clientX, y: e.clientY });
    canvasRef.current.focus();
  };

  const handlePointerMove = (e) => {
    if ((!isPanning && !isDraggingText) || editingId) return;
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;

    if (isDraggingText && activeTextId) {
      setTextOverlays(prev => prev.map(to => 
        to.id === activeTextId ? { ...to, x: to.x + dx, y: to.y + dy } : to
      ));
    } else if (isPanning) {
      setPan(prev => clampPan({ x: prev.x + dx, y: prev.y + dy }, zoom));
    }
    setLastLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const updateActiveText = (key, value) => {
    if (!activeTextId) return;
    setTextOverlays(prev => prev.map(to => to.id === activeTextId ? { ...to, [key]: value } : to));
  };

  const exportImage = (format) => {
    commitEdit();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const outputW = 1500;
    const aspectMap = { '16:9': 9/16, '1:1': 1, '9:16': 16/9 };
    const outputH = outputW * aspectMap[aspect];
    canvas.width = outputW; canvas.height = outputH;

    const cvW = canvasRef.current.width / (window.devicePixelRatio || 1);
    const cvH = canvasRef.current.height / (window.devicePixelRatio || 1);
    const crop = getCropDimensions(cvW, cvH);
    const exportScale = outputW / crop.w;

    ctx.save();
    ctx.filter = `brightness(${filters.b}) contrast(${filters.c}) saturate(${filters.s}) blur(${filters.blur * exportScale}px) grayscale(${filters.g}) sepia(${filters.sep})`;
    ctx.translate(outputW / 2 + pan.x * exportScale, outputH / 2 + pan.y * exportScale);
    ctx.scale(zoom * exportScale, zoom * exportScale);
    const initialScale = Math.max(crop.w / imgElement.width, crop.h / imgElement.height);
    ctx.drawImage(imgElement, -(imgElement.width * initialScale) / 2, -(imgElement.height * initialScale) / 2, imgElement.width * initialScale, imgElement.height * initialScale);
    ctx.restore();

    textOverlays.forEach(to => {
      ctx.save();
      ctx.translate(outputW / 2 + to.x * exportScale, outputH / 2 + to.y * exportScale);
      ctx.rotate((to.rotation * Math.PI) / 180);
      ctx.font = `${to.fontWeight || 600} ${to.size * exportScale}px ${to.fontFamily}, sans-serif`;
      if (to.shadow && to.shadow.enabled) {
        const hex = to.shadow.color;
        const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${to.shadow.opacity})`;
        ctx.shadowBlur = to.shadow.blur * exportScale;
        ctx.shadowOffsetX = to.shadow.offsetX * exportScale;
        ctx.shadowOffsetY = to.shadow.offsetY * exportScale;
      }
      ctx.fillStyle = to.color;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(to.text, 0, 0);
      ctx.restore();
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL(format === 'png' ? 'image/png' : 'image/jpeg', 0.92);
    link.download = `edited_${Date.now()}.${format}`; link.click();
  };

  const activeOverlay = textOverlays.find(to => to.id === activeTextId);

  return (
    <ToolShell 
      title="Pro Resize & Crop" 
      description="Advanced interactive image editor. Direct on-canvas typing, reliable image panning, and shadow effects."
      seoData={{
        title: "Advanced Image Resize & Crop",
        intro: "Edit images professionally in your browser. Direct canvas typing, smart image panning, one-click filters, and premium text effects.",
        whyUse: ["Direct on-canvas typing", "Reliable image panning", "Advanced shadow effects", "100% local processing"],
        howItWorks: "All transformations happen in your browser using high-performance Canvas APIs.",
        bestResults: ["Use high-res source files", "Select 9:16 for vertical stories", "Double-click text to edit contents"],
        faqs: [
          { q: "How do I move the image?", a: "Just drag any empty area of the canvas to pan the image under the crop frame." },
          { q: "How do I type text?", a: "Click the 'Add Text' button then click on the canvas, or click an empty area to start a new layer. Type directly and press Enter to finish." },
          { q: "Is 9:16 supported?", a: "Yes, it's the standard for TikTok and Instagram stories." }
        ],
        relatedTools: [{ name: "Image to PDF", path: "/tools/image-to-pdf" }, { name: "EXIF Remover", path: "/tool-remove-exif" }],
        slug: "image-resize-and-crop"
      }}
      canonicalPath="/image-resize-and-crop"
    >
      {!imgElement ? (
        <FileDrop onFileSelect={processImage} accept="image/*" />
      ) : (
        <div className="editor-container">
          <div className="editor-toolbar">
            <div className="toolbar-group">
              <label>Aspect Ratio</label>
              <div className="segmented-control">
                {['1:1', '16:9', '9:16'].map(r => (
                  <button key={r} className={aspect === r ? 'active' : ''} onClick={() => { commitEdit(); setAspect(r); setPan({x:0,y:0}); }}>{r}</button>
                ))}
              </div>
            </div>
            <div className="toolbar-group">
              <span className="zoom-indicator">{Math.round(zoom * 100)}%</span>
              <button className="btn btn-secondary" onClick={() => { commitEdit(); setPan({x:0,y:0}); setZoom(1) }}>Reset View</button>
            </div>
          </div>

          <div 
            className="canvas-wrapper" 
            tabIndex={0}
            ref={containerRef}
            onFocus={() => setIsCanvasFocused(true)}
            onBlur={() => { setIsCanvasFocused(false); commitEdit(); }}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={() => { setIsPanning(false); setIsDraggingText(false); }}
            onPointerLeave={() => { setIsPanning(false); setIsDraggingText(false); }}
            style={{ touchAction: 'none', overscrollBehavior: 'contain' }}
          >
            <canvas ref={canvasRef} style={{ width: '100%', height: '520px', display: 'block', cursor: editingId ? 'text' : (isPanning ? 'grabbing' : 'crosshair') }} />
            <div className="canvas-hint">Drag to move image • Click to type • Double-click text to edit</div>
          </div>

          <div className="editor-controls-grid">
            <div className="content-card">
              <h3 style={{marginBottom: '1rem'}}>Filter Presets</h3>
              <div className="preset-grid">
                {FILTER_PRESETS.map(p => (
                  <button key={p.name} className={`preset-btn ${filters.name === p.name ? 'active' : ''}`} onClick={() => { commitEdit(); setFilters(p); }}>{p.name}</button>
                ))}
              </div>
              <button className="btn btn-secondary" style={{marginTop: '1.5rem'}} onClick={() => { commitEdit(); setFilters(FILTER_PRESETS[0]); }}>Reset Filters</button>
            </div>

            <div className="content-card">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <h3>Text Layer</h3>
                <button className={`btn ${isPendingAddText ? 'btn-primary' : 'btn-secondary'}`} style={{width: 'auto', height: '36px'}} onClick={() => setIsPendingAddText(!isPendingAddText)}>
                  {isPendingAddText ? 'Click on Canvas...' : 'Add Text'}
                </button>
              </div>
              
              {activeOverlay ? (
                <div className="active-text-controls" style={{borderTop: 'none', marginTop: 0, paddingTop: 0}}>
                  <div className="form-group">
                    <label>Font Family</label>
                    <select value={activeOverlay.fontFamily} onChange={e => updateActiveText('fontFamily', e.target.value)}>
                      {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Size: {activeOverlay.size}px</label>
                    <input type="range" min="12" max="140" value={activeOverlay.size} onChange={e => updateActiveText('size', parseInt(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label>Rotation: {activeOverlay.rotation}°</label>
                    <input type="range" min="-180" max="180" value={activeOverlay.rotation} onChange={e => updateActiveText('rotation', parseInt(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label>Text Color</label>
                    <input type="color" value={activeOverlay.color} onChange={e => updateActiveText('color', e.target.value)} />
                  </div>
                  <div className="form-group" style={{flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginTop: '1rem'}}>
                    <input type="checkbox" checked={activeOverlay.shadow.enabled} onChange={e => updateActiveText('shadow', { ...activeOverlay.shadow, enabled: e.target.checked })} />
                    <label style={{marginBottom: 0}}>Enable Shadow</label>
                  </div>
                  {activeOverlay.shadow.enabled && (
                    <div className="shadow-controls" style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem', padding: '1rem', background: 'var(--drop-bg)', borderRadius: '8px'}}>
                      <div className="form-group">
                        <label>Blur: {activeOverlay.shadow.blur}px</label>
                        <input type="range" min="0" max="30" value={activeOverlay.shadow.blur} onChange={e => updateActiveText('shadow', { ...activeOverlay.shadow, blur: parseInt(e.target.value) })} />
                      </div>
                      <div className="form-group">
                        <label>Opacity: {Math.round(activeOverlay.shadow.opacity * 100)}%</label>
                        <input type="range" min="0" max="1" step="0.01" value={activeOverlay.shadow.opacity} onChange={e => updateActiveText('shadow', { ...activeOverlay.shadow, opacity: parseFloat(e.target.value) })} />
                      </div>
                      <input type="color" value={activeOverlay.shadow.color} onChange={e => updateActiveText('shadow', { ...activeOverlay.shadow, color: e.target.value })} />
                    </div>
                  )}
                  <button className="btn btn-secondary" style={{color: '#ef4444', marginTop: '1rem'}} onClick={() => { setTextOverlays(prev => prev.filter(t => t.id !== activeTextId)); setActiveTextId(null); setEditingId(null); }}>Delete Layer</button>
                </div>
              ) : (
                <p style={{color: 'var(--text-soft)', fontSize: '0.9rem'}}>Select a text layer or click canvas to add new</p>
              )}
            </div>
          </div>

          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => exportImage('jpg')}>Download JPG</button>
            <button className="btn btn-primary" onClick={() => exportImage('png')}>Download PNG</button>
            <button className="btn btn-secondary" onClick={() => { setImgElement(null); setFile(null); }}>Start Over</button>
          </div>
        </div>
      )}
    </ToolShell>
  );
}