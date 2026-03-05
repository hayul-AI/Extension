import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { guides } from '../data/guides';

export default function GuidesHub() {
  return (
    <div className="content-page-wrapper">
      <Helmet>
        <title>Tool Guides | Free Online Image Converter</title>
        <meta name="description" content="Learn how to use our professional image tools. Detailed guides on EXIF removal, image conversion, PDF creation, and more." />
      </Helmet>

      <div className="content-header">
        <h1>Tool Guides</h1>
        <p className="intro-text">
          Master our suite of professional image utilities. All our tools are designed with privacy in mind, meaning every step of the process—from conversion to extraction—happens entirely on your own device. No files are ever uploaded to our servers.
        </p>
        <p className="intro-text">
          Below you'll find comprehensive guides for each of our tools, helping you get the best possible results while keeping your data 100% secure.
        </p>
      </div>

      <div className="card-grid" style={{ marginTop: '2rem' }}>
        {guides.map((guide) => (
          <div key={guide.slug} className="tool-card">
            <h3>{guide.title}</h3>
            <p>{guide.blurb}</p>
            <div className="btn-group" style={{ marginTop: 'auto', paddingTop: '1.5rem', justifyContent: 'flex-start' }}>
              <Link to={`/guides/${guide.slug}`} className="btn btn-primary" style={{ width: 'auto', minWidth: '120px' }}>
                Read Guide
              </Link>
              <Link to={guide.toolPath} className="btn btn-secondary" style={{ width: 'auto', minWidth: '100px' }}>
                Open Tool
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="content-card" style={{ marginTop: '5rem', padding: '3rem', textAlign: 'center' }}>
        <h2>Why we process everything locally</h2>
        <p style={{ maxWidth: '800px', margin: '1.5rem auto', color: 'var(--text-soft)', lineHeight: '1.8' }}>
          Conventional online converters require you to send your sensitive photos and documents to their remote servers. This creates significant privacy risks and relies on your internet upload speed.
        </p>
        <p style={{ maxWidth: '800px', margin: '1.5rem auto', color: 'var(--text-soft)', lineHeight: '1.8' }}>
          Our tools use modern web technologies like WebAssembly and specialized JavaScript libraries to move the "heavy lifting" to your own browser. This means instant processing, zero privacy concerns, and the ability to work even with large files without worrying about server timeouts.
        </p>
      </div>
    </div>
  );
}