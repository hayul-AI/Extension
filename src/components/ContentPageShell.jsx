import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function ContentPageShell({ 
  title, 
  description, 
  canonicalPath, 
  intro, 
  children 
}) {
  const siteUrl = 'https://converter.hotplmedia.com';
  const fullCanonical = `${siteUrl}${canonicalPath}`;

  const footerTools = [
    { name: "PNG to JPG", path: "/online-png-to-jpg" },
    { name: "JPG to PNG", path: "/online-jpg-to-png" },
    { name: "HEIC to JPG", path: "/convert-heic-to-jpg" },
    { name: "WEBP to JPG", path: "/convert-webp-to-jpg" },
    { name: "Image to PDF", path: "/make-image-to-pdf" },
    { name: "Resize & Crop", path: "/image-resize-and-crop" },
    { name: "EXIF Remover", path: "/tool-remove-exif" },
    { name: "OCR Extraction", path: "/extract-text-from-image" }
  ];

  return (
    <div className="content-page-wrapper">
      <Helmet>
        <title>{title} | ImageConverter</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={fullCanonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={fullCanonical} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="content-header">
        <h1>{title}</h1>
        {intro && <p className="intro-text">{intro}</p>}
      </div>

      <div className="content-body">
        {children}
      </div>

      <div className="content-footer-links">
        <div className="content-card">
          <h3>Explore our tools</h3>
          <ul className="footer-tool-grid">
            {footerTools.map((tool, i) => (
              <li key={i}>
                <Link to={tool.path}>{tool.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}