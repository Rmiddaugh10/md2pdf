// GitHub Flavored Markdown parser implementation

const { marked } = require('marked');
const highlightjs = require('highlight.js');

class GitHubParser {
  constructor(options = {}) {
    console.log('Initializing GitHubParser');
    
    // Configure the parser with default options
    this.options = {
      // GitHub Flavored Markdown options
      tables: true,          // Enable tables
      taskLists: true,       // Enable task lists
      strikethrough: true,   // Enable strikethrough
      autolink: true,        // Enable automatic linking
      ...options
    };
    
    // Set up marked with GitHub Flavored Markdown enabled
    marked.setOptions({
      gfm: true,             // Enable GitHub Flavored Markdown
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
    
    console.log('GitHubParser initialized with options:', this.options);
  }
  
  /**
   * Parse GitHub Flavored Markdown to HTML
   * @param {string} markdown - The markdown content to parse
   * @returns {string} The parsed HTML
   */
  parse(markdown) {
    try {
      console.log('Parsing markdown with GitHubParser');
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
  }
}

module.exports = GitHubParser;
