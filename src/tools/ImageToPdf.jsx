import React, { useState } from 'react';
import ToolShell from '../components/ToolShell';
import FileDrop from '../components/FileDrop';
import { jsPDF } from 'jspdf';
import ProgressBar from '../components/ProgressBar';

export default function ImageToPdf() {
  const [files, setFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [processing, setProcessing] = useState(false);

  const processImages = async (selectedFiles) => {
    setProcessing(true);
    setFiles(selectedFiles);
    
    try {
      const pdf = new jsPDF();
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const dataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });

        const img = new Image();
        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = dataUrl;
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgRatio = img.width / img.height;
        const pdfRatio = pdfWidth / pdfHeight;

        let finalW = pdfWidth;
        let finalH = pdfHeight;

        if (imgRatio > pdfRatio) {
          finalH = pdfWidth / imgRatio;
        } else {
          finalW = pdfHeight * imgRatio;
        }

        const x = (pdfWidth - finalW) / 2;
        const y = (pdfHeight - finalH) / 2;

        if (i > 0) pdf.addPage();
        pdf.addImage(dataUrl, file.type === 'image/png' ? 'PNG' : 'JPEG', x, y, finalW, finalH);
      }

      const blob = pdf.output('blob');
      setPdfUrl(URL.createObjectURL(blob));
    } catch (e) {
      console.error(e);
      alert("Failed to generate PDF");
    } finally {
      setProcessing(false);
    }
  };

  const seoData = {
    what: "This tool combines one or multiple images (JPG, PNG) into a single PDF document. Ideal for scanning receipts, notes, or creating photo albums.",
    how: "Using the jsPDF library, your browser reads each image, calculates the best fit for a standard A4 PDF page, and embeds the image data into a binary PDF structure. No servers are involved.",
    example: "You took photos of several pages of a contract with your phone. You can drop them all here to generate a single, easily shareable PDF document.",
    interpretation: "The output is a standard PDF file containing your images, centered on each page.",
    faqs: [
      { q: "Can I upload multiple images at once?", a: "Yes, you can select or drag-and-drop multiple images. They will be added to the PDF in the order you select them." },
      { q: "Are my sensitive documents secure?", a: "Yes. Processing is entirely local. We don't upload your images to any cloud storage." },
      { q: "Is the image quality reduced?", a: "The tool embeds the images as they are, but resizing them to fit the PDF dimensions might visually scale them. The underlying data remains relatively intact depending on the format." }
    ]
  };

  return (
    <ToolShell 
      title="Image to PDF" 
      description="Convert and combine multiple images into a single PDF file instantly."
      seoData={seoData}
      canonicalPath="/make-image-to-pdf"
    >
      {!pdfUrl ? (
        processing ? (
          <div style={{padding: '3rem', textAlign: 'center'}}>
            <h3>Generating PDF...</h3>
            <ProgressBar progress={100} text="Compiling images locally" />
          </div>
        ) : (
          <FileDrop onFileSelect={processImages} accept="image/*" multiple={true} />
        )
      ) : (
        <div className="result-area">
          <h3>PDF Generated!</h3>
          <p>{files.length} image(s) combined into a single PDF.</p>
          <div style={{marginTop: '1.5rem'}}>
            <a href={pdfUrl} download="converted_document.pdf" className="btn">
              Download PDF
            </a>
            <button onClick={() => {setFiles([]); setPdfUrl(null)}} className="btn" style={{background: 'var(--text-light)', marginLeft: '1rem'}}>
              Make Another
            </button>
          </div>
        </div>
      )}
    </ToolShell>
  );
}