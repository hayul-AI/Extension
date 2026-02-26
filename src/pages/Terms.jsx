import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Terms() {
  return (
    <div className="page-container">
      <Helmet>
        <title>Terms of Service | Free Online Image Converter</title>
        <meta name="description" content="Terms of Service for Free Online Image Converter." />
      </Helmet>
      <h1>Terms of Service</h1>
      <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using Free Online Image Converter, you accept and agree to be bound by the terms and provision of this agreement.</p>
      <h2>2. Description of Service</h2>
      <p>We provide browser-based tools for modifying and converting image files. Because all processing is done locally on your device, we cannot guarantee the reliability, accuracy, or compatibility of the output files across all platforms.</p>
      <h2>3. Disclaimer of Warranties</h2>
      <p>The service is provided "as is" and "as available" without any warranty or condition, express, implied, or statutory. We specifically disclaim any implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
      <h2>4. Limitation of Liability</h2>
      <p>In no event shall Free Online Image Converter or its owners be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses resulting from the use or the inability to use the service.</p>
      <h2>5. User Responsibilities</h2>
      <p>You agree not to use the service for any illegal or unauthorized purpose. You are solely responsible for your conduct and any data that you process using our tools.</p>
    </div>
  );
}