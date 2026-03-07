import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { guides } from '../data/guides';
import FAQAccordion from '../components/FAQAccordion';

export default function GuideDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const guideIndex = guides.findIndex(g => g.slug === slug);
  const guide = guides[guideIndex];

  useEffect(() => {
    if (!guide) {
      navigate('/guides', { replace: true });
    }
  }, [guide, navigate]);

  if (!guide) return null;

  // For internal linking
  const relatedGuides = [
    guides[(guideIndex + 1) % guides.length],
    guides[(guideIndex + 2) % guides.length],
    guides[(guideIndex + 3) % guides.length],
  ];

  const { details } = guide;

  return (
    <div className="content-page-wrapper">
      <Helmet>
        <title>{`${guide.title} Guide | Free Online Image Converter`}</title>
        <meta name="description" content={`${guide.blurb} Learn how it works, pro tips, and privacy details.`} />
      </Helmet>

      <div className="back-link" style={{ marginBottom: '2rem' }}>
        <Link to="/guides" className="back-home-pill" style={{ marginBottom: 0 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Guides</span>
        </Link>
      </div>

      <div className="content-grid">
        <div className="content-main">
          <div className="content-card">
            <h1>{guide.title} Guide</h1>
            <p className="intro-text">{guide.description}</p>

            <div className="sub-section">
              <h2>What this tool is for</h2>
              <p>{details.whatFor}</p>
            </div>

            <div className="sub-section">
              <h2>When you should use it</h2>
              <p>{details.whenToUse}</p>
            </div>

            <div className="sub-section">
              <h2>Step-by-step instructions</h2>
              <ul className="benefit-list">
                {details.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>

            <div className="sub-section">
              <h2>How it works & Privacy</h2>
              <p>{details.howItWorks}</p>
            </div>

            <div className="sub-section">
              <h2>Common Mistakes to Avoid</h2>
              <ul className="benefit-list" style={{ '--accent': '#ef4444' }}>
                {details.mistakes.map((mistake, i) => (
                  <li key={i}>{mistake}</li>
                ))}
              </ul>
            </div>

            <div className="sub-section">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-container">
                {details.faqs.map((faq, idx) => (
                  <FAQAccordion key={idx} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="content-sidebar">
          <div className="content-card sidebar-card privacy-card">
            <h3>Pro Tips</h3>
            <ul className="tip-list">
              {details.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="content-card sidebar-card">
            <h3>Ready to start?</h3>
            <Link to={guide.toolPath} className="btn btn-primary" style={{ width: '100%' }}>
              Open {guide.title} Tool
            </Link>
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-soft)', textAlign: 'center' }}>
              100% Free & Private
            </p>
          </div>
        </div>
      </div>

      <div className="content-card" style={{ marginTop: '4rem', padding: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ margin: 0 }}>Related Guides</h2>
          <Link to="/guides" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--accent)' }}>View All</Link>
        </div>
        <div className="card-grid" style={{ marginTop: 0, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {relatedGuides.map((g) => (
            <Link key={g.slug} to={`/guides/${g.slug}`} className="tool-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>{g.title}</h3>
              <p style={{ fontSize: '0.9rem' }}>{g.blurb}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="disclaimer-text" style={{ marginTop: '4rem' }}>
        <p>Disclaimer: Our tools provide best-effort local processing. While we prioritize accuracy and privacy, users are responsible for verifying the final results. No data is stored or transmitted by this website.</p>
      </div>
    </div>
  );
}