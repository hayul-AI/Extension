import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(formData.message);
    window.location.href = `mailto:hotplmedia@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="page-container" style={{maxWidth: '600px', margin: '0 auto'}}>
      <Helmet>
        <title>Contact Us | Free Online Image Converter</title>
        <meta name="description" content="Get in touch with Free Online Image Converter. We'd love to hear your feedback." />
      </Helmet>
      <h1>Contact Us</h1>
      <p>If you have any questions, feedback, or feature requests, please reach out to us at <strong>hotplmedia@gmail.com</strong>, or use the form below.</p>
      
      <form onSubmit={handleSubmit} style={{marginTop: '2rem'}}>
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            className="form-input" 
            required 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            className="form-input" 
            required 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea 
            className="form-input" 
            rows="5" 
            required
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>
        <button type="submit" className="btn">Send via Email Client</button>
      </form>
    </div>
  );
}