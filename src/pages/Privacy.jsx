import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Privacy() {
  return (
    <div className="page-container">
      <Helmet>
        <title>Privacy Policy | Free Online Image Converter</title>
        <meta name="description" content="Privacy Policy for Free Online Image Converter." />
      </Helmet>
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
      <h2>1. Local Processing</h2>
      <p>The core functionality of our website (image conversion, EXIF removal, OCR, etc.) operates entirely within your web browser. <strong>We do not upload, process, or store your images, documents, or extracted text on our servers.</strong> All files remain on your local device.</p>
      <h2>2. Data Collection</h2>
      <p>Because we do not use backend servers for processing files, we do not collect the content of your files. However, we may collect standard analytical data such as:</p>
      <ul>
        <li>IP Addresses (anonymized where possible)</li>
        <li>Browser type and version</li>
        <li>Pages visited</li>
      </ul>
      <h2>3. Cookies and Advertising</h2>
      <p>We use third-party advertising companies, such as Google AdSense, to serve ads when you visit our website. These companies may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.</p>
      <h2>4. Changes to This Policy</h2>
      <p>We may update this privacy policy from time to time. We encourage you to review this page periodically.</p>
      <h2>5. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at hotplmedia@gmail.com.</p>
    </div>
  );
}