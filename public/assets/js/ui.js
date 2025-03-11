// UI initialization and event handling

const { ipcRenderer } = require('electron');
const CodeMirror = require('codemirror');
// Add required CodeMirror mode
require('codemirror/mode/markdown/markdown');

// Store current state
let currentFilePath = null;
let currentMarkdown = '';
let isDirty = false;
let currentFlavor = 'commonmark';
let currentTextAlignment = 'left'; // Default alignment

// DOM Elements
let editorContainer;
let previewContainer;
let openFileBtn;
let savePdfBtn;
let flavorSelector;
let textAlignmentSelector;
let statusMessage;
let editor;

// Initialize the editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing UI');
  
  // Get DOM elements
  editorContainer = document.getElementById('markdown-editor');
  previewContainer = document.getElementById('preview');
  openFileBtn = document.getElementById('open-file-btn');
  savePdfBtn = document.getElementById('save-pdf-btn');
  flavorSelector = document.getElementById('markdown-flavor');
  textAlignmentSelector = document.getElementById('text-alignment');
  statusMessage = document.getElementById('status-message');
  
  console.log('Editor container:', editorContainer);
  console.log('Preview container:', previewContainer);
  
  if (!editorContainer) {
    console.error('Editor container not found');
    return;
  }
  
  // Add a test element to verify the preview pane is working
  const testElement = document.createElement('div');
  testElement.style.padding = '10px';
  testElement.style.backgroundColor = '#f0f0f0';
  testElement.style.border = '1px solid #ddd';
  testElement.style.margin = '10px';
  testElement.textContent = 'Test preview content';
  previewContainer.appendChild(testElement);
  console.log('Test element added to preview container');
  console.log('Preview container children count after test:', previewContainer.children.length);
  
  // Initialize CodeMirror
  console.log('Initializing CodeMirror editor');
  editor = CodeMirror(editorContainer, {
    mode: 'markdown',
    lineNumbers: true,
    lineWrapping: true,
    theme: 'default',
    autofocus: true
  });
  
  // Set initial content
  const sampleMarkdown = `# Welcome to MD2PDF

A simple, open-source Markdown to PDF converter.

## Features

- Convert Markdown to PDF
- Support for multiple Markdown flavors:
  - CommonMark
  - GitHub Flavored Markdown
  - Custom extensions

## How to use

1. Write or paste your Markdown in the editor
2. Select your preferred Markdown flavor
3. Click "Export to PDF" to save

## Code Example

\`\`\`javascript
function helloWorld() {
  console.log("Hello, world!");
}
\`\`\`

Enjoy using MD2PDF!`;

  editor.setValue(sampleMarkdown);
  currentMarkdown = sampleMarkdown;
  
  // Listen for editor changes
  editor.on('change', () => {
    currentMarkdown = editor.getValue();
    isDirty = true;
    updatePreview();
  });
  
  // Event handlers
  if (openFileBtn) {
    openFileBtn.addEventListener('click', handleOpenFile);
  }
  
  if (savePdfBtn) {
    savePdfBtn.addEventListener('click', handleSavePdf);
  }
  
  if (flavorSelector) {
    flavorSelector.addEventListener('change', (e) => {
      currentFlavor = e.target.value;
      showStatus(`Markdown flavor changed to ${currentFlavor}`, 'normal');
      updatePreview();
    });
  }
  
  // Text alignment selector event handler
  if (textAlignmentSelector) {
    textAlignmentSelector.addEventListener('change', (e) => {
      currentTextAlignment = e.target.value;
      
      // Update preview pane with new alignment class
      if (previewContainer) {
        if (currentTextAlignment === 'center') {
          previewContainer.classList.add('text-center');
        } else {
          previewContainer.classList.remove('text-center');
        }
      }
      
      showStatus(`Text alignment changed to ${currentTextAlignment}`, 'normal');
      updatePreview();
    });
  }
  
  // Initial preview update with slight delay to ensure everything is loaded
  setTimeout(updatePreview, 500);
});

