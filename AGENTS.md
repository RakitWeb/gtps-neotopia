# Neotopia Project - Agent Guidelines

## Project Overview
Neotopia is a static website for a Growtopia private server. The site features:
- Home section with hero panel and server status
- Server status section with real-time monitoring
- How-to-play guide for connecting to the server
- About section with team information
- Roles/exclusive perks showcase
- Testimonials from players
- FAQ section
- Community section with Discord integration
- Footer with links and copyright

## Technology Stack
- HTML5
- CSS3 (with custom properties/variables)
- Vanilla JavaScript (ES6+)
- AOS library for scroll animations
- Swiper.js for testimonials carousel
- Bootstrap Icons

## File Structure
```
/ (root)
├── index.html              # Main HTML file
├── config.js               # Site configuration
├── /styles                 # CSS stylesheets
│   ├── loading.css         # Loading animation styles
│   ├── cssreset.css        # CSS reset
│   ├── navbar.css          # Navigation bar styles
│   └── /section css/       # Section-specific styles
├── /javascript             # JavaScript modules
│   ├── loading.js          # Loading animation logic
│   ├── navbar.js           # Navigation behavior
│   ├── server-status.js    # Server status updates
│   ├── site-config.js      # Site configuration loader
│   ├── community.js        # Discord widget integration
│   ├── effect.js           # Visual effects
│   └── /course/            # Course/roles section scripts
├── /images                 # Image assets
└── /videos                 # Video assets (if any)
```

## Build/Lint/Test Commands
This is a static website with no build process, linting, or testing framework configured.

### Available Commands
Since there's no package.json or build tools:
- **Development**: Simply open `index.html` in a browser
- **Production**: Deploy the entire `/` directory to any static web host
- **Linting**: No linting configured (consider adding ESLint/Stylelint)
- **Testing**: No testing framework configured (consider adding Jest/Vitest for JS, HTMLHint for HTML, Stylelint for CSS)

### Recommended Setup
To add development tooling:
```bash
# Initialize npm project
npm init -y

# Install linting tools
npm install --save-dev eslint stylelint htmlhint

# Install testing frameworks (if needed)
npm install --save-dev jest @babel/preset-env

# Add scripts to package.json
```

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements where appropriate
- Indentation: 2 spaces
- Attribute quotes: Double quotes
- Self-closing tags: Include trailing slash (`<br />`, `<img />`)
- Custom data attributes: Use `data-*` prefix (e.g., `data-aos="fade-left"`)
- Accessibility: Include `alt` attributes for images, proper heading hierarchy

### CSS
- Indentation: 2 spaces
- Selector ordering: Group related selectors
- Property ordering: Alphabetical or logical groupings (positioning first, then box model, typography, visual)
- Variables: Use CSS custom properties defined in `:root`
- Colors: Use defined variables (`var(--primary)`, `var(--text)`) over hardcoded values
- Measurements: Prefer relative units (rem, em, %) over pixels where appropriate
- Vendor prefixes: Include when necessary (though modern browsers reduce need)
- Comments: Use for section delineation and complex logic explanations

### JavaScript
- Indentation: 2 spaces
- Quotes: Single quotes for strings
- Variable declaration: `const` for values that won't change, `let` for those that will
- Functions: Arrow functions for concise callbacks, regular functions for methods/objects
- Naming: 
  - Variables/camelCase: `playerCount`, `statusText`
  - Functions/camelCase: `loadStaticStatus()`, `formatTimestamp()`
  - Constants/UPPER_SNAKE_CASE: Rarely used in this codebase
- Objects: 
  - Property shorthand when possible
  - Trailing commas in multi-line objects
- Arrays: 
  - Destructuring when appropriate
  - Template literals for string concatenation
- ES6+ Features: 
  - Use `let`/`const` over `var`
  - Arrow functions for inline callbacks
  - Template literals
  - Destructuring
  - Spread/rest operators
- DOM Manipulation:
  - Cache DOM references when used repeatedly
  - Prefer `textContent` over `innerHTML` for security
  - Use `classList` for class manipulation
