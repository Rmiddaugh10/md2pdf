// Main entry point for the application

const { app, BrowserWindow, ipcMain, dialog, session } = require('electron');
const path = require('path');
const fs = require('fs');
const { createParser } = require('./parser');
const { createRenderer } = require('./renderer');
const { initializeUI } = require('./ui');

// Keep a global reference of the window object
let mainWindow;
let uiController;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, '../public/assets/icons/icon.png')
  });

  // Set Content Security Policy
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';"]
      }
    });
  });

  // Initialize UI controller
  uiController = initializeUI(mainWindow);

  // Load the index.html file
  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));

  // Open DevTools in development mode
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Create window when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle IPC messages from the renderer process

// Open a markdown file
ipcMain.handle('open-file', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Markdown', extensions: ['md', 'markdown'] }
    ]
  });
  
  if (!canceled && filePaths.length > 0) {
    try {
      const content = fs.readFileSync(filePaths[0], 'utf8');
      return { path: filePaths[0], content };
    } catch (error) {
      return { error: `Failed to read file: ${error.message}` };
    }
  }
  
  return { canceled: true };
});

// Save PDF with text alignment options
ipcMain.handle('save-pdf', async (event, { htmlContent, markdownFlavor, textAlignment }) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: 'document.pdf',
    filters: [
      { name: 'PDF', extensions: ['pdf'] }
    ]
  });
  
  if (!canceled && filePath) {
    try {
      // Get the appropriate renderer with text alignment options
      const renderer = createRenderer('pdf', { textAlignment });
      
      // Render the HTML to PDF
      await renderer.render(htmlContent, filePath, { textAlignment });
      
      return { success: true, path: filePath };
    } catch (error) {
      return { error: `Failed to save PDF: ${error.message}` };
    }
  }
  
  return { canceled: true };
});

// Convert markdown to HTML with specified flavor
ipcMain.handle('convert-markdown', (event, { content, flavor }) => {
  try {
    console.log(`Converting markdown with flavor: ${flavor}`);
    console.log(`Markdown content (sample): ${content.substring(0, 100)}...`);
    
    // Validate the markdown content
    if (!content || typeof content !== 'string' || content.trim() === '') {
      console.error('Empty or invalid markdown content received');
      return { error: 'Empty or invalid markdown content' };
    }
    
    // Create a parser for the specified markdown flavor
    const parser = createParser(flavor || 'commonmark');
    
    // Validate the parser object
    if (!parser || typeof parser.parse !== 'function') {
      console.error('Invalid parser created:', parser);
      return { error: 'Failed to create a valid parser' };
    }
    
    // Parse the markdown to HTML
    const html = parser.parse(content);
    
    // Validate the HTML output
    if (!html || typeof html !== 'string') {
      console.error('Parser returned invalid HTML:', html);
      return { error: 'Parser produced invalid HTML output' };
    }
    
    console.log(`Parsed HTML (sample): ${html.substring(0, 100)}...`);
    
    return { html };
  } catch (error) {
    console.error('Markdown conversion error:', error);
    return { error: `Conversion failed: ${error.message}` };
  }
});

// Handle additional application events
app.on('will-quit', () => {
  // Clean up any temporary files or resources
});

// Check for updates on startup in production mode
if (!process.argv.includes('--dev')) {
  app.on('ready', () => {
    // Could implement update checking here
    console.log('Checking for updates...');
  });
}