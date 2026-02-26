import React from 'react';
import FAQAccordion from './FAQAccordion';

export default function SeoBlocks({ data }) {
  if (!data) return null;
  
  return (
    <div className="seo-section">
      <div className="seo-block">
        <h2>What this tool does</h2>
        <p>{data.what}</p>
      </div>
      
      <div className="seo-block">
        <h2>How it works (100% Secure & Local)</h2>
        <p>{data.how}</p>
      </div>

      <div className="seo-block">
        <h2>Example Scenario</h2>
        <p>{data.example}</p>
      </div>

      <div className="seo-block">
        <h2>Result Interpretation</h2>
        <p>{data.interpretation}</p>
      </div>

      <div className="seo-block">
        <h2>Frequently Asked Questions</h2>
        {data.faqs.map((faq, idx) => (
          <FAQAccordion key={idx} question={faq.q} answer={faq.a} />
        ))}
      </div>

      <div className="seo-block" style={{ fontSize: '0.9rem', color: '#9ca3af', marginTop: '3rem' }}>
        <h2>Disclaimer</h2>
        <p>{data.disclaimer || "Disclaimer: This tool provides best-effort conversions using standard browser capabilities. We do not guarantee 100% accuracy for all file variants. Because all processing is done locally, we take no responsibility for data loss, performance issues, or legal implications of the transformed files. No files are transmitted to our servers."}</p>
      </div>
    </div>
  );
}