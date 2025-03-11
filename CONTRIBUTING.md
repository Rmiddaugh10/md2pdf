# Contributing to MD2PDF

Thank you for considering contributing to MD2PDF! This document provides guidelines and instructions for contributing to this open-source project.

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md). Please report any unacceptable behavior to [hguaddim@gmail.com].

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please check the existing issues to see if the problem has already been reported. If it hasn't, create a new issue with the following information:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your operating system and application version
- Any additional context that might be helpful

### Suggesting Features

Feature suggestions are welcome. To suggest a feature:

1. Check the issue tracker to ensure the feature hasn't already been suggested
2. Create a new issue labeled as "enhancement"
3. Provide a clear description of the feature and its benefits
4. If possible, outline how the feature might be implemented

### Pull Requests

1. Fork the repository
2. Create a new branch from `main` (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request against the `main` branch

## Development Setup

Follow these steps to set up the project for development:

1. Clone your fork of the repository
   ```
   git clone https://github.com/yourusername/md2pdf.git
   cd md2pdf
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the application in development mode
   ```
   npm run dev
   ```

## Development Workflow

### Branching Strategy

- `main`: Stable release branch
- `dev`: Development branch for integration
- Feature branches: Created from `dev` for individual features
- Bugfix branches: Created from `main` for critical fixes

### Commit Messages

Please follow these guidelines for commit messages:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or fewer
- Reference issues and pull requests after the first line

Example:
```
Add support for LaTeX math syntax

- Implemented KaTeX rendering for math expressions
- Added configuration options for math rendering
- Updated documentation with math examples

Fixes #123
```

### Code Style

This project uses ESLint to enforce code style. Before submitting your code, run:

```
npm run lint
```

Key style points:
- Use 2 spaces for indentation
- Use camelCase for variables and functions
- Use PascalCase for classes
- Use descriptive variable names

### Running Tests

Ensure all tests pass before submitting your changes:

```
npm test
```

Consider adding tests for new features or bug fixes.

## Building the Application

To build the application for your platform:

```
npm run build
```

For specific platforms:

```
npm run build:mac    # macOS
npm run build:win    # Windows
npm run build:linux  # Linux
```

## Documentation

If your changes add or modify features, please update the documentation:

- README.md for general information
- Code comments for implementation details
- JSDoc comments for public APIs

## Release Process

The release process is managed by project maintainers:

1. Version bump in package.json
2. Update CHANGELOG.md
3. Create a new release tag
4. Build and publish packages

## Questions?

If you have any questions about contributing, please open an issue or contact [hguaddim@gmail.com].

---

Thank you for contributing to MD2PDF!