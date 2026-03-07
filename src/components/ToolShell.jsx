import React from 'react';
import { Helmet } from 'react-helmet-async';
import SeoBlocks from './SeoBlocks';
import BackToHome from './BackToHome';

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
        <title>{`${title} | ImageConverter`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}${canonicalPath}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${siteUrl}${canonicalPath}`} />
      </Helmet>

      <div className="tool-shell">
        <BackToHome />
        <div className="tool-header">
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="local-notice">
            Secure Local Processing
          </div>
        </div>

        <div className="tool-card-main">
          {children}
        </div>
      </div>

      <SeoBlocks data={seoData} />
    </div>
  );
}