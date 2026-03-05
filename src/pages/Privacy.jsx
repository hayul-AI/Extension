import React from 'react';
import ContentPageShell from '../components/ContentPageShell';

export default function Privacy() {
  const seoData = {
    title: "Privacy Policy",
    description: "Read the ImageConverter Privacy Policy. Learn how we protect your data through local browser processing and what basic information we collect.",
    canonicalPath: "/privacy",
    intro: "Your privacy is our highest priority. This policy outlines how we handle your data and confirms our commitment to secure, local processing."
  };

  return (
    <ContentPageShell {...seoData}>
      <div className="content-card summary-card">
        <h3>Privacy Summary</h3>
        <ul>
          <li><strong>Zero File Uploads:</strong> Your images and documents are processed locally in your browser and never sent to our servers.</li>
          <li><strong>No Personal Tracking:</strong> We do not track your identity or store your files.</li>
          <li><strong>Transparent Advertising:</strong> We use standard cookies for basic analytics and non-intrusive advertising.</li>
        </ul>
      </div>

      <div className="content-card">
        <h2>Information We Collect</h2>
        <p>While we do not see your files, we do collect limited non-personal information to improve our service:</p>
        <ul className="benefit-list">
          <li><strong>Analytics Data:</strong> Basic usage patterns (which tools are most popular) via standard web analytics.</li>
          <li><strong>Log Data:</strong> Your IP address, browser type, and timestamps are captured by our hosting provider for security and maintenance.</li>
          <li><strong>Cookies:</strong> Small data files used to remember your preferences and support our advertising partners.</li>
        </ul>

        <div className="sub-section">
          <h3>Local Processing Statement</h3>
          <p>Our core utility tools (Converters, Resizers, OCR, EXIF Remover) are executed entirely on your local machine using client-side JavaScript. This means the "input" files you select and the "output" files you download exist only in your device's temporary memory. We have no technical way to access, view, or store these files.</p>
        </div>

        <div className="sub-section">
          <h3>Advertising & Third Parties</h3>
          <p>We use Google AdSense to serve advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</p>
        </div>

        <div className="sub-section">
          <h3>Data Retention</h3>
          <p>Since we do not store your files, there is no file data to retain. Basic server logs and analytics data are retained for a limited duration (typically 30-90 days) for security auditing and traffic analysis.</p>
        </div>

        <div className="sub-section">
          <h3>Children's Privacy</h3>
          <p>Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children.</p>
        </div>

        <div className="sub-section">
          <h3>Contact Us</h3>
          <p>If you have any questions regarding this Privacy Policy, please email us at <strong>hotplmedia@gmail.com</strong>.</p>
        </div>
      </div>
    </ContentPageShell>
  );
}