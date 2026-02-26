import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Logo from './Logo';

export default function Layout() {
  return (
    <div className="app-container">
      <header className="header">
        <Link to="/" className="logo">
          <Logo />
          <span className="logo-text">Free Online Image Converter</span>
        </Link>
        <nav>
          {/* Add nav links if needed */}
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Free Online Image Converter. All rights reserved. Locally processed in your browser.</p>
      </footer>
    </div>
  );
}