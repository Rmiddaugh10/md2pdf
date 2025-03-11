// Renderer factory module
// Creates and returns the appropriate renderer for the specified output format

const PDFRenderer = require('./pdfRenderer');

/**
 * Create a renderer for the specified output format
 * @param {string} format - The output format (pdf)
 * @param {object} options - Renderer options
 * @returns {object} A renderer object with a render method
 */
function createRenderer(format, options = {}) {
  switch (format.toLowerCase()) {
    case 'pdf':
      return new PDFRenderer(options);
      
    // Can add more renderers in the future (e.g., DOCX, EPUB)
    
    default:
      throw new Error(`Unsupported output format: ${format}`);
  }
}

module.exports = {
  createRenderer
};