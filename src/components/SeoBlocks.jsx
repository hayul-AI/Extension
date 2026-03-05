import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FAQAccordion from './FAQAccordion';

const FaqJsonLd = ({ faqs }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default function SeoBlocks({ data }) {
  if (!data) return null;

  const {
    title,
    intro,
    whyUse,
    howItWorks,
    bestResults,
    faqs,
    relatedTools,
    privacyNote,
    slug
  } = data;

  return (
    <div className="seo-section">
      <FaqJsonLd faqs={faqs} />
      
      <div className="content-grid">
        {/* Left Column: Primary Content */}
        <div className="content-main">
          <div className="content-card">
            <h2>About {title}</h2>
            <p className="intro-text">{intro}</p>
            
            <div className="sub-section">
              <h3>Why use this tool?</h3>
              <ul className="benefit-list">
                {whyUse.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className="sub-section">
              <h3>Technical reliability</h3>
              <p>{howItWorks}</p>
            </div>

            <div className="sub-section">
              <h3>Frequently Asked Questions</h3>
              <div className="faq-container">
                {faqs.map((faq, idx) => (
                  <FAQAccordion key={idx} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="content-sidebar">
          <div className="content-card sidebar-card privacy-card">
            <h3>Privacy & Security</h3>
            <p>{privacyNote || "All image processing is performed locally within your browser. Your sensitive files are never uploaded to a server, ensuring 100% privacy and data protection."}</p>
          </div>

          <div className="content-card sidebar-card tips-card">
            <h3>Best Results</h3>
            <ul className="tip-list">
              {bestResults.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>

          <div className="content-card sidebar-card links-card">
            <h3>Related Tools</h3>
            <ul className="related-list">
              {relatedTools.map((tool, i) => (
                <li key={i}>
                  <Link to={tool.path}>{tool.name}</Link>
                </li>
              ))}
            </ul>
            <div className="guide-cta">
              <Link to={`/privacy`} className="guide-link">Read our Security Guide</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="disclaimer-text">
        <p>Disclaimer: This utility provides best-effort processing using standard browser APIs. While we prioritize accuracy, we recommend verifying critical output. We are not responsible for data loss or unintended consequences of file transformations.</p>
      </div>
    </div>
  );
}