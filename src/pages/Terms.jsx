import React from 'react';
import ContentPageShell from '../components/ContentPageShell';

export default function Terms() {
  const seoData = {
    title: "Terms of Service",
    description: "Review the ImageConverter Terms of Service. Understand our conditions for free tool usage, limitations of liability, and acceptable use policies.",
    canonicalPath: "/terms",
    intro: "By accessing and using ImageConverter, you agree to comply with the following terms and conditions. These terms ensure a safe and reliable experience for all our users."
  };

  return (
    <ContentPageShell {...seoData}>
      <div className="content-card">
        <h2>1. Service Description</h2>
        <p>ImageConverter provides a suite of free web-based utilities for image conversion, metadata removal, and document processing. These services are provided "as-is" without any fee or subscription requirement.</p>

        <div className="sub-section">
          <h3>2. Acceptable Use</h3>
          <p>You agree to use our services only for lawful purposes. You are prohibited from:</p>
          <ul className="benefit-list">
            <li>Attempting to circumvent any security features of the site.</li>
            <li>Processing files that contain malware, viruses, or harmful code.</li>
            <li>Using automated scripts or bots to scrape data or overload our hosting infrastructure.</li>
            <li>Uploading or processing illegal or highly offensive content.</li>
          </ul>
        </div>

        <div className="sub-section">
          <h3>3. Intellectual Property</h3>
          <p><strong>Your Files:</strong> You retain full ownership and intellectual property rights over any files you process using our tools. Since we do not upload or store your files, we never take possession of your content.</p>
          <p><strong>Our Site:</strong> The design, code, and original content of ImageConverter are the property of Hotplmedia and are protected by international copyright laws.</p>
        </div>

        <div className="sub-section">
          <h3>4. No Warranties</h3>
          <p>We do not guarantee that the service will be uninterrupted, secure, or error-free. The results provided by our tools are provided without warranty of any kind, either express or implied, including but not limited to the warranties of merchantability or fitness for a particular purpose.</p>
        </div>

        <div className="sub-section">
          <h3>5. Limitation of Liability</h3>
          <p>In no event shall Hotplmedia be liable for any direct, indirect, incidental, or consequential damages (including data loss or business interruption) arising out of the use or inability to use our tools, even if we have been notified of the possibility of such damage.</p>
        </div>

        <div className="sub-section">
          <h3>6. Availability & Changes</h3>
          <p>We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice. We may also update these terms occasionally to reflect changes in our technology or legal requirements.</p>
        </div>

        <div className="sub-section">
          <h3>7. Governing Jurisdiction</h3>
          <p>These terms are governed by general international commercial principles. Any legal disputes shall be resolved in the jurisdiction determined by our primary business operations.</p>
        </div>

        <div className="sub-section">
          <h3>Contact</h3>
          <p>For questions regarding these terms, please contact <strong>hotplmedia@gmail.com</strong>.</p>
        </div>
      </div>
    </ContentPageShell>
  );
}