# Project Context for Beautiful Time Tracker

## 🎯 Project Overview

A minimalist, premium time tracking web application built with **vanilla JavaScript, HTML, and CSS**. No frameworks, no build tools - just pure web technologies.

## 🛠️ Tech Stack

### Core Technologies
- **JavaScript (ES6+)**: Modern JavaScript features
  - Arrow functions, const/let, template literals
  - Classes, modules, async/await
  - Array methods (map, filter, reduce)
  - Destructuring, spread operator

- **HTML5**: Semantic markup
  - Semantic elements (header, main, section, article)
  - Form elements and data attributes
  - Accessibility (ARIA labels, roles)

- **CSS3**: Modern styling
  - CSS Grid and Flexbox for layout
  - CSS Custom Properties (variables) for theming
  - CSS Animations and Transitions
  - backdrop-filter for glass morphism
  - CSS transforms for 3D effects

### Web APIs Used
- **localStorage**: Data persistence
- **Canvas API**: Ambient background animations
- **requestAnimationFrame**: Smooth animations
- **IntersectionObserver**: Performance optimizations
- **Custom Events**: Module communication

### Optional Libraries
- **Chart.js**: For analytics visualizations (if needed)

## 📁 Project Structure

```
Beautiful-Timetracker-App/
├── index.html              # Main HTML entry point
├── css/
│   ├── styles.css          # Main stylesheet with variables
│   ├── animations.css      # Animation keyframes
│   └── glass-morphism.css  # Glass effect styles
├── js/
│   ├── app.js              # Main application orchestrator
│   ├── timer.js            # Timer logic (start/pause/reset)
│   ├── projects.js         # Project management (CRUD)
│   ├── sessionHistory.js   # Session persistence & history
│   ├── ambientMode.js      # Idle detection & screensaver
│   ├── cursorEffects.js    # Mouse tracking & glow effects
│   ├── magneticButton.js   # Magnetic hover physics
│   ├── charts.js           # Analytics visualizations
│   └── utils.js            # Utility functions (date formatting, etc.)
├── assets/
│   ├── images/             # Background images for ambient mode
│   └── icons/              # SVG icons
└── README.md
```

## 🎨 Design Philosophy

### Glass Morphism
- Frosted glass aesthetic using `backdrop-filter: blur()`
- Subtle transparency with `rgba()` colors
- Layered depth with box-shadows

### Dark Theme
- Dark background (#0a0a0a to #1a1a1a range)
- High contrast text for readability
- Accent colors for interactive elements

### Animations
- 60fps smooth animations using CSS transitions
- JavaScript-driven animations with `requestAnimationFrame`
- Easing functions for natural motion

## 💻 Coding Conventions

### JavaScript
- **ES6+ Features**: Use modern JavaScript
  ```javascript
  // Good
  const projects = [];
  const addProject = (name) => { ... };
  const { id, name } = project;
  
  // Avoid
  var projects = [];
  function addProject(name) { ... }
  ```

- **Module Pattern**: Organize code into focused modules
  ```javascript
  // timer.js
  export const Timer = {
    start() { ... },
    pause() { ... },
    reset() { ... }
  };
  ```

- **Event-Driven**: Use custom events for module communication
  ```javascript
  // Dispatch custom event
  document.dispatchEvent(new CustomEvent('timer:started', { detail: { time: 0 } }));
  
  // Listen for event
  document.addEventListener('timer:started', (e) => { ... });
  ```

### CSS
- **CSS Custom Properties**: Use variables for theming
  ```css
  :root {
    --bg-primary: #0a0a0a;
    --text-primary: #ffffff;
    --accent-color: #6366f1;
  }
  ```

- **BEM-like Naming**: Clear, descriptive class names
  ```css
  .timer-panel { }
  .timer-panel__controls { }
  .timer-panel__controls--active { }
  ```

- **Mobile-First**: Responsive design starting from mobile
  ```css
  .container {
    padding: 1rem;
  }
  
  @media (min-width: 768px) {
    .container {
      padding: 2rem;
    }
  }
  ```

### HTML
- **Semantic Elements**: Use proper HTML5 semantics
  ```html
  <header>...</header>
  <main>...</main>
  <section>...</section>
  <article>...</article>
  ```

- **Accessibility**: Include ARIA labels and roles
  ```html
  <button aria-label="Start timer" class="timer-control">
    <span class="sr-only">Start timer</span>
  </button>
  ```

## 🎯 Key Features Implementation

### Timer
- Uses `Date.now()` for precise timing
- Stores elapsed time in milliseconds
- Updates display every 100ms for smooth UI

### Projects
- Stored in localStorage as JSON
- Auto-generated colors using HSL
- Unique IDs using timestamp + random

### Session History
- Array of session objects with metadata
- Filterable by project, date range
- Exportable to CSV format

### Ambient Mode
- Detects mouse/keyboard inactivity
- Transitions to Canvas-based screensaver
- Rotating abstract artwork images

### Mouse Effects
- Tracks cursor position with mousemove
- Updates CSS custom properties for glow
- Magnetic effect using distance calculations

## 📝 Development Guidelines

1. **No Build Tools**: Keep it simple - edit and refresh
2. **Modular Code**: Each feature in its own file
3. **Progressive Enhancement**: Works without JavaScript
4. **Performance**: Use requestAnimationFrame for animations
5. **Accessibility**: Keyboard navigation, screen reader support
6. **Browser Compatibility**: Test in Chrome, Firefox, Safari

## 🔍 Code Examples

### Timer Module
```javascript
// js/timer.js
export const Timer = {
  startTime: null,
  elapsed: 0,
  interval: null,
  
  start() {
    this.startTime = Date.now() - this.elapsed;
    this.interval = setInterval(() => this.update(), 100);
    document.dispatchEvent(new CustomEvent('timer:started'));
  },
  
  pause() {
    clearInterval(this.interval);
    document.dispatchEvent(new CustomEvent('timer:paused'));
  },
  
  update() {
    this.elapsed = Date.now() - this.startTime;
    document.dispatchEvent(new CustomEvent('timer:tick', { 
      detail: { elapsed: this.elapsed } 
    }));
  }
};
```

### Project Management
```javascript
// js/projects.js
export const Projects = {
  list: [],
  
  load() {
    const stored = localStorage.getItem('projects');
    this.list = stored ? JSON.parse(stored) : [];
  },
  
  add(name) {
    const project = {
      id: Date.now() + Math.random(),
      name,
      color: this.generateColor()
    };
    this.list.push(project);
    this.save();
    return project;
  },
  
  generateColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 60%)`;
  }
};
```

This context helps CrewAI agents understand the project structure and produce code that matches the vanilla JavaScript architecture!

## ⚠️ IMPORTANT FOR CREWAI AGENTS

**BEFORE implementing any features, you MUST:**

1. **Read this entire file** (`PROJECT_CONTEXT.md`)
2. **Review the actual codebase:**
   - Read `index.html` to understand DOM structure
   - Read `app.js` to understand JavaScript patterns
   - Read `styles.css` to understand styling approach
3. **Check `implementations/` folder** for similar features
4. **Verify you're writing JavaScript** (NOT Python, NOT TypeScript)
5. **Follow existing code patterns** exactly

**See `docs/CREWAI_SETUP.md` for detailed setup instructions.**

**See `.crewai-review-checklist.md` for a quick review checklist.**
