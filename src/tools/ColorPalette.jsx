import React from 'react';
import ToolShell from '../components/ToolShell';
import ColorPaletteGenerator from './ColorPaletteGenerator';
import "../styles/palette-editor.css";

export default function ColorPalette() {
  const seoData = {
    title: "Dominant Image Color Extractor",
    intro: "Effortlessly extract the most prominent colors from any photograph or graphic to create a beautiful, professional color palette. This tool is a must-have for designers, developers, and artists seeking color inspiration directly from their own images.",
    whyUse: [
      "Instantly discover the primary HEX codes for your digital design projects.",
      "Ensure consistent branding by extracting colors from existing logos or assets.",
      "Get creative inspiration for website themes, digital art, or interior design.",
      "Analyze the color mood and balance of any photograph or graphic work."
    ],
    howItWorks: "Our utility performs a fast mathematical analysis of your image's pixel data. It shrinks the image to a low-resolution map and then clusters similar pixel values using a fast quantization algorithm to identify the most common hues. This process is executed natively in your browser.",
    bestResults: [
      "Use photos with diverse but clear color subjects for more varied palettes.",
      "The extractor works best on high-contrast images where dominant colors are distinct.",
      "You can easily copy and paste the HEX codes provided below each swatch."
    ],
    faqs: [
      { q: "How many colors does the tool extract?", a: "This extractor identifies the top 6 most dominant color clusters in any given image." },
      { q: "Can I extract colors from small icons?", a: "Yes, the tool works on images of any size, though small icons might result in a more limited palette." },
      { q: "Is the palette identification accurate?", a: "The tool uses a high-performance grouping algorithm. While it might miss tiny color accents, it is exceptionally accurate at capturing the overall color story." },
      { q: "Are my images sent to a server for analysis?", a: "No. The entire color counting and clustering logic runs locally on your device's CPU. Your privacy is 100% maintained." },
      { q: "What format are the color codes in?", a: "We provide the industry-standard HEX codes (e.g., #FFFFFF), which are ready for use in CSS, Photoshop, or Figma." }
    ],
    relatedTools: [
      { name: "Resize & Crop", path: "/image-resize-and-crop" },
      { name: "EXIF Remover", path: "/tool-remove-exif" },
      { name: "OCR Text Extraction", path: "/extract-text-from-image" }
    ],
    slug: "get-color-palette"
  };

  return (
    <ToolShell 
      title="Image Color Palette Generator" 
      description="Extract dominant colors from any image to create a beautiful palette instantly."
      seoData={seoData}
      canonicalPath="/get-color-palette"
    >
      <ColorPaletteGenerator />
    </ToolShell>
  );
}