// Update the preview pane with HTML from Markdown
async function updatePreview() {
  if (!previewContainer) {
    console.error('Preview container not found');
    return;
  }
  
  try {
    // Log the first 100 characters of the markdown for debugging
    console.log('Updating preview with markdown:', currentMarkdown.substring(0, 100) + '...');
    
    // Try with a simple fixed markdown string if currentMarkdown is empty
    const markdownToConvert = currentMarkdown || '# Test Heading\n\nThis is a test paragraph.';
    
    // Convert markdown to HTML using the selected flavor
    const result = await ipcRenderer.invoke('convert-markdown', { 
      content: markdownToConvert,
      flavor: currentFlavor
    });

    if (result.error) {
      console.error('Preview error:', result.error);
      showStatus(result.error, 'error');
      return;
    }

    // Verify we received HTML content
    if (!result.html || typeof result.html !== 'string' || result.html.trim() === '') {
      console.error('Empty HTML result received from parser');
      
      // Create a fallback content
      const fallbackContent = `<div style="padding: 20px; background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; border-radius: 4px; margin: 10px;">
        <h3>Error: No HTML content received</h3>
        <p>The markdown parser returned an empty result. Please try a different markdown flavor or check the application logs.</p>
      </div>`;
      
      previewContainer.innerHTML = fallbackContent;
      return;
    }

    console.log('Received HTML preview:', result.html.substring(0, 100) + '...');
    
    // Create a wrapper for the content
    const wrapper = document.createElement('div');
    wrapper.style.padding = '20px';
    wrapper.innerHTML = result.html;
    
    // Clear existing content
    previewContainer.innerHTML = '';
    
    // Add the wrapper with HTML content
    previewContainer.appendChild(wrapper);
    
    console.log('Preview updated with HTML content');
    console.log('Preview container children count:', previewContainer.children.length);
    
    // Update status if needed
    if (isDirty) {
      showStatus('Document modified', 'normal');
    }
  } catch (error) {
    console.error('Preview update error:', error);
    showStatus(`Preview error: ${error.message}`, 'error');
    
    // Show error in preview
    previewContainer.innerHTML = `<div style="padding: 20px; background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; border-radius: 4px; margin: 10px;">
      <h3>Error Updating Preview</h3>
      <p>${error.message}</p>
    </div>`;
  }
}

// Handle open file
async function handleOpenFile() {
  try {
    const result = await ipcRenderer.invoke('open-file');
    
    if (result.canceled) return;
    
    if (result.error) {
      showStatus(result.error, 'error');
      return;
    }
    
    // Update current file path and content
    currentFilePath = result.path;
    currentMarkdown = result.content;
    
    // Update editor content
    editor.setValue(currentMarkdown);
    
    isDirty = false;
    showStatus(`Opened: ${getFileName(currentFilePath)}`, 'success');
  } catch (error) {
    showStatus(`Failed to open file: ${error.message}`, 'error');
  }
}

// Handle save PDF
async function handleSavePdf() {
  try {
    showStatus('Exporting PDF...', 'normal');
    
    const result = await ipcRenderer.invoke('save-pdf', {
      htmlContent: previewContainer.innerHTML,
      markdownFlavor: currentFlavor,
      textAlignment: currentTextAlignment
    });
    
    if (result.canceled) {
      showStatus('PDF export canceled', 'normal');
      return;
    }
    
    if (result.error) {
      showStatus(result.error, 'error');
      return;
    }
    
    showStatus(`PDF saved to: ${result.path}`, 'success');
  } catch (error) {
    showStatus(`Failed to save PDF: ${error.message}`, 'error');
  }
}

// Helper functions
function showStatus(message, type = 'normal') {
  if (!statusMessage) return;
  
  statusMessage.textContent = message;
  statusMessage.className = '';
  
  if (type === 'error') {
    statusMessage.classList.add('status-error');
  } else if (type === 'success') {
    statusMessage.classList.add('status-success');
  }
}

function getFileName(filePath) {
  if (!filePath) return 'Untitled';
  return filePath.split(/[\\/]/).pop();
}

// Log that the script has loaded
console.log('UI.js loaded');