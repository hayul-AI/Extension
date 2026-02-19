# Image Converter & OCR Tool Project Blueprint

## Overview
This project is a framework-less (Vanilla JS) web-based image tool where all processing occurs within the browser without uploading files to an external server. It prioritizes privacy and speed, offering various image conversion and text extraction features. It includes optimizations for Google AdSense approval.

## Key Features & Design

### 1. Design & UX (Baseline Standard Compliant)
- **Responsive Design:** Optimized for mobile and desktop (95% container width, max 1200px).
- **Themes:** Supports Light and Dark modes (saved based on system settings and user choice).
- **Typography & Readability:** 18px base font, large buttons (1.2rem+) for improved mobile usability.
- **Feedback:** Progress percentages (%) for all tasks and result previews provided. Error messages displayed in English.
- **Navigation (Enhanced):** 
    - Desktop uses a high-readability grid for tool tabs.
    - **Font Sizes:** Increased to 20px (Desktop default), 22px (Active tab), and 16-18px (Mobile).
    - **Visual Prominence:** Active tab is larger (`scale(1.05)`) with a prominent shadow and distinct color contrast.
    - **Interactivity:** Added smooth hover feedback (background shifts, elevation) using cubic-bezier transitions.
    - **AdSense Ready:** Clean, modern SaaS aesthetic with clear spacing and touch-friendly targets.

### 2. Image Conversion & Transformation
- **HEIC → JPG:** Direct browser-side conversion using `heic2any`.
- **WEBP ↔ JPG, PNG ↔ JPG:** No-install conversion using the Canvas API.
- **Resize & Center Crop:** 
    - Center-crops images to specific dimensions (1:1, 16:9, 9:16) or custom sizes using Canvas.
    - **Contained Preview Viewport:** (New) Implemented a responsive preview container (`preview-viewport`) with a fixed max-height (520px). The preview frame automatically scales to fit within this viewport while perfectly maintaining the target aspect ratio.
    - **Live Aspect Updates:** Real-time visual feedback when changing dimensions or clicking presets (HD, Square, Story).
    - **Advanced Interactions:** Supports move (pan) and zoom within the crop frame using mouse/touch. Includes a reset feature to re-center.
- **EXIF / Metadata Remover:** (New) Strips private information (GPS, device model, date) from JPG images using `piexifjs`.
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
- **Initialization Fix:** Resolved timeout issue by increasing initialization timeout to 60s and optimizing Tesseract.js v5 creation logic.
- **Asset Delivery Fix:** Fixed incorrect Content-Type headers in `firebase.json` that caused execution failures for OCR scripts.
- **Image Preprocessing:** Options for Grayscale, Contrast Enhancement, and Binarization (adjustable threshold) to improve accuracy.
- **Grammar Check Enhancement:** (New) Automated language detection (KR/EN) for grammar checking. Removed manual language selector.
- **Resilient Engine Connectivity:** Improved error handling for LanguageTool API with retry logic and descriptive connectivity alerts.
- **Convenience Features:** Progress display, text copying, TXT file download, and reset functionality.

### 5. Utility Tools
- **Color Palette Extractor:** (New) Extracts top 8 dominant colors from an image using pixel sampling and frequency sorting. Supports HEX code copying.

## SEO & AdSense Optimization
- **Meta Tags:** Search engine optimization using `description`, `keywords`, and `OG (Open Graph)` tags.
- **Site Verification:** Added Naver site verification meta tag for improved search visibility in the Korean market.
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
  - `piexifjs`: Metadata removal

## Guides & SEO Optimization
- **Tutorial Content:** Created a dedicated `/guides/` directory with 5 initial technical tutorials covering HEIC, WebP, Compression, OCR, and EXIF privacy.
- **Routing Fix:** Implemented absolute path routing (`/guides/<slug>.html`) to ensure compatibility with Firebase Hosting `cleanUrls` configuration, resolving 404 errors.
- **Navigation:** Integrated a "PixelConvert Guides" index page and linked it globally in the application header and footer.

## Future Plans
- **Advanced Editing:** Add manual crop area selection and filters.
- **PWA Support:** Apply Service Workers for offline use.
