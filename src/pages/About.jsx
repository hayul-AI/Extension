import React from 'react';
import ContentPageShell from '../components/ContentPageShell';

export default function About() {
  const seoData = {
    title: "About ImageConverter",
    description: "Learn about ImageConverter by Hotplmedia, our mission for privacy-first image tools, and how our local browser-based utilities work.",
    canonicalPath: "/about",
    intro: "ImageConverter is a specialized suite of browser-based utilities designed for modern creators, students, and small businesses who value both efficiency and privacy."
  };

  return (
    <ContentPageShell {...seoData}>
      <div className="content-card">
        <h2>Our Mission</h2>
        <p>At Hotplmedia, we believe that basic image and document tasks shouldn't require you to sacrifice your data privacy. Most online converters upload your files to remote servers, where they might be stored or analyzed. ImageConverter changes that by moving the processing power to the most secure place possible: your own device.</p>
        
        <div className="sub-section">
          <h3>The Problem We Solve</h3>
          <p>Whether you need to convert a modern iPhone photo to a standard format, strip sensitive GPS data from a family picture, or extract text from a screenshot, you typically face a choice between complex professional software or risky cloud uploads. Our tools provide a third way—professional-grade results delivered instantly within your browser.</p>
        </div>

        <div className="sub-section">
          <h3>The Privacy-First Promise</h3>
          <p>We leverage advanced web technologies like WebAssembly and the HTML5 Canvas API to perform complex file transformations locally. When we say "Your files never leave your browser," we mean it literally. No server-side processing exists for our primary conversion and extraction tools.</p>
        </div>
      </div>

      <div className="content-card">
        <h2>Quality & Technical Limitations</h2>
        <p>While we strive for professional excellence across all our utilities, the quality of the output is heavily dependent on the quality of your input files. Please note the following constraints:</p>
        <ul className="benefit-list">
          <li>OCR accuracy depends on image clarity, font size, and contrast.</li>
          <li>Resizing an image beyond its original dimensions (upscaling) will result in natural blurriness.</li>
          <li>Conversion from lossy formats (like JPG) to lossless formats (like PNG) cannot restore previously lost detail.</li>
          <li>Extremely large files may be limited by your device's available system memory (RAM).</li>
        </ul>
      </div>
    </ContentPageShell>
  );
}