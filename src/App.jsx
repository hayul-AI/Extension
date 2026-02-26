import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

import RemoveExif from './tools/RemoveExif';
import PngToJpg from './tools/PngToJpg';
import JpgToPng from './tools/JpgToPng';
import HeicToJpg from './tools/HeicToJpg';
import WebpToJpg from './tools/WebpToJpg';
import ImageToPdf from './tools/ImageToPdf';
import FaviconGenerator from './tools/FaviconGenerator';
import ResizeCrop from './tools/ResizeCrop';
import ColorPalette from './tools/ColorPalette';
import OcrImageToText from './tools/OcrImageToText';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          
          <Route path="tool-remove-exif" element={<RemoveExif />} />
          <Route path="online-png-to-jpg" element={<PngToJpg />} />
          <Route path="online-jpg-to-png" element={<JpgToPng />} />
          <Route path="convert-heic-to-jpg" element={<HeicToJpg />} />
          <Route path="convert-webp-to-jpg" element={<WebpToJpg />} />
          <Route path="make-image-to-pdf" element={<ImageToPdf />} />
          <Route path="generate-favicon-now" element={<FaviconGenerator />} />
          <Route path="image-resize-and-crop" element={<ResizeCrop />} />
          <Route path="get-color-palette" element={<ColorPalette />} />
          <Route path="extract-text-from-image" element={<OcrImageToText />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;