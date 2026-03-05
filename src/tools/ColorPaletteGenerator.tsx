import React, { useState, useRef, useEffect, useCallback } from 'react';
import FileDrop from '../components/FileDrop';

const STORAGE_KEY = "converter:get-color-palette:v1";

export default function ColorPaletteGenerator() {
  const [image, setImage] = useState(null);
  const [pickedColor, setPickedColor] = useState({ hex: "#FFFFFF", rgb: "RGB(255, 255, 255)" });
  const [palette, setPalette] = useState([]);
  const [toast, setToast] = useState(null);
  const canvasRef = useRef(null);
  const loupeCanvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const [imageName, setImageName] = useState("");

  // Zoom & Pan State
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  
  // Loupe State
  const [loupe, setLoupe] = useState({ x: 0, y: 0, visible: false, hex: "#FFFFFF" });

  // Load palette on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setPalette(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load palette", e);
      }
    }
  }, []);

  // Save palette on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(palette));
  }, [palette]);

  // Handle Wheel Zoom
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleWheel = (e) => {
      if (!image) return;
      e.preventDefault();
      
      const delta = -e.deltaY;
      const factor = delta > 0 ? 1.1 : 0.9;
      setZoom(prevZoom => Math.min(Math.max(0.1, prevZoom * factor), 20));
    };

    wrapper.addEventListener('wheel', handleWheel, { passive: false });
    return () => wrapper.removeEventListener('wheel', handleWheel);
  }, [image]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setZoom(1.0);
        setPan({ x: 0, y: 0 });
        setTimeout(() => renderToCanvas(img), 0);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const renderToCanvas = (img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };

  const getCanvasCoords = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: -1, y: -1 };
    const rect = canvas.getBoundingClientRect();
    
    const x = Math.floor((clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((clientY - rect.top) * (canvas.height / rect.height));
    
    return { x, y };
  };

  const pickColorAt = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = getCanvasCoords(clientX, clientY);
    
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    
    setPickedColor({ hex, rgb: `RGB(${pixel[0]}, ${pixel[1]}, ${pixel[2]})` });
    showToast(`Color picked: ${hex}`);
  };

  const updateLoupe = (clientX, clientY) => {
    const canvas = canvasRef.current;
    const loupeCanvas = loupeCanvasRef.current;
    if (!canvas || !loupeCanvas) return;

    const { x, y } = getCanvasCoords(clientX, clientY);
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const lx = clientX - wrapperRect.left;
    const ly = clientY - wrapperRect.top;

    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
      setLoupe(prev => ({ ...prev, visible: false }));
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const lCtx = loupeCanvas.getContext('2d');
    const zoomSize = 9;
    const half = Math.floor(zoomSize / 2);
    
    lCtx.imageSmoothingEnabled = false;
    lCtx.clearRect(0, 0, loupeCanvas.width, loupeCanvas.height);
    lCtx.drawImage(canvas, x - half, y - half, zoomSize, zoomSize, 0, 0, loupeCanvas.width, loupeCanvas.height);

    lCtx.strokeStyle = 'rgba(255,255,255,0.8)';
    lCtx.lineWidth = 2;
    lCtx.strokeRect(loupeCanvas.width/2 - 8, loupeCanvas.height/2 - 8, 16, 16);

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    setLoupe({ x: lx, y: ly, visible: true, hex: rgbToHex(pixel[0], pixel[1], pixel[2]) });
  };

  const handlePointerDown = (e) => {
    if (!image) return;
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!image) return;
    updateLoupe(e.clientX, e.clientY);
    
    if (isDragging) {
      const dx = Math.abs(e.clientX - (dragStart.x + pan.x));
      const dy = Math.abs(e.clientY - (dragStart.y + pan.y));
      if (dx > 3 || dy > 3) setHasMoved(true);
      
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (!hasMoved) {
      pickColorAt(e.clientX, e.clientY);
    }
  };

  const rgbToHex = (r, g, b) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("").toUpperCase();
  };

  const saveColor = () => {
    if (palette.some(c => c.hex === pickedColor.hex)) {
      showToast("Color already in palette");
      return;
    }
    setPalette([{ ...pickedColor, createdAt: new Date().toISOString() }, ...palette]);
    showToast("Color saved to palette");
  };

  const removeColor = (hex) => {
    setPalette(palette.filter(c => c.hex !== hex));
  };

  const copyToClipboard = (text, label = "HEX") => {
    navigator.clipboard.writeText(text).then(() => showToast(`${label} copied`));
  };

  return (
    <div className="palette-editor-layout">
      {toast && <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '999px', boxShadow: 'var(--shadow-premium)', zIndex: 1000, fontWeight: '600', fontSize: '0.9rem' }}>{toast}</div>}

      {!image ? (
        <FileDrop onFileSelect={handleFileSelect} accept="image/*" />
      ) : (
        <div className="editor-container">
          <div 
            ref={wrapperRef}
            className="palette-canvas-wrapper"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={() => setLoupe(prev => ({ ...prev, visible: false }))}
            style={{ cursor: isDragging ? 'grabbing' : undefined }}
          >
            <div className="palette-zoom-controls">
              <div className="zoom-readout">{Math.round(zoom * 100)}%</div>
              <button onClick={(e) => { e.stopPropagation(); setZoom(1.0); setPan({x:0,y:0}); }}>Reset</button>
            </div>

            {loupe.visible && !isDragging && (
              <div className="palette-loupe" style={{ left: loupe.x + 20, top: loupe.y - 160 }}>
                <canvas ref={loupeCanvasRef} width={140} height={140} />
                <div className="palette-loupe-label">{loupe.hex}</div>
              </div>
            )}

            <div className="palette-stage" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
              <canvas ref={canvasRef} className="palette-canvas" />
            </div>
          </div>
          
          <p style={{ marginTop: '1rem', color: 'var(--text-soft)', fontSize: '0.9rem', textAlign: 'center', fontWeight: '500' }}>
            Wheel to Zoom • Drag to Move • Click to Pick Color
          </p>

          <div className="palette-saved-section">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ paddingRight: '2rem', borderRight: '1px solid var(--border)' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Current Color</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '16px', backgroundColor: pickedColor.hex, border: '4px solid white', boxShadow: 'var(--shadow-md)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'monospace', color: 'var(--primary)' }}>{pickedColor.hex}</div>
                    <div style={{ color: 'var(--text-soft)', fontWeight: '600', marginBottom: '1rem' }}>{pickedColor.rgb}</div>
                    <button className="btn btn-primary" onClick={saveColor}>Save color</button>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ margin: 0 }}>My Palette ({palette.length})</h3>
                  {palette.length > 0 && <button className="btn btn-secondary" style={{ padding: '4px 12px', height: 'auto', minWidth: 'auto', fontSize: '0.8rem' }} onClick={() => { if(window.confirm("Clear all?")) setPalette([]); }}>Clear all</button>}
                </div>
                <div className="palette-list" style={{ flex: 1, overflowY: 'auto', maxHeight: '300px', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {palette.length === 0 ? <p style={{ color: 'var(--text-soft)' }}>Pick colors to save them.</p> : palette.map((color) => (
                    <div key={color.hex + color.createdAt} className="palette-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', background: 'var(--drop-bg)', borderRadius: '12px', border: '1px solid var(--border)', minWidth: '180px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: color.hex, border: '2px solid white', boxShadow: 'var(--shadow-soft)' }} />
                      <div style={{ flex: 1, fontFamily: 'monospace', fontWeight: '700', fontSize: '0.85rem' }}>{color.hex}</div>
                      <button className="btn btn-secondary" style={{ padding: '4px 8px', height: 'auto', minWidth: 'auto', fontSize: '0.7rem' }} onClick={() => copyToClipboard(color.hex)}>Copy</button>
                      <button className="btn btn-secondary" style={{ padding: '4px 8px', height: 'auto', minWidth: 'auto', color: '#ef4444' }} onClick={() => removeColor(color.hex)}>×</button>
                    </div>
                  ))}
                </div>
                {palette.length > 0 && (
                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.85rem' }} onClick={() => copyToClipboard(palette.map(c => c.hex).join("\n"), "All HEX")}>Copy all HEX</button>
                    <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.85rem' }} onClick={() => {
                      const data = { tool: "Color Palette", colors: palette };
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `palette.json`; a.click();
                    }}>Export JSON</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="btn-group" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
            <button className="btn btn-secondary" style={{ width: 'auto' }} onClick={() => { setImage(null); setImageName(""); }}>Start over with new image</button>
          </div>
        </div>
      )}
    </div>
  );
}
