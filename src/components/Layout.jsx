import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Layout() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="app-container">
      <div className="bokashi-bg">
        <div className="bokashi-glow glow-1"></div>
        <div className="bokashi-glow glow-2"></div>
        <div className="bokashi-glow glow-3"></div>
      </div>

      <header className="header">
        <div className="nav-container">
          <Link to="/" className="logo">
            <img src="/logo.svg" alt="ImageConverter Logo" className="site-logo" />
            <span>ImageConverter</span>
          </Link>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/guides" style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.95rem' }}>Guides</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Quick Tools</h4>
            <ul>
              <li><Link to="/online-png-to-jpg">PNG to JPG</Link></li>
              <li><Link to="/online-jpg-to-png">JPG to PNG</Link></li>
              <li><Link to="/convert-heic-to-jpg">HEIC to JPG</Link></li>
              <li><Link to="/convert-webp-to-jpg">WebP to JPG</Link></li>
              <li><Link to="/image-compressor">Image Compressor</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Advanced</h4>
            <ul>
              <li><Link to="/pdf-merge">PDF Merge</Link></li>
              <li><Link to="/pdf-compressor">PDF Compressor</Link></li>
              <li><Link to="/tool-remove-exif">Remove Metadata</Link></li>
              <li><Link to="/image-resize-and-crop">Resize & Crop</Link></li>
              <li><Link to="/make-image-to-pdf">Image to PDF</Link></li>
              <li><Link to="/extract-text-from-image">OCR Text Extraction</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li style={{color: 'var(--text-soft)', fontSize: '0.95rem'}}>
                Email: hotplmedia@gmail.com
              </li>
              <li style={{color: 'var(--text-soft)', fontSize: '0.9rem', marginTop: '1rem'}}>
                100% Client-side processing for ultimate privacy.
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} ImageConverter. All rights reserved. Locally processed in your browser.</p>
        </div>
      </footer>
    </div>
  );
}