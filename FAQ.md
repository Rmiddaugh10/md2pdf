# Frequently Asked Questions (FAQ)

## General Questions

### What is MD2PDF?
MD2PDF is an open-source desktop application that converts Markdown documents to PDF files. It supports multiple Markdown flavors and provides a live preview feature that allows you to see how your document will look as you type.

### Which platforms does MD2PDF support?
MD2PDF is cross-platform and runs on Windows, macOS, and Linux operating systems.

### Is MD2PDF free to use?
Yes, MD2PDF is completely free and open-source under the MIT license. You can use it for personal or commercial purposes without any cost.

### Where can I get the latest version?
The latest version can be downloaded from our [GitHub Releases page](https://github.com/Rmiddaugh10/md2pdf/releases).

### How do I report bugs or request features?
You can report bugs or request features by opening an issue on our [GitHub Issues page](https://github.com/Rmiddaugh10/md2pdf/issues). Please check existing issues first to avoid duplicates.

## Installation and Setup

### What are the system requirements?
- **Windows**: Windows 7 or later
- **macOS**: macOS 10.12 (Sierra) or later
- **Linux**: Ubuntu 18.04 or equivalent recent distributions
- At least 4GB of RAM
- 100MB of available disk space

### I can't install MD2PDF on Windows due to security warnings. What should I do?
When you see the "Windows protected your PC" message, click on "More info" and then "Run anyway". This happens because our installer isn't signed with a Microsoft-verified certificate yet.

### The application won't open on macOS. How can I fix this?
macOS has security measures that can prevent applications from unidentified developers from running. To open MD2PDF:
1. Right-click (or Control-click) on the application in Finder
2. Select "Open" from the context menu
3. Click "Open" in the dialog that appears

### How do I update to a newer version?
Simply download and install the latest version from our GitHub Releases page. Your settings and preferences will be preserved during the update.

## Using MD2PDF

### Which Markdown flavors does MD2PDF support?
MD2PDF supports three Markdown flavors:
1. **CommonMark**: The standard Markdown specification
2. **GitHub Flavored Markdown**: CommonMark plus tables, task lists, and strikethrough
3. **Custom**: Includes additional extensions like math expressions using TeX syntax

### How do I change the Markdown flavor?
Use the dropdown menu labeled "Markdown Flavor" in the toolbar to select your preferred flavor.

### Can I customize the appearance of the exported PDF?
Currently, the PDF exports use our default styling. We plan to add custom styling options in future versions.

### How do I include images in my document?
You can include images using standard Markdown syntax:
```
![Alt text](path/to/image.jpg)
```
For best results, use relative paths to images stored in the same directory as your Markdown file.

### Does MD2PDF support math equations?
Yes, when using the "Custom" Markdown flavor, you can write math equations using TeX syntax:
- Inline math: `$E=mc^2$`
- Block math: `$$E=mc^2$$`

### Can I export to formats other than PDF?
Currently, MD2PDF only supports PDF export. We plan to add other export formats like HTML and DOCX in future versions.

### How do I create tables in my document?
When using GitHub Flavored Markdown or Custom flavor, you can create tables using this syntax:
```
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

## Troubleshooting

### The application is slow or freezes with large documents. What can I do?
For very large documents:
1. Break them into smaller files
2. Close other applications to free up system resources
3. Disable live preview and manually refresh when needed

### Some Markdown syntax doesn't render correctly. Why?
Different Markdown flavors support different syntax features. Make sure you've selected the appropriate flavor for your document. For advanced features like tables or task lists, use GitHub Flavored Markdown or Custom flavor.

### Images don't appear in the PDF output. How can I fix this?
Ensure that:
1. Image paths are correct (preferably relative paths)
2. Images are accessible from your document's location
3. Supported image formats are used (JPG, PNG, GIF, SVG)

### PDF export fails or creates an empty file. What should I do?
This could happen due to:
1. Insufficient permissions to write to the destination folder
2. Very large or complex documents
3. Issues with specific content in your document

Try saving to a different location like your Desktop, and if the problem persists, check our [Troubleshooting Guide](TROUBLESHOOTING.md).

### The preview doesn't match the exported PDF. Why?
While we strive for consistency, there may be slight differences between the preview and final PDF due to different rendering engines. If you notice significant differences, please report them as bugs.

## Contributing to MD2PDF

### How can I contribute to the project?
We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to get started with code contributions, documentation, or bug reports.

### Can I build MD2PDF from source?
Yes, you can build MD2PDF from source. Clone our repository and follow the build instructions in the README.md file.

### How do I build custom installers?
To build installers for different platforms:
```
npm run build:mac    # For macOS
npm run build:win    # For Windows
npm run build:linux  # For Linux
```

### Is there a style guide for contributing code?
Yes, we follow specific coding standards. Please check our [Contributing Guidelines](CONTRIBUTING.md) for details on code style and pull request procedures.
