# Project Blueprint: ImageConverter

## Overview
ImageConverter is a privacy-focused web application that provides various image manipulation tools. It leverages modern web standards and libraries to perform all processing locally in the user's browser, ensuring maximum security and speed.

## Current State & Features
- **Modern React Architecture**: Built with React 18 and Vite for performance.
- **Privacy First**: No server-side processing; all tools run in-browser.
- **Tool Suite**:
  - Metadata removal (EXIF).
  - High-quality format conversion (PNG, JPG, HEIC, WEBP).
  - Document tools (Image to PDF).
  - Privacy tools (Blur Face/Mosaic).
  - Design tools (Favicon Generator, Color Palette).
  - Utility tools (Resize, Crop, OCR).
- **SEO Optimized**: Dynamic meta tags and SEO-friendly structure.
- **Responsive Design**: Fully responsive layout with modern CSS features.

## Project Structure
- `src/components/`: Reusable UI components (Layout, SEO, ToolCards, etc.).
- `src/tools/`: Implementation of individual image tools.
- `src/pages/`: Main application pages (Home, About, Legal).
- `src/data/`: Static data such as guides and tool configurations.

## Planned Changes / Tasks
- [x] Initial implementation of all core tools.
- [x] SEO and Metadata setup.
- [x] Privacy and Terms pages.
- [x] Clean up homepage and navigation.
- [ ] Implement additional image filters.
- [ ] Add batch processing for more tools.
- [ ] Enhance OCR capabilities.
