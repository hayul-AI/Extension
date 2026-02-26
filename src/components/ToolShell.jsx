import React from 'react';
import { Helmet } from 'react-helmet-async';
import SeoBlocks from './SeoBlocks';

export default function ToolShell({ 
  title, 
  description, 
  children, 
  seoData, 
  canonicalPath 
}) {
  const siteUrl = 'https://yourwebsite.com'; // Adjust to actual domain
  return (
    <div className="tool-shell-container">
      <Helmet>
        <title>{title} | Free Online Image Converter</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}${canonicalPath}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${siteUrl}${canonicalPath}`} />
      </Helmet>
      
      <div className="tool-shell">
        <div className="tool-header">
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="local-notice">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            100% Local Processing - No Server Uploads
          </div>
        </div>
        
        {children}
      </div>

      <SeoBlocks data={seoData} />
    </div>
  );
}