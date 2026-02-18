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
- **Monetization**: Integrated Google AdSense with multiple responsive ad units.

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
- **Theme Support**: Dark mode and Light mode toggle to improve user experience in different lighting conditions.
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
- **AdSense Integration**:
    - Google AdSense script and account verification meta tag in `<head>`.
    - **Top Ad**: Responsive ad unit placed below the navigation bar.
    - **Bottom Ad**: Responsive ad unit placed above the footer.
    - `ads.txt` file in the root directory for seller verification.
- **Core Logic**:
    - **Image Manipulation**: The native `Canvas` API will be used for decoding/encoding standard image formats (JPG, PNG, WebP) and for resizing images.
    - **Modularity**: JavaScript code will be organized into functions for each conversion type to ensure readability and maintainability.
    - **State Management**: Simple variables will track the active tab, selected files, and conversion results.
    - **Theme Management**: Use CSS variables and `data-theme` attribute on the `<html>` or `<body>` element. Persist user preference in `localStorage`.

## 4. Development Plan (Completed Tasks)

- **Step 1: Implement Dark Mode**:
    - Add a theme toggle button in the header.
    - Define CSS variables for dark and light themes.
    - Update all UI components to use these variables.
    - Add JavaScript to handle theme switching and persistence.
- **Step 2: Google AdSense Integration**:
    - Added AdSense script and meta tag to `index.html`.
    - Created `ads.txt` with publisher information (`pub-6460078490158642`).
    - Inserted multiple responsive ad units, including a specific "광고 영역 (Ad Area)" section above the footer for enhanced visibility and compliance with requested layout.
- **Step 3: Refined Ad Layout**:
    - Replaced the standard bottom ad with a titled "광고 영역 (Ad Area)" section and a specific ad slot (`1234567890`) as requested.
