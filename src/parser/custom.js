// Custom Markdown flavor parser implementation
// This parser allows for extensibility with custom syntax and rules

const { marked } = require('marked');
const highlightjs = require('highlight.js');

class CustomParser {
  constructor(options = {}) {
    console.log('Initializing CustomParser');
    
    // Configure the parser with default options
    this.options = {
      // Default extensions enabled
      gfm: true,         // GitHub Flavored Markdown 
      math: true,        // Math expressions
      customBlocks: {},  // Custom block definitions
      customRules: [],   // Custom parsing rules
      ...options
    };
    
    // Set up marked with options
    marked.setOptions({
      gfm: this.options.gfm,
      breaks: false,
      pedantic: false,
      headerIds: true,
      mangle: true,
      ...this.options,
      highlight: (code, lang) => {
        if (lang && highlightjs.getLanguage(lang)) {
          try {
            return highlightjs.highlight(code, { language: lang }).value;
          } catch (err) {
            console.error('Highlight.js error:', err);
          }
        }
        
        // Use generic highlighting for unknown languages
        return highlightjs.highlightAuto(code).value;
      }
    });
    
    // Add custom extensions if needed
    if (this.options.math) {
      this.addMathExtensions();
    }
    
    console.log('CustomParser initialized with options:', this.options);
  }
  
  /**
   * Add extensions for math rendering
   */
  addMathExtensions() {
    const mathExtension = {
      name: 'math',
      level: 'inline',
      start(src) { return src.indexOf('$'); },
      tokenizer(src) {
        const blockRule = /^\$\$([\s\S]+?)\$\$/;
        const inlineRule = /^\$([^\n$]+?)\$/;
        
        let match;
        if ((match = blockRule.exec(src))) {
          return {
            type: 'math',
            raw: match[0],
            text: match[1].trim(),
            display: true
          };
        } else if ((match = inlineRule.exec(src))) {
          return {
            type: 'math',
            raw: match[0],
            text: match[1].trim(),
            display: false
          };
        }
        return false;
      },
      renderer(token) {
        if (token.display) {
          return `<div class="math-block">${token.text}</div>`;
        } else {
          return `<span class="math-inline">${token.text}</span>`;
        }
      }
    };
    
    // Add the extension
    const extensions = [mathExtension];
    marked.use({ extensions });
  }
  
  /**
   * Parse Custom Markdown to HTML
   * @param {string} markdown - The markdown content to parse
   * @returns {string} The parsed HTML
   */
  parse(markdown) {
    try {
      console.log('Parsing markdown with CustomParser');
      console.log(`Markdown sample: ${markdown.substring(0, 50)}...`);
      
      if (!markdown || typeof markdown !== 'string') {
        console.error('Invalid markdown input:', markdown);
        throw new Error('Invalid markdown input');
      }
      
      const result = marked.parse(markdown);
      
      if (!result || typeof result !== 'string') {
        console.error('Marked returned invalid result:', result);
        throw new Error('Marked parser returned invalid result');
      }
      
      console.log(`Parsed HTML sample: ${result.substring(0, 50)}...`);
      return result;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      throw new Error(`Failed to parse markdown: ${error.message}`);
    }
  }
  
  /**
   * Set parser options
   * @param {Object} options - Parser configuration options
   */
  setOptions(options) {
    this.options = { ...this.options, ...options };
    marked.setOptions(this.options);
    
    // Re-apply custom extensions if needed
    if (this.options.math) {
      this.addMathExtensions();
    }
  }
}

module.exports = CustomParser;
