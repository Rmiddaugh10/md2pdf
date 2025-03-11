# Versioning Guidelines for MD2PDF

MD2PDF follows [Semantic Versioning 2.0.0](https://semver.org/) for clear and consistent version numbering. This document outlines our versioning practices to ensure transparency for users and contributors.

## Semantic Versioning Format

We express versions as `MAJOR.MINOR.PATCH` where:

- **MAJOR** versions indicate incompatible API or user experience changes
- **MINOR** versions add functionality in a backward-compatible manner
- **PATCH** versions implement backward-compatible bug fixes

## Version Update Process

### For Contributors and Maintainers

1. **Determine the appropriate version increment** based on the changes made:
   - Breaking changes → MAJOR update
   - New features without breaking changes → MINOR update
   - Bug fixes and small improvements → PATCH update

2. **Update version numbers** using npm's versioning tool:
   ```bash
   # For patch releases (bug fixes)
   npm version patch
   
   # For minor releases (new features)
   npm version minor
   
   # For major releases (breaking changes)
   npm version major
   ```

3. **Document all changes** in the CHANGELOG.md file, with descriptions grouped into categories:
   - Added (new features)
   - Changed (changes in existing functionality)
   - Deprecated (features that will be removed in upcoming releases)
   - Removed (features that were removed in this release)
   - Fixed (bug fixes)
   - Security (security fixes)

4. **Create a git tag** matching the new version (automatically done by npm version)

5. **Push changes** to the repository:
   ```bash
   git push origin main --tags
   ```

6. **Create a GitHub release** using the created tag

### Pre-Release Versions

For pre-release work, append a hyphen and identifier:
- Alpha releases: `1.0.0-alpha.1`
- Beta releases: `1.0.0-beta.1`
- Release candidates: `1.0.0-rc.1`

Example:
```bash
npm version prerelease --preid=beta
```

## Version Display in Application

The application version is displayed in:
- The "About" dialog
- The application footer
- Help documentation
- Console output during startup in development mode

## Special Version Handling

### Initial Development Phase

During initial development (v0.x.y):
- Minor version increases may contain breaking changes
- API should not be considered stable

### Major Version Zero

Version `0.y.z` indicates the software is in development and may not be stable:
- `0.1.0` represents the initial release
- `0.y.0` represents new feature additions
- `0.y.z` represents bug fixes

## Communicating Breaking Changes

For any MAJOR version update, we will:
1. Provide detailed migration guides
2. Update documentation to reflect the changes
3. When possible, implement deprecation warnings in the previous version

## Checking Current Version

Maintainers can view the current version in package.json or by running:
```bash
npm version
```

Users can check the current version in the application's "About" dialog or by running:
```bash
md2pdf --version
```