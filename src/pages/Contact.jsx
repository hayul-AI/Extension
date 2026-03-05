import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function Contact() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const isSuccess = query.get('success') === '1';

  return (
    <div className="content-page-wrapper">
      <Helmet>
        <title>Contact Support | PixelConvert</title>
        <meta 
          name="description" 
          content="Contact PixelConvert support for help with OCR, image conversion, compression, and PDF tools. We respond within 24–48 hours." 
        />
      </Helmet>

      <div className="content-header">
        <h1>Contact Support – PixelConvert Image Tools</h1>
        <p className="intro-text">
          Need assistance with one of our tools or have a feature request? Our support team is dedicated to providing you with the best technical help for your image processing needs. We pride ourselves on fast, helpful, and transparent communication.
        </p>
        <p className="intro-text">
          Your privacy is paramount to us. All information shared via this form is used strictly for support purposes. We do not store your images or messages on our servers beyond the time needed to assist you. We typically respond to all inquiries within 24–48 hours.
        </p>
      </div>

      <div className="content-body" style={{ maxWidth: '720px', margin: '0 auto' }}>
        {isSuccess && (
          <div className="content-card" style={{ 
            background: '#f0fdf4', 
            border: '1px solid #bbf7d0', 
            color: '#166534', 
            padding: '1.5rem', 
            borderRadius: '16px', 
            marginBottom: '2rem',
            textAlign: 'center',
            fontWeight: '600',
            boxShadow: 'var(--shadow-soft)'
          }}>
            Your message has been sent successfully. We usually respond within 24–48 hours.
          </div>
        )}

        <div className="content-card">
          <form action="https://formsubmit.co/hotplmedia@gmail.com" method="POST">
            {/* Hidden Configuration Fields */}
            <input type="hidden" name="_subject" value="New PixelConvert Support Request" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://converter.hotplmedia.com/contact?success=1" />
            
            {/* Anti-Spam Honeypot */}
            <input type="text" name="_honey" style={{ display: 'none' }} />

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                required 
                placeholder="Your full name" 
                style={{ padding: '14px', borderRadius: '12px' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                required 
                placeholder="your@email.com" 
                style={{ padding: '14px', borderRadius: '12px' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tool">Tool Used</label>
              <select 
                name="tool_used" 
                id="tool" 
                required 
                style={{ padding: '0 14px', borderRadius: '12px', height: '52px' }}
              >
                <option value="">Select a tool</option>
                <option value="OCR Image to Text">OCR Image to Text</option>
                <option value="Image to PDF">Image to PDF</option>
                <option value="JPG to PNG">JPG to PNG</option>
                <option value="PNG to JPG">PNG to JPG</option>
                <option value="HEIC to JPG">HEIC to JPG</option>
                <option value="Compress Images">Compress Images</option>
                <option value="Resize & Crop">Resize & Crop</option>
                <option value="EXIF Remover">EXIF Remover</option>
                <option value="Palette Extractor">Palette Extractor</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                name="subject" 
                id="subject" 
                placeholder="What can we help you with?" 
                style={{ padding: '14px', borderRadius: '12px' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                name="message" 
                id="message" 
                required 
                placeholder="Please describe your issue or request in detail..."
                style={{ height: '160px', padding: '14px', borderRadius: '12px', resize: 'vertical' }}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ 
                width: '100%', 
                height: '52px', 
                marginTop: '1rem',
                fontSize: '1.1rem'
              }}
            >
              Send Support Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}