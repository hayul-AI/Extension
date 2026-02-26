import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="page-container">
      <Helmet>
        <title>About Us | Free Online Image Converter</title>
        <meta name="description" content="Learn about Free Online Image Converter, a secure, browser-based image processing tool that prioritizes your privacy." />
      </Helmet>
      <h1>About Us</h1>
      <p>Welcome to Free Online Image Converter. Our mission is to provide fast, secure, and accessible image tools for everyone. We believe that basic image editing and conversion shouldn't require compromising your privacy or uploading sensitive files to unknown servers.</p>
      <p>That's why our entire suite of tools is built using modern browser technologies. When you convert an image, extract text, or remove EXIF data on our site, <strong>everything happens locally on your own device</strong>. We never upload, store, or transmit your files.</p>
      <h2>Why Choose Us?</h2>
      <ul>
        <li><strong>Privacy First:</strong> Your files never leave your computer.</li>
        <li><strong>Fast:</strong> No waiting for uploads or server queues.</li>
        <li><strong>Free:</strong> All our tools are completely free to use.</li>
      </ul>
    </div>
  );
}