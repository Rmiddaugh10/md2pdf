// PDF Renderer implementation
// Converts HTML to PDF using html-pdf-node library

const fs = require('fs');
const path = require('path');
const htmlPdf = require('html-pdf-node');

class PDFRenderer {
  constructor(options = {}) {
    // Default PDF options
    this.options = {
      format: 'A4',
      margin: {
        top: '50px',
        right: '50px',
        bottom: '50px',
        left: '50px'
      },
      printBackground: true,
      preferCSSPageSize: true,
      textAlignment: 'left', // Default text alignment
      ...options
    };
    
    // Initialize default CSS
    this.updateDefaultCss();
  }
  
  // Method to update CSS based on alignment
  updateDefaultCss() {
    const alignmentStyle = this.options.textAlignment === 'center' ? 
      'text-align: center;' : 'text-align: left;';
      
    const tableAlignment = this.options.textAlignment === 'center' ? 
      'margin-left: auto; margin-right: auto;' : '';
    
    // Default CSS to apply to the PDF
    this.defaultCss = `
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 100%;
        overflow-wrap: break-word;
        ${alignmentStyle}
      }
      
      h1, h2, h3, h4, h5, h6 {
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        font-weight: 600;
        ${alignmentStyle}
      }
      
      h1 { font-size: 2em; }
      h2 { font-size: 1.8em; }
      h3 { font-size: 1.6em; }
      h4 { font-size: 1.4em; }
      h5 { font-size: 1.2em; }
      h6 { font-size: 1em; }
      
      p {
        ${alignmentStyle}
      }
      
      code {
        font-family: Consolas, Monaco, 'Andale Mono', monospace;
        background-color: #f5f5f5;
        padding: 0.2em 0.4em;
        border-radius: 3px;
        font-size: 0.9em;
      }
      
      pre {
        background-color: #f5f5f5;
        padding: 1em;
        border-radius: 5px;
        overflow-x: auto;
      }
      
      pre code {
        background-color: transparent;
        padding: 0;
      }
      
      blockquote {
        margin: 1em 0;
        padding-left: 1em;
        border-left: 4px solid #ddd;
        color: #666;
      }
      
      table {
        border-collapse: collapse;
        width: 100%;
        margin: 1em 0;
        ${tableAlignment}
      }
      
      table, th, td {
        border: 1px solid #ddd;
      }
      
      th, td {
        padding: 8px;
        text-align: left;
      }
      
      th {
        background-color: #f5f5f5;
      }
      
      img {
        max-width: 100%;
      }
      
      a {
        color: #0366d6;
        text-decoration: none;
      }
      
      a:hover {
        text-decoration: underline;
      }
      
      ul, ol {
        padding-left: 2em;
      }
      
      .hljs {
        background: #f5f5f5;
        border-radius: 5px;
      }
      
      .text-center {
        text-align: center;
      }
    `;
  }
  
  /**
   * Render HTML content to a PDF file
   * @param {string} html - The HTML content to render
   * @param {string} outputPath - The path to save the PDF file
   * @param {object} customOptions - Custom rendering options
   * @returns {Promise<void>}
   */
  async render(html, outputPath, customOptions = {}) {
    try {
      // Combine custom options with default options
      const options = { ...this.options, ...customOptions };
      
      // Update default CSS if alignment changed
      if (customOptions.textAlignment && customOptions.textAlignment !== this.options.textAlignment) {
        this.options.textAlignment = customOptions.textAlignment;
        this.updateDefaultCss();
      }
      
      // Add default styling to the HTML
      const styledHtml = this.addDefaultStyling(html);
      
      // Create file object for html-pdf-node
      const file = { content: styledHtml };
      
      // Generate PDF
      const buffer = await htmlPdf.generatePdf(file, options);
      
      // Ensure the output directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Write the PDF to the file system
      fs.writeFileSync(outputPath, buffer);
      
      console.log(`PDF saved to: ${outputPath}`);
    } catch (error) {
      console.error('Error rendering PDF:', error);
      throw new Error(`Failed to render PDF: ${error.message}`);
    }
  }
  
  /**
   * Add default styling to the HTML
   * @param {string} html - The HTML content
   * @returns {string} - The HTML with added styling
   */
  addDefaultStyling(html) {
    // Check if HTML has a head section
    if (html.includes('<head>')) {
      // Insert CSS into existing head
      return html.replace(
        '<head>',
        `<head><style>${this.defaultCss}</style>`
      );
    } else if (html.includes('<html>')) {
      // Add head with CSS
      return html.replace(
        '<html>',
        `<html><head><style>${this.defaultCss}</style></head>`
      );
    } else {
      // Wrap with complete HTML structure
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>${this.defaultCss}</style>
        </head>
        <body class="${this.options.textAlignment === 'center' ? 'text-center' : ''}">
          ${html}
        </body>
        </html>
      `;
    }
  }
  
  /**
   * Set renderer options
   * @param {object} options - The new options to set
   */
  setOptions(options) {
    this.options = { ...this.options, ...options };
    
    // Update CSS if text alignment changed
    if (options.textAlignment !== undefined && options.textAlignment !== this.options.textAlignment) {
      this.updateDefaultCss();
    }
  }
  
  /**
   * Set custom CSS
   * @param {string} css - Custom CSS to use for rendering
   */
  setCustomCss(css) {
    this.defaultCss = css;
  }
}

module.exports = PDFRenderer;