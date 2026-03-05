export const guides = [
 { 
   slug:"remove-exif", 
   title:"Remove EXIF", 
   blurb:"Strip sensitive metadata from your photos securely.", 
   toolPath:"/tool-remove-exif",
   description: "Learn how to protect your privacy by removing hidden EXIF data from your digital photographs.",
   details: {
     whatFor: "EXIF (Exchangeable Image File Format) data is hidden metadata embedded in photos that can reveal your GPS coordinates, camera model, date, time, and exposure settings. Removing this data is essential for maintaining privacy before sharing images online.",
     whenToUse: "Use this tool before posting photos to social media, forums, or sharing them via messaging apps, especially if the photos were taken at your home or other private locations.",
     steps: [
       "Select the photo you want to clean using the upload area.",
       "Wait a moment while our local processor strips the metadata headers.",
       "Download the new, clean version of your image.",
       "Verify the removal by checking file properties on your device."
     ],
     howItWorks: "Our tool works entirely in your browser using the HTML5 Canvas API. By redrawing the image onto a fresh canvas and exporting it, the original metadata headers are never copied to the new file. No data is ever sent to our servers.",
     tips: [
       "Always keep your original photo as a backup.",
       "Removing EXIF data can sometimes slightly reduce file size as a side benefit.",
       "This process is irreversible on the downloaded copy, so ensure you don't need the metadata later."
     ],
     mistakes: [
       "Forgetting to clean photos taken with professional DSLR cameras which often store copyright and hardware info.",
       "Assuming that simply renaming a file removes its metadata."
     ],
     faqs: [
       { q: "Will my photo quality decrease?", a: "No, we use high-quality redraw settings to ensure the visible image remains identical." },
       { q: "Does this work on all image formats?", a: "It works best on JPG and PNG formats, which are the most common carriers of EXIF data." }
     ]
   }
 },
 { 
   slug:"png-to-jpg", 
   title:"PNG to JPG", 
   blurb:"Convert PNG images to JPG format while maintaining quality.", 
   toolPath:"/online-png-to-jpg",
   description: "A comprehensive guide on converting PNG files to JPG for better compatibility and smaller file sizes.",
   details: {
     whatFor: "PNG files are excellent for graphics with transparency, but they can be quite large. JPG is the industry standard for photographs and offers much better compression for sharing and web use.",
     whenToUse: "Use this when you have a large high-resolution PNG that needs to be smaller for an email attachment, a website upload, or to save storage space.",
     steps: [
       "Drag and drop your PNG file into the converter zone.",
       "The tool instantly converts the image using your browser's processing power.",
       "Choose the 'Download JPG' option to save the result.",
       "Check the file size difference compared to your original PNG."
     ],
     howItWorks: "The conversion happens locally. Your browser decodes the PNG data and encodes it into a standard JPG format using optimized compression algorithms. This ensures speed and absolute privacy.",
     tips: [
       "JPG does not support transparency, so any transparent areas will turn white.",
       "For the best balance of quality and size, our converter uses a high-fidelity compression setting.",
       "If you need to keep transparency, consider keeping the file as a PNG or using WebP."
     ],
     mistakes: [
       "Converting a logo with a transparent background to JPG and then finding it has a white box around it.",
       "Over-compressing an image which can lead to visible artifacts."
     ],
     faqs: [
       { q: "Is the conversion free?", a: "Yes, all our tools are 100% free to use." },
       { q: "Are my files uploaded?", a: "No, everything is processed directly in your browser." }
     ]
   }
 },
 { 
   slug:"jpg-to-png", 
   title:"JPG to PNG", 
   blurb:"Turn JPG images into high-quality transparent PNGs.", 
   toolPath:"/online-jpg-to-png",
   description: "Understand the benefits of converting JPG to PNG and how to do it losslessly.",
   details: {
     whatFor: "Converting JPG to PNG is often the first step in graphic design or when you need a lossless format for further editing. While it doesn't add transparency automatically, it prevents further quality loss.",
     whenToUse: "When you want to start editing a photo and want to save it in a format that won't degrade every time you press save.",
     steps: [
       "Upload your JPG file.",
       "The browser converts the compressed JPG into a lossless PNG container.",
       "Download the resulting PNG file.",
       "Open it in your favorite editor for further work."
     ],
     howItWorks: "Local processing ensures that the pixel-perfect representation of your JPG is wrapped in a PNG header. No data leaves your machine.",
     tips: [
       "PNG files are usually larger than JPGs because they don't use lossy compression.",
       "This conversion won't make a blurry JPG look sharp, but it will keep it from getting blurrier.",
       "Use PNG for graphics with text or sharp lines."
     ],
     mistakes: [
       "Expecting the background to disappear automatically (you'll need a separate background remover for that).",
       "Using PNG for large photo galleries where JPG would save significant bandwidth."
     ],
     faqs: [
       { q: "Will the file size increase?", a: "Yes, typically PNG files are larger than JPGs." },
       { q: "Is this tool safe for sensitive documents?", a: "Yes, because it's 100% local." }
     ]
   }
 },
 { 
   slug:"heic-to-jpg", 
   title:"HEIC to JPG", 
   blurb:"Convert Apple HEIC photos to compatible JPG format.", 
   toolPath:"/convert-heic-to-jpg",
   description: "A guide to making your iPhone HEIC photos viewable on any device by converting them to JPG.",
   details: {
     whatFor: "HEIC is Apple's high-efficiency format. While great for iPhones, it's often incompatible with Windows, older Androids, and many websites. JPG is the universal fix.",
     whenToUse: "When you've transferred photos from an iPhone to a PC and can't open them, or when a website tells you 'File format not supported'.",
     steps: [
       "Select your HEIC files.",
       "Wait for the local decoder to process the high-efficiency data.",
       "Download the resulting JPGs.",
       "You can now view or upload these anywhere."
     ],
     howItWorks: "We use a specialized JavaScript decoder that runs in your browser to read the HEVC-encoded HEIC data and output a standard JPG.",
     tips: [
       "Converting HEIC to JPG usually increases the file size slightly.",
       "Ensure your browser is up to date for the best performance.",
       "You can convert multiple files to save time."
     ],
     mistakes: [
       "Assuming you need to pay for software to open HEIC files on Windows.",
       "Deleting original HEIC files before checking the quality of the conversion."
     ],
     faqs: [
       { q: "Is HEIC better than JPG?", a: "HEIC has better compression but lower compatibility." },
       { q: "Why does conversion take a few seconds?", a: "HEIC is a complex format that requires more processing power to decode." }
     ]
   }
 },
 { 
   slug:"webp-to-jpg", 
   title:"WebP to JPG", 
   blurb:"Fast conversion from WebP images to standard JPGs.", 
   toolPath:"/convert-webp-to-jpg",
   description: "How to convert modern WebP images back to the more compatible JPG format.",
   details: {
     whatFor: "WebP is Google's modern image format for the web. While it's fast for websites, many offline tools and older apps don't support it yet.",
     whenToUse: "When you download an image from a site and it's a .webp file, but you need it as a .jpg for a presentation or a legacy application.",
     steps: [
       "Upload the WebP image.",
       "Instant local conversion to JPG.",
       "Download the compatible version.",
       "Use it in any application without compatibility worries."
     ],
     howItWorks: "Your browser natively supports WebP, so it can quickly render it to an internal canvas and save it out as a JPG.",
     tips: [
       "WebP is often smaller than JPG, so expect the JPG to be slightly larger.",
       "If the WebP is animated, this tool will typically capture the first frame.",
       "Keep your original WebP if you plan to re-upload it to a website later."
     ],
     mistakes: [
       "Converting WebP to JPG for web use (usually WebP is faster for browsers).",
       "Forgetting that WebP supports transparency, which JPG does not."
     ],
     faqs: [
       { q: "Does this work on all browsers?", a: "Yes, all modern browsers support WebP and this conversion method." },
       { q: "Are there limits on file size?", a: "Only the limits of your own computer's memory." }
     ]
   }
 },
 { 
   slug:"image-to-pdf", 
   title:"Image to PDF", 
   blurb:"Turn multiple images into a single PDF with A4 support, margin control, and quality settings.", 
   toolPath:"/tools/image-to-pdf",
   description: "Step-by-step instructions on creating professional PDF documents from your image files.",
   details: {
     whatFor: "This tool allows you to bundle several images—like scanned pages of a document or photos from a trip—into a single, easy-to-share PDF file.",
     whenToUse: "Ideal for submitting multi-page applications, creating digital portfolios, or organizing receipts for taxes.",
     steps: [
       "Add all the images you want in your PDF.",
       "Drag to reorder the pages as needed.",
       "Select your page size (A4 or Auto) and margins.",
       "Click 'Create PDF' and download your document."
     ],
     howItWorks: "We use high-performance libraries that run entirely in your browser to generate a binary PDF file from your pixel data.",
     tips: [
       "Use the 'Fit' mode to ensure your entire image is visible on the PDF page.",
       "Standard A4 size is best for documents intended for printing.",
       "Adjust quality to 'Small' if you need to email the PDF and have a size limit."
     ],
     mistakes: [
       "Uploading images in the wrong order (remember you can reorder them easily).",
       "Using very high quality for 50+ pages, which can make the PDF massive."
     ],
     faqs: [
       { q: "Can I add different image types?", a: "Yes, you can mix JPG, PNG, and WebP in one PDF." },
       { q: "Is the PDF password protected?", a: "Not currently, we focus on fast conversion and privacy." }
     ]
   }
 },
 { 
   slug:"blur-face-mosaic", 
   title:"Blur Face / Mosaic", 
   blurb:"Censor sensitive areas instantly. 100% local.", 
   toolPath:"/tools/blur-face",
   description: "A guide on using the blur and mosaic tools to censor sensitive information in your photos.",
   details: {
     whatFor: "Censoring faces, license plates, addresses, or any sensitive text in your images before sharing them publicly.",
     whenToUse: "When you want to share a group photo but some people don't want their faces shown, or when posting a photo of your car online.",
     steps: [
       "Open the Blur Face tool and upload your image.",
       "Select either 'Blur' or 'Mosaic' effect.",
       "Drag your mouse over the areas you want to hide.",
       "Adjust the strength slider if needed, then download the censored image."
     ],
     howItWorks: "The tool applies a mathematical convolution filter (blur) or a pixel-grouping algorithm (mosaic) directly to the canvas area you select.",
     tips: [
       "Mosaic is often better for technical data like numbers.",
       "Blur looks more natural for background elements.",
       "Always double-check that you've covered the entire sensitive area."
     ],
     mistakes: [
       "Using a blur strength that is too low, potentially allowing some data to be recovered.",
       "Forgetting to blur reflections in mirrors or windows."
     ],
     faqs: [
       { q: "Can the blur be removed?", a: "Once you download the image, the blur is permanent on that file." },
       { q: "Is it AI-based?", a: "The selection is manual to give you 100% control over what is hidden." }
     ]
   }
 },
 { 
   slug:"favicon-generator", 
   title:"Favicon Generator", 
   blurb:"Create multi-size favicon packs for your websites.", 
   toolPath:"/generate-favicon-now",
   description: "How to create a professional set of favicons for all devices and browsers.",
   details: {
     whatFor: "A favicon is the small icon that appears in browser tabs. A proper generator creates icons for desktops, iPhones, and Android devices all at once.",
     whenToUse: "Whenever you are launching a new website or branding a project and want it to look professional on every platform.",
     steps: [
       "Upload your square logo (ideally 512x512 pixels).",
       "The tool generates a dozen different sizes automatically.",
       "Download the ZIP file containing all the necessary files.",
       "Follow the included instructions to add them to your site's HTML."
     ],
     howItWorks: "Local resizing ensures your high-res logo is perfectly downsampled into all standard sizes required by modern web standards.",
     tips: [
       "Use a PNG with transparency for the best look.",
       "Simple icons work better than complex logos at small sizes.",
       "The apple-touch-icon is what users see when they save your site to their iPhone home screen."
     ],
     mistakes: [
       "Using a non-square image which can lead to distortion.",
       "Only providing a 16x16 icon, which will look blurry on high-resolution screens."
     ],
     faqs: [
       { q: "What sizes are included?", a: "We include all standard sizes from 16x16 up to 192x192 and more." },
       { q: "Do I get a .ico file?", a: "We provide modern PNGs which are now recommended for most use cases." }
     ]
   }
 },
 { 
   slug:"resize-crop", 
   title:"Resize & Crop", 
   blurb:"Perfectly adjust image dimensions and aspect ratios.", 
   toolPath:"/image-resize-and-crop",
   description: "Master the art of image resizing and cropping with our interactive local editor.",
   details: {
     whatFor: "Adjusting the actual pixels of your image to fit specific social media requirements, blog post layouts, or print dimensions.",
     whenToUse: "When you have a great photo but it's the wrong shape for an Instagram story, or it's too large for a website's file limit.",
     steps: [
       "Upload your image to the interactive editor.",
       "Use the wheel to zoom and drag to position your image.",
       "Choose an aspect ratio like 16:9 or 1:1.",
       "Apply any filters or text, then download your perfectly cropped result."
     ],
     howItWorks: "Our advanced canvas editor runs entirely in your browser, using hardware acceleration to give you smooth real-time control.",
     tips: [
       "9:16 is the standard for TikTok and Instagram stories.",
       "1:1 is perfect for profile pictures.",
       "Avoid upscaling (making small images big) as it always leads to loss of quality."
     ],
     mistakes: [
       "Not checking the final pixel dimensions before downloading.",
       "Accidentally cropping out important parts of the subject."
     ],
     faqs: [
       { q: "Can I add text?", a: "Yes, our editor allows you to add and rotate text overlays." },
       { q: "Is there an undo button?", a: "Yes, we support full undo/redo for your edits." }
     ]
   }
 },
 { 
   slug:"color-palette", 
   title:"Color Palette", 
   blurb:"Extract dominant color schemes from any image.", 
   toolPath:"/get-color-palette",
   description: "A guide to extracting beautiful, professional color schemes from your favorite images.",
   details: {
     whatFor: "This tool 'looks' at your image and picks out the most important colors, giving you the exact HEX and RGB codes for your own designs.",
     whenToUse: "When you're designing a website or room and want to match the colors of a specific photograph or brand asset.",
     steps: [
       "Upload your reference image.",
       "The AI instantly picks the top 6 colors.",
       "Or, use the interactive picker to select any specific pixel.",
       "Save your favorite colors to your personal palette and export them as JSON."
     ],
     howItWorks: "A quantization algorithm analyzes the pixel distribution to find clusters of dominant hues, while the interactive picker reads raw pixel data on click.",
     tips: [
       "Images with a lot of variety give more interesting palettes.",
       "Use the 'Copy All' feature to quickly paste colors into CSS or design software.",
       "Your saved palette is stored in your browser so you won't lose it if you refresh."
     ],
     mistakes: [
       "Using a very low-quality image which might have 'muddy' colors from compression.",
       "Expecting the palette to perfectly match every single pixel (it finds the *dominant* ones)."
     ],
     faqs: [
       { q: "Can I export the palette?", a: "Yes, we support copy-to-clipboard and JSON export." },
       { q: "How many colors can I save?", a: "You can save as many as you like to your personal list." }
     ]
   }
 },
 { 
   slug:"ocr-to-text", 
   title:"OCR to Text", 
   blurb:"Extract editable text from images using high-power OCR.", 
   toolPath:"/extract-text-from-image",
   description: "Everything you need to know about extracting text from images using Optical Character Recognition.",
   details: {
     whatFor: "OCR (Optical Character Recognition) 'reads' the text inside an image and converts it into a digital format you can copy and paste.",
     whenToUse: "Digitizing receipts, translating signs from photos, or extracting text from a PDF screenshot that you can't select with your mouse.",
     steps: [
       "Select the document language (important for accuracy).",
       "Upload your image or document scan.",
       "Wait while the local Tesseract engine processes the image.",
       "Copy the extracted text from the output box."
     ],
     howItWorks: "We use a WebAssembly port of Tesseract.js, which brings industrial-strength OCR technology directly into your browser.",
     tips: [
       "High contrast (black text on white background) gives the best results.",
       "Ensure the image is not blurry or tilted.",
       "The engine needs to download language data on the first run, so don't close the tab."
     ],
     mistakes: [
       "Trying to read very messy handwriting (most OCR is optimized for printed text).",
       "Choosing the wrong language, which will lead to gibberish output."
     ],
     faqs: [
       { q: "Is it 100% accurate?", a: "It's very accurate for clear text but may require proofreading for complex layouts." },
       { q: "Which languages are supported?", a: "Over 10 major global languages are supported." }
     ]
   }
 }
];