- Event Listeners:
  - Use `addEventListener` over inline handlers
  - Remove listeners when appropriate to prevent memory leaks
- Error Handling:
  - Use try/catch for asynchronous operations
  - Validate inputs before processing
  - Provide fallback values for optional chaining

### Configuration (`config.js`)
- Structure: Nested objects matching site sections
- Naming: camelCase for properties
- Strings: Single quotes
- Comments: Use sparingly as structure should be self-explanatory
- Values: Keep consistent with UI/UX copy

### Naming Conventions
- Files: kebab-case (`navbar.css`, `server-status.js`)
- Classes: kebab-case in CSS (`.navbar`, `.hero-panel`)
- IDs: kebab-case in HTML/JavaScript (`#navbar`, `#status-text`)
- Variables: camelCase in JavaScript (`playerCount`, `statusText`)
- Functions: camelCase in JavaScript (`loadStaticStatus`, `formatTimestamp`)
- Constants: UPPER_SNAKE_CASE (rarely used in this codebase)

### Formatting
- Line length: Aim for < 100 characters
- File endings: Ensure files end with a newline
- Trailing whitespace: Remove
- Blank lines: Use to separate logical sections
- CSS: One declaration per line in multi-declaration blocks
- HTML: Attributes can be on same line or multiline for readability

### Architecture Patterns
- Modular JavaScript: Separate concerns into different files
- Configuration Centralization: Site-wide settings in `config.js`
- DOM Manipulation: Direct DOM access with caching of frequently used elements
- Event Delegation: Not consistently used; consider for dynamic content
- Animation Libraries: AOS for scroll animations, Swiper for carousels

### Security Considerations
- XSS Prevention: 
  - Current code uses `textContent` rather than `innerHTML` in most places
  - Review any `innerHTML` usage for potential injection points
- Data Validation: 
  - Form inputs (if any) should be validated
  - External data (API responses) should be sanitized
- Resource Loading:
  - Third-party scripts loaded via HTTPS
  - Consider implementing Content Security Policy (CSP)

### Performance Considerations
- Asset Optimization:
  - Images should be compressed and appropriately sized
  - Consider lazy loading for below-the-fold images
- CSS:
  - Minimize use of expensive properties (filters, shadows)
  - Use will-change for known animations
- JavaScript:
  - Debounce/throttle resize and scroll handlers
  - Minimize DOM manipulation in loops
  - Use requestAnimationFrame for visual updates
- Loading:
  - Critical CSS inlining (not currently implemented)
  - Async/defer for non-essential scripts

## Recommendations for Improvement

### Tooling
1. Add package.json with build scripts
2. Implement ESLint for JavaScript linting
3. Add Stylelint for CSS linting
4. Include HTMLHint for HTML validation
5. Consider a build process for minification and asset optimization

### Code Quality
1. Add JSDoc comments to complex JavaScript functions
2. Implement consistent error handling patterns
3. Add accessibility attributes (ARIA labels where needed)
4. Consider using CSS BEM methodology for better class naming
5. Extract repeated styles into utility classes

### Architecture
1. Consider a module bundler (Parcel, Vite, or Webpack) for future scalability
2. Implement a simple state management pattern for status updates
3. Add service worker for offline capabilities/PWA features
4. Consider lazy loading for images and components

### Testing
1. Add unit tests for JavaScript utilities
2. Add visual regression testing for CSS
3. Add end-to-end testing for critical user flows
4. Implement testing in CI/CD pipeline

## Current Limitations
- No build process (manual file copying for deployment)
- No linting or formatting enforcement
- No automated testing
- No performance optimization (minification, image compression)
- Limited accessibility features
- No TypeScript for type safety

## Agent Instructions
When working on this codebase:
1. Maintain consistency with existing code style
2. Prioritize accessibility in new features
3. Consider performance implications of changes
4. Document complex logic with comments
5. Follow the established patterns for DOM manipulation and event handling
6. Keep configuration centralized in config.js where appropriate
7. Ensure responsive design principles are maintained
8. Test changes across different viewport sizes
9. Validate HTML after modifications
10. Consider adding linting/test configurations as part of improvements