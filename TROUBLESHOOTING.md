# MD2PDF Troubleshooting Guide

This document provides solutions for common issues encountered when using MD2PDF. If you don't find your issue addressed here, please check our [GitHub Issues](https://github.com/yourusername/md2pdf/issues) or contact us at [support@yourdomain.com](mailto:support@yourdomain.com).

## Installation Problems

### Application Won't Install on Windows

**Symptoms:**
- Installation process fails to complete
- Error message about missing dependencies
- "Windows protected your PC" message appears

**Solutions:**
1. **Verify System Requirements**
   - Ensure you're running Windows 7 or later
   - Check that you have administrator privileges

2. **Security Warnings**
   - If you see "Windows protected your PC," click "More info" and then "Run anyway"
   - Our installers are not yet signed with a Microsoft-verified certificate

3. **Missing Dependencies**
   - Install the latest [Microsoft Visual C++ Redistributable](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads)
   - Ensure .NET Framework 4.5 or later is installed

4. **Antivirus Interference**
   - Temporarily disable your antivirus software during installation
   - Add an exception for MD2PDF in your antivirus settings

### Installation Issues on macOS

**Symptoms:**
- "App is damaged and can't be opened" message
- App won't open after installation
- Gatekeeper prevents opening the application

**Solutions:**
1. **Gatekeeper Restrictions**
   - After downloading, right-click (or Control-click) the .dmg file and select "Open"
   - When prompted that the app is from an unidentified developer, click "Open"

2. **Manual Security Override**
   - Open System Preferences > Security & Privacy
   - Under the General tab, click "Open Anyway" for MD2PDF

3. **Quarantine Attribute**
   - Open Terminal
   - Run: `xattr -d com.apple.quarantine /Applications/MD2PDF.app`

### Linux Installation Problems

**Symptoms:**
- Unable to execute AppImage
- Dependencies missing for .deb package
- Permission errors when trying to run the application

**Solutions:**
1. **AppImage Permissions**
   - Make the AppImage executable: `chmod +x MD2PDF-x.y.z.AppImage`

2. **Missing Dependencies for DEB/RPM**
   - Install required packages: `sudo apt-get install libgconf-2-4 libnotify4 libnss3 libxss1 libxtst6 libatspi2.0-0 libuuid1`

3. **FUSE Issues with AppImage**
   - Install FUSE: `sudo apt-get install fuse libfuse2`
   - If still facing issues: `./MD2PDF-x.y.z.AppImage --no-sandbox`

## PDF Export Failures

### PDF Generation Fails

**Symptoms:**
- Error message when clicking "Export to PDF"
- Empty PDF file is generated
- Application freezes during export

**Solutions:**
1. **Check File Permissions**
   - Ensure you have write permissions for the destination folder
   - Try saving to a different location, such as the Desktop

2. **Document Size Issues**
   - Very large Markdown files may cause export problems
   - Try breaking your document into smaller parts

3. **Memory Limitations**
   - Close other applications to free up memory
   - Restart the application before attempting the export

4. **Specific Content Problems**
   - Remove complex elements (like large tables) temporarily to identify problematic content
   - Ensure images referenced in your Markdown exist and are accessible

### PDF Appearance Problems

**Symptoms:**
- Incorrect fonts in exported PDF
- Missing or broken images
- Formatting doesn't match the preview

**Solutions:**
1. **Font Issues**
   - Use standard fonts that are available on most systems
   - Avoid custom or system-specific fonts

2. **Image Path Problems**
   - Use relative paths for images
   - Ensure images are in the same directory as your Markdown file or in a subdirectory

3. **CSS Conflicts**
   - If using custom CSS, check for syntax errors
   - Simplify your CSS and add complexity gradually to identify issues

## Markdown Rendering Discrepancies

### Preview Doesn't Match Expected Output

**Symptoms:**
- Elements don't render as expected in the preview
- Syntax that works in other Markdown editors doesn't work in MD2PDF
- Differences between preview and exported PDF

**Solutions:**
1. **Markdown Flavor Mismatch**
   - Verify you've selected the correct Markdown flavor (CommonMark, GitHub, or Custom)
   - Different flavors support different syntax features

2. **Syntax Errors**
   - Check for subtle syntax errors, like missing spaces after list markers
   - Validate your Markdown with an online validator like [markdownlint](https://dlaa.me/markdownlint/)

3. **Feature Support Limitations**
   - Some advanced Markdown features might not be supported
   - Check documentation for supported syntax in your chosen flavor

### Code Block Syntax Highlighting Issues

**Symptoms:**
- Code highlighting is incorrect or missing
- Wrong language detection for code blocks

**Solutions:**
1. **Explicit Language Specification**
   - Always specify the language explicitly in code blocks:
     ```
     ```javascript
     function example() {
       console.log("Hello world");
     }
     ```
     ```

2. **Supported Languages**
   - Verify the language is supported by highlight.js
   - For uncommon languages, try using a more generic specifier

## Performance Concerns

### Application Runs Slowly

**Symptoms:**
- Laggy typing in the editor
- Delayed preview updates
- High CPU usage

**Solutions:**
1. **Large Documents**
   - Break very large documents into smaller files
   - Disable live preview for large documents and manually refresh

2. **Resource Intensive Elements**
   - Complex tables and numerous images can slow down rendering
   - Extensive code blocks with syntax highlighting may impact performance

3. **System Resources**
   - Close other resource-intensive applications
   - Check for available disk space and memory

### Memory Usage Grows Over Time

**Symptoms:**
- Application becomes slower the longer it runs
- Memory usage continuously increases
- Eventually crashes or becomes unresponsive

**Solutions:**
1. **Restart Periodically**
   - Save your work and restart the application after extended usage

2. **Limit Open Documents**
   - Close documents you're not actively working on

3. **Clear Cache**
   - In the application settings, look for an option to clear the cache

## Platform-Specific Issues

### Windows-Specific Problems

**Symptoms:**
- File path issues with backslashes vs. forward slashes
- Font rendering differences

**Solutions:**
1. **Path Separators**
   - Use forward slashes (/) in Markdown links even on Windows
   - Alternatively, escape backslashes: `C:\\path\\to\\file`

2. **Font Smoothing**
   - Adjust ClearType settings in Windows for better font rendering

### macOS-Specific Problems

**Symptoms:**
- Menu bar integration issues
- Permissions dialogs repeatedly appearing

**Solutions:**
1. **Permission Settings**
   - Grant full disk access to MD2PDF in System Preferences > Security & Privacy > Privacy
   - After granting permissions, restart the application

2. **Menu Options Missing**
   - Check if menu items are under the application name menu instead of File menu

### Linux-Specific Problems

**Symptoms:**
- UI rendering glitches
- Font issues or missing fonts
- AppImage mounting problems

**Solutions:**
1. **Desktop Environment Compatibility**
   - Some UI issues may be specific to certain desktop environments
   - Try running with specific flags: `./MD2PDF-x.y.z.AppImage --no-sandbox`

2. **Font Rendering**
   - Install Microsoft fonts: `sudo apt install ttf-mscorefonts-installer`
   - Install font-config: `sudo apt install fontconfig`

3. **System Integration**
   - For .deb installations, try reinstalling: `sudo apt-get install --reinstall md2pdf`
   - For AppImage, update your system: `sudo apt-get update && sudo apt-get upgrade`