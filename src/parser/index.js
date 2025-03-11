// Parser factory module
// Creates and returns the appropriate parser for the specified markdown flavor

const CommonMarkParser = require('./commonmark');
const GitHubParser = require('./github');
const CustomParser = require('./custom');

/**
 * Create a parser for the specified markdown flavor
 * @param {string} flavor - The markdown flavor to use (commonmark, github, custom)
 * @returns {object} A parser object with a parse method
 */
function createParser(flavor) {
  switch (flavor.toLowerCase()) {
    case 'github':
    case 'gfm':
      return new GitHubParser();
      
    case 'custom':
      return new CustomParser();
      
    case 'commonmark':
    default:
      return new CommonMarkParser();
  }
}

module.exports = {
  createParser
};