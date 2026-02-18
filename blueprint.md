# Project Blueprint: Image/Document Conversion Tool

## 1. Overview

This document outlines the development plan for a single-file, client-side web application for common image and document conversions. The tool is designed for ease of use, privacy, and modern web standards. All processing is done in the browser, and no user data is ever uploaded to a server.

## 2. Core Features & Design

### General UI/UX
- **Layout**: A clean, responsive, tab-based interface.
- **Branding**: "이미지 변환 도구" as the main title.
- **Aesthetics**: Modern design with clear typography, intuitive controls, and a professional color scheme. Large, touch-friendly buttons and a minimum font size of 16px for accessibility.
- **Feedback**: Visual feedback for file selection, conversion progress (progress bars), and completion (previews and download links).
- **Privacy**: A clear and prominent notice in the footer stating that all files are processed locally on the user's device.

### Conversion Modules (Tabs)
1.  **HEIC → JPG**: Converts HEIC/HEIF files to JPEG format.
2.  **WEBP → JPG**: Converts WebP files to JPEG format.
3.  **PNG → JPG**: Converts PNG files to JPEG, with an option to control quality/compression.
4.  **JPG → PNG**: Converts JPEG files to PNG format.
5.  **Image Compression**: Reduces the file size of JPG, PNG, and WebP images with quality controls.
6.  **JPG → PDF**: Merges multiple JPEG images into a single PDF document.
7.  **Favicon Maker**: Creates a `.ico` file and a `.zip` package with various icon sizes from a single input image.

### Common Functionality
- **File Input**: Drag-and-drop area and a standard file selection button.
- **Batch Processing**: Support for converting multiple files at once.
- **Downloads**:
    - Single converted file: Direct download.
    - Multiple converted files: Bundled and downloaded as a single `.zip` file.
- **Error Handling**: Clear, user-friendly error messages displayed in Korean.

## 3. Technical Implementation

- **Architecture**: A single `index.html` file containing all HTML, CSS, and JavaScript. No build tools required.
- **Dependencies (via CDN)**:
    - **heic2any**: For HEIC to JPG conversion.
    - **jsPDF**: For creating PDF documents from images.
    - **JSZip**: For creating `.zip` archives for batch downloads.
- **Core Logic**:
    - **Image Manipulation**: The native `Canvas` API will be used for decoding/encoding standard image formats (JPG, PNG, WebP) and for resizing images.
    - **Modularity**: JavaScript code will be organized into functions for each conversion type to ensure readability and maintainability.
    - **State Management**: Simple variables will track the active tab, selected files, and conversion results.

## 4. Development Plan (Current Task)

- **Step 1: Project Cleanup**: Remove existing `main.js` and `style.css` to prepare for a single-file structure.
- **Step 2: Create `index.html`**:
    - **HTML Structure**: Set up the main page layout with the header, tab navigation, content sections for each tool, and the footer.
    - **CSS Styling**: Embed all styles within a `<style>` tag for a modern, responsive, and visually appealing interface.
    - **JavaScript Implementation**: Embed all application logic within a `<script>` tag.
        - Import necessary libraries (heic2any, jsPDF, JSZip) from CDNs.
        - Implement tab switching logic.
        - Develop file handling and drag-and-drop functionality.
        - Write the core conversion functions for each of the 7 modules.
        - Add utility functions for file download, zip creation, and displaying results/errors.
        - Attach all necessary event listeners to UI elements.
- **Step 3: Finalization**: Add comprehensive comments to the code and perform a final review to ensure all requirements are met.
