# Image Converter & OCR Tool Project Blueprint

## Overview
This project is a framework-less (Vanilla JS) web-based image tool where all processing occurs within the browser without uploading files to an external server. It prioritizes privacy and speed, offering various image conversion and text extraction features. It includes optimizations for Google AdSense approval.

## Key Features & Design

### 1. Design & UX (Baseline Standard Compliant)
- **Responsive Design:** Optimized for mobile and desktop (95% container width, max 1200px).
- **Themes:** Supports Light and Dark modes (saved based on system settings and user choice).
- **Typography & Readability:** 18px base font, large buttons (1.2rem+) for improved mobile usability.
- **Feedback:** Progress percentages (%) for all tasks and result previews provided. Error messages displayed in English.

### 2. Image Conversion
- **HEIC → JPG:** Direct browser-side conversion using the `heic2any` library.
- **WEBP ↔ JPG, PNG ↔ JPG:** No-install conversion using the Canvas API.
- **JPG → PDF:** Merging multiple images into a single PDF using `jspdf`.
- **Favicon Generation:** Generate multiple sizes (16-64px) of PNGs and a ZIP package from a single upload.

### 3. Image Compression (Reduce Size)
- **Batch Processing:** Upload and compress multiple files simultaneously.
- **Resize Options:** Supports maintaining original size or resizing based on width (1920, 1280, 1080px).
- **Compression Method:** Canvas API-based. Adjustable quality settings (0.4-0.95).
- **Target Size Presets:** Binary search logic to automatically adjust quality when 200KB, 500KB, or 1MB targets are set.
- **Results:** Display pre/post-conversion sizes and reduction ratios, with individual/ZIP batch downloads.

### 4. Text Extraction (OCR)
- **Client-side OCR:** Performed in the browser using `Tesseract.js` without server transmission.
- **Supported Languages:** English + Korean (eng+kor).
- **Image Preprocessing:** Options for Grayscale, Contrast Enhancement, and Binarization (adjustable threshold) to improve accuracy.
- **Convenience Features:** Progress display, text copying, TXT file download, and reset functionality.
- **Security Emphasis:** Includes notice: "Images are processed only on my device."

## SEO & AdSense Optimization
- **Meta Tags:** Search engine optimization using `description`, `keywords`, and `OG (Open Graph)` tags.
- **Structured Data:** Applied `SoftwareApplication` schema (Schema.org JSON-LD).
- **Mandatory Policy Pages:** Created `privacy.html`, `terms.html`, `about.html`, and `contact.html` with footer links.
- **Crawler Support:** Created `robots.txt` and `sitemap.xml`.
- **Content Enrichment:** Secured textual content volume through tool descriptions and FAQ sections to prevent "Thin Content."

## Tech Stack
- **HTML5/CSS3:** Modern CSS (Logical Properties, Flexbox, Grid).
- **JavaScript:** ES Modules, Async/Await, Canvas API.
- **Libraries (CDN):**
  - `heic2any.js`: HEIC conversion
  - `jspdf`: PDF generation
  - `jszip`: Multi-file ZIP compression
  - `tesseract.js`: OCR functionality

## Future Plans
- **Image Crop & Rotate:** Add simple editing features before conversion.
- **Multi-language Expansion:** Add more language selection options for OCR.
- **PWA Support:** Apply Service Workers for offline use.
