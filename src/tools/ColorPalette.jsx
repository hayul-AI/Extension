import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';

export default function ColorPalette() {
  const [colors, setColors] = useState([]);

  const processImage = (selectedFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 50; 
        canvas.height = 50;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 50, 50);
        
        const data = ctx.getImageData(0, 0, 50, 50).data;
        const colorCounts = {};
        
        for (let i = 0; i < data.length; i += 16) { 
          const r = Math.round(data[i] / 32) * 32;
          const g = Math.round(data[i+1] / 32) * 32;
          const b = Math.round(data[i+2] / 32) * 32;
          const rgb = `${r},${g},${b}`;
          colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
        }

        const sortedColors = Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(entry => {
            const [r, g, b] = entry[0].split(',');
            const toHex = c => {
              const hex = Number(c).toString(16);
              return hex.length === 1 ? '0' + hex : hex;
            };
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
          });
          
        setColors(sortedColors);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const seoData = {
    what: "This tool extracts the most dominant and prominent colors from an uploaded image to create a usable color palette.",
    how: "The tool loads your image onto an invisible HTML canvas, shrinks it to improve performance, and reads the raw pixel data. It groups similar pixels mathematically to find the most common color clusters natively in your browser.",
    example: "You found a photograph with a beautiful sunset. You want to design a website based on those colors. Upload the image here to get the exact HEX codes for the main sunset colors.",
    interpretation: "The result is a set of color swatches alongside their HEX codes, which you can easily copy and paste into Photoshop, CSS, or Figma.",
    faqs: [
      { q: "How accurate is the palette?", a: "It uses a fast quantization algorithm. While it may miss tiny accents, it successfully captures the overall mood and dominant hues." },
      { q: "Are the images processed remotely?", a: "No. The pixel counting happens purely in your browser's local memory." },
      { q: "Can I copy the HEX codes?", a: "Yes, the HEX codes are displayed below each color swatch for easy selection." }
    ]
  };

  return (
    <ToolShell 
      title="Image Color Palette Generator" 
      description="Extract dominant colors from any image to create a beautiful palette instantly."
      seoData={seoData}
      canonicalPath="/get-color-palette"
    >
      {colors.length === 0 ? (
        <FileDrop onFileSelect={processImage} accept="image/*" />
      ) : (
        <div className="result-area">
          <h3>Dominant Color Palette</h3>
          <div className="palette-colors">
            {colors.map((c, i) => (
              <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className="color-box" style={{backgroundColor: c}}></div>
                <span style={{marginTop: '0.5rem', fontFamily: 'monospace', fontWeight: 'bold'}}>{c}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setColors([])} className="btn" style={{marginTop: '2rem'}}>
            Extract From Another Image
          </button>
        </div>
      )}
    </ToolShell>
  );
}