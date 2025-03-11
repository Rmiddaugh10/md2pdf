// UI initialization module
// This module handles integration between the main process and the renderer UI

const { ipcMain, BrowserWindow } = require('electron');
const path = require('path');

/**
 * Initialize the UI components and IPC event handlers
 * @param {BrowserWindow} mainWindow - The main application window
 */
function initializeUI(mainWindow) {
  // Register IPC handlers specific to UI functionality
  
  // Update window title with file name
  ipcMain.handle('update-title', (event, fileName) => {
    const title = fileName ? `${fileName} - MD2PDF` : 'MD2PDF';
    mainWindow.setTitle(title);
    return { success: true };
  });
  
  // Show confirmation dialog
  ipcMain.handle('show-confirmation', async (event, { title, message, buttons }) => {
    const { dialog } = require('electron');
    const result = await dialog.showMessageBox(mainWindow, {
      type: 'question',
      title: title || 'Confirm',
      message: message || 'Are you sure?',
      buttons: buttons || ['Yes', 'No'],
      defaultId: 1,
      cancelId: 1
    });
    
    return { confirmed: result.response === 0 };
  });
  
  // Show error dialog
  ipcMain.handle('show-error', async (event, { title, message }) => {
    const { dialog } = require('electron');
    await dialog.showMessageBox(mainWindow, {
      type: 'error',
      title: title || 'Error',
      message: message || 'An error occurred',
      buttons: ['OK']
    });
    
    return { acknowledged: true };
  });
  
  // Register window state events
  
  // Handle window resize events
  let debounceTimer;
  
  mainWindow.on('resize', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      // Save window size to user preferences (could be implemented)
      const [width, height] = mainWindow.getSize();
      console.log(`Window resized to: ${width}x${height}`);
    }, 500);
  });
  
  // Handle window maximize/unmaximize
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-state-change', { maximized: true });
  });
  
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-state-change', { maximized: false });
  });
  
  return {
    // Public methods that could be exposed to the main process
    
    /**
     * Show loading state in the UI
     * @param {boolean} isLoading - Whether the app is in a loading state
     */
    setLoading: (isLoading) => {
      mainWindow.webContents.send('set-loading', { isLoading });
    },
    
    /**
     * Send a status message to the UI
     * @param {string} message - The status message
     * @param {string} type - The message type (normal, error, success)
     */
    showStatus: (message, type = 'normal') => {
      mainWindow.webContents.send('status-update', { message, type });
    }
  };
}

module.exports = {
  initializeUI
};