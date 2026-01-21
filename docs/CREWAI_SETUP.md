# CrewAI Setup and Project Review Guide

## ⚠️ Important: Project Technology Stack

**This project uses VANILLA JAVASCRIPT, HTML, and CSS - NOT Python!**

- ✅ **JavaScript (ES6+)** - Main application logic
- ✅ **HTML5** - Structure and markup
- ✅ **CSS3** - Styling and animations
- ❌ **NOT Python** - The `crewai_patch.diff` contains Python code from a different project/context

## Current Project Structure

```
Beautiful-Timetracker-App/
├── index.html              # Main HTML entry point
├── app.js                  # Main JavaScript application (ACTIVE)
├── styles.css              # Main stylesheet
├── README.md               # Project documentation
│
├── docs/                   # All documentation
│   ├── PROJECT_CONTEXT.md  # ⭐ READ THIS FIRST - Project architecture guide
│   ├── SERVER_SETUP.md
│   └── ...
│
├── implementations/        # Issue implementation plans
│   └── issue_XXX_plan.md
│
├── archive/                # Legacy files
│   └── script.js           # Previous version (replaced by app.js)
│
└── patches/                # Patch files
    └── crewai_patch.diff   # ⚠️ Contains Python code (wrong language!)
```

## Required Review Process Before Implementation

### Step 1: Review Project Context
**MUST READ:** [`docs/PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md)

This file contains:
- Project overview and tech stack
- Current project structure
- Coding conventions (ES6+, vanilla JS)
- Design philosophy
- Code examples

### Step 2: Examine Current Codebase

**Review these files in order:**

1. **`index.html`** - Understand the HTML structure
   - DOM elements and IDs
   - Current UI layout
   - What elements exist

2. **`app.js`** - Understand the JavaScript architecture
   - State management (variables, localStorage)
   - Event handlers
   - Functions and their purposes
   - Data structures used

3. **`styles.css`** - Understand the styling
   - CSS classes and selectors
   - Design system (colors, spacing)
   - Responsive breakpoints

### Step 3: Check Existing Implementation Plans

Review relevant files in `implementations/`:
- `issue_528_plan.md` - Performance testing
- `issue_542_plan.md` - Responsiveness testing
- `issue_707_plan.md` - Project selection feature
- `issue_724_plan.md` - Toggle tests

These show what has been implemented and how.

### Step 4: Verify Technology Match

**Before writing ANY code, verify:**
- ✅ Am I writing **JavaScript** (not Python, not TypeScript)?
- ✅ Am I using **vanilla JavaScript** (no frameworks like React, Vue, Angular)?
- ✅ Am I following **ES6+** syntax (arrow functions, const/let, template literals)?
- ✅ Am I working with the **existing DOM structure** in `index.html`?
- ✅ Am I following the **existing code style** in `app.js`?

## CrewAI Configuration

### Required Context Files

When setting up CrewAI, provide these files in order:

1. **Primary Context:**
   ```
   docs/PROJECT_CONTEXT.md
   ```

2. **Current Implementation:**
   ```
   index.html
   app.js
   styles.css
   README.md
   ```

3. **Related Documentation:**
   ```
   docs/SERVER_SETUP.md
   docs/GETTING_STARTED.md
   ```

### CrewAI Agent Instructions

**Provide this prompt to CrewAI agents:**

```
You are working on a VANILLA JAVASCRIPT project. This is NOT a Python project.

TECH STACK:
- JavaScript (ES6+) - NO frameworks
- HTML5
- CSS3
- localStorage for data persistence
- NO build tools, NO Node.js dependencies

BEFORE IMPLEMENTING:
1. Read docs/PROJECT_CONTEXT.md completely
2. Review index.html to understand DOM structure
3. Review app.js to understand current code patterns
4. Review styles.css to understand styling approach
5. Check implementations/ for similar features

CODE REQUIREMENTS:
- Use vanilla JavaScript (ES6+)
- Follow existing code style in app.js
- Use existing DOM elements or add new ones following current patterns
- Use localStorage for data persistence
- Follow CSS patterns in styles.css
- NO Python code
- NO frameworks or libraries (unless specified)
```

## Common Mistakes to Avoid

### ❌ Wrong: Generating Python Code
```python
# This is WRONG for this project!
def generate_chart(data):
    # Python code
```

### ✅ Correct: Generating JavaScript Code
```javascript
// This is CORRECT for this project!
function generateChart(data) {
    // JavaScript code using ES6+
    const chart = document.createElement('canvas');
    // ...
}
```

### ❌ Wrong: Using Frameworks
```javascript
// WRONG - Don't use React, Vue, etc.
import React from 'react';
```

### ✅ Correct: Vanilla JavaScript
```javascript
// CORRECT - Pure vanilla JS
document.addEventListener('DOMContentLoaded', () => {
    // Your code here
});
```

## Implementation Checklist

Before CrewAI implements a new feature, verify:

- [ ] Read `docs/PROJECT_CONTEXT.md`
- [ ] Reviewed `index.html` structure
- [ ] Reviewed `app.js` code patterns
- [ ] Reviewed `styles.css` styling approach
- [ ] Checked `implementations/` for similar features
- [ ] Confirmed using **JavaScript** (not Python)
- [ ] Confirmed using **vanilla JS** (no frameworks)
- [ ] Matched existing code style
- [ ] Used existing DOM structure or followed patterns
- [ ] Used localStorage for persistence (if needed)
- [ ] Followed CSS patterns in styles.css

## Example: Correct Feature Implementation

### Feature: Add a new button to reset all entries

**Correct approach:**

1. **Review existing code:**
   ```javascript
   // In app.js, see how buttons are created:
   const deleteBtn = document.createElement('button');
   deleteBtn.className = 'btn-delete';
   deleteBtn.textContent = 'Löschen';
   ```

2. **Add HTML element** (if needed in index.html):
   ```html
   <button id="reset-all-btn" class="btn-danger">Reset All</button>
   ```

3. **Add JavaScript** (following app.js patterns):
   ```javascript
   // In app.js, add event listener
   const resetAllBtn = document.getElementById('reset-all-btn');
   resetAllBtn.addEventListener('click', () => {
       if (confirm('Reset all entries?')) {
           timeEntries = [];
           saveToLocalStorage();
           updateUI();
       }
   });
   ```

4. **Add CSS** (following styles.css patterns):
   ```css
   #reset-all-btn {
       /* Use existing button styles */
   }
   ```

## Troubleshooting

### If CrewAI generates Python code:
1. Stop the agent
2. Re-read `docs/PROJECT_CONTEXT.md`
3. Show examples from `app.js`
4. Re-instruct: "This is a JavaScript project, not Python"

### If CrewAI suggests using frameworks:
1. Remind: "Vanilla JavaScript only, no frameworks"
2. Reference `app.js` as the style guide
3. Show that the project has no `package.json` or build tools

### If CrewAI doesn't match existing patterns:
1. Show specific examples from `app.js`
2. Point to `docs/PROJECT_CONTEXT.md` coding conventions
3. Ask to match the existing code style exactly

## Summary

**Key Points:**
- ✅ This is a **vanilla JavaScript** project
- ✅ Read `PROJECT_CONTEXT.md` first
- ✅ Review existing code (`app.js`, `index.html`, `styles.css`)
- ✅ Follow existing patterns and conventions
- ❌ Do NOT generate Python code
- ❌ Do NOT use frameworks or build tools

**Always review the project folder structure and existing code before implementing new features!**
