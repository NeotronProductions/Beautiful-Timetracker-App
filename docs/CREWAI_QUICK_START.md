# CrewAI Quick Start Guide

## ⚠️ Important: Setup Required

**Just having the documentation files is NOT enough!** You need to **provide them as context** when running CrewAI.

## Step-by-Step Setup

### Step 1: Prepare Context Files

Before running CrewAI, gather these files:

```
Required Context Files:
1. docs/PROJECT_CONTEXT.md          # ⭐ MOST IMPORTANT
2. index.html                       # Current HTML structure
3. app.js                           # Current JavaScript code
4. styles.css                       # Current CSS styling
5. README.md                        # Project overview

Optional but Recommended:
6. docs/CREWAI_SETUP.md             # Setup guide
7. .crewai-review-checklist.md     # Quick checklist
8. implementations/issue_XXX_plan.md # Similar features
```

### Step 2: Provide Context to CrewAI

**When starting CrewAI, you MUST provide these files as context:**

#### Option A: Using CrewAI CLI/API
```bash
# Example (adjust based on your CrewAI setup)
crewai run \
  --context docs/PROJECT_CONTEXT.md \
  --context index.html \
  --context app.js \
  --context styles.css \
  --context README.md \
  --task "Your task description here"
```

#### Option B: Using CrewAI Python Script
```python
from crewai import Agent, Task, Crew

# Load context files
with open('docs/PROJECT_CONTEXT.md', 'r') as f:
    project_context = f.read()

with open('index.html', 'r') as f:
    html_context = f.read()

with open('app.js', 'r') as f:
    js_context = f.read()

# Create agent with context
agent = Agent(
    role='JavaScript Developer',
    goal='Implement features in vanilla JavaScript following existing patterns',
    backstory=f"""
    You are working on a vanilla JavaScript project.
    
    PROJECT CONTEXT:
    {project_context}
    
    CURRENT HTML STRUCTURE:
    {html_context}
    
    CURRENT JAVASCRIPT CODE:
    {js_context}
    
    IMPORTANT RULES:
    - Use vanilla JavaScript (ES6+), NOT Python
    - Follow patterns in app.js
    - Use existing DOM structure
    - Use localStorage for data
    - NO frameworks or build tools
    """,
    verbose=True
)
```

#### Option C: Using CrewAI with File Paths
```python
# Provide file paths directly
context_files = [
    'docs/PROJECT_CONTEXT.md',
    'index.html',
    'app.js',
    'styles.css',
    'README.md'
]

# Pass to CrewAI
crew = Crew(
    agents=[agent],
    tasks=[task],
    context_files=context_files  # CrewAI should read these
)
```

### Step 3: Give Clear Instructions

**Always include this in your prompt/instructions:**

```
TECH STACK:
- JavaScript (ES6+) - NO frameworks, NO Python
- HTML5
- CSS3
- localStorage for data persistence
- NO build tools, NO Node.js dependencies

BEFORE CODING:
1. Review docs/PROJECT_CONTEXT.md (provided in context)
2. Review index.html (provided in context)
3. Review app.js (provided in context)
4. Review styles.css (provided in context)
5. Follow existing code patterns exactly

CODE REQUIREMENTS:
- Use vanilla JavaScript (ES6+)
- Follow patterns in app.js
- Use existing DOM elements from index.html
- Use localStorage for data persistence
- Follow CSS patterns in styles.css
- NO Python code
- NO frameworks (React, Vue, Angular, etc.)
- NO build tools (webpack, vite, etc.)
```

## Verification Checklist

**Before accepting CrewAI output, verify:**

- [ ] Code is JavaScript (`.js`), not Python (`.py`)
- [ ] Uses vanilla JavaScript (no `import React`, no frameworks)
- [ ] Follows patterns from `app.js`
- [ ] Uses existing DOM structure from `index.html`
- [ ] Matches code style in `app.js`
- [ ] Uses localStorage (if data persistence needed)
- [ ] Follows CSS patterns from `styles.css`

## Example: Correct Setup

### ✅ Correct Way:

```python
# 1. Load context files
context = {
    'project_context': open('docs/PROJECT_CONTEXT.md').read(),
    'html': open('index.html').read(),
    'js': open('app.js').read(),
    'css': open('styles.css').read()
}

# 2. Create agent with context
agent = Agent(
    role='JavaScript Developer',
    backstory=f"""
    You work on a VANILLA JAVASCRIPT project.
    
    {context['project_context']}
    
    Current HTML: {context['html']}
    Current JS: {context['js']}
    Current CSS: {context['css']}
    
    Generate JavaScript code following these patterns.
    """,
    verbose=True
)

# 3. Create task
task = Task(
    description="""
    Add a feature to export time entries to CSV.
    
    Requirements:
    - Use vanilla JavaScript
    - Follow patterns in app.js
    - Add button to index.html
    - Style with CSS following styles.css patterns
    - NO Python, NO frameworks
    """,
    agent=agent
)

# 4. Run crew
crew = Crew(agents=[agent], tasks=[task])
result = crew.kickoff()
```

### ❌ Wrong Way (What Caused the Python Issue):

```python
# DON'T DO THIS - No context provided!
agent = Agent(
    role='Developer',
    backstory='You are a developer',
    # No project context!
    # No code examples!
    # CrewAI will guess and might generate Python
)
```

## Common Mistakes to Avoid

### ❌ Mistake 1: Not Providing Context
```python
# WRONG - No context files
crew = Crew(agents=[agent], tasks=[task])
# CrewAI doesn't know it's a JavaScript project!
```

### ❌ Mistake 2: Vague Instructions
```python
# WRONG - Too vague
task = Task(description="Add a chart feature")
# Doesn't specify JavaScript or project structure
```

### ✅ Correct: Full Context + Clear Instructions
```python
# RIGHT - Full context and clear instructions
task = Task(
    description="""
    Add a chart feature using vanilla JavaScript.
    
    - Review app.js for code patterns
    - Add HTML elements to index.html
    - Use Chart.js library (CDN link)
    - Follow styles.css patterns
    - NO Python, use JavaScript
    """,
    agent=agent_with_context
)
```

## Testing the Setup

### Quick Test Task:

Try this simple task first to verify CrewAI is working correctly:

```python
task = Task(
    description="""
    Add a simple "Reset All" button that clears all time entries.
    
    Requirements:
    - Add button to index.html in the entries section
    - Add JavaScript handler in app.js following existing patterns
    - Add CSS styling in styles.css following existing button styles
    - Use vanilla JavaScript only
    """,
    agent=agent
)
```

**Expected Output:**
- ✅ JavaScript code (not Python)
- ✅ Follows `app.js` patterns
- ✅ Uses existing DOM structure
- ✅ Matches existing code style

**If you get Python code:**
- ❌ Context files not provided correctly
- ❌ Instructions not clear enough
- ❌ Need to explicitly state "JavaScript, not Python"

## Summary

**To ensure CrewAI creates correct code:**

1. ✅ **Provide context files** (PROJECT_CONTEXT.md, app.js, index.html, styles.css)
2. ✅ **Give clear instructions** (JavaScript, not Python)
3. ✅ **Reference existing patterns** (follow app.js style)
4. ✅ **Verify output** (check it's JavaScript, not Python)
5. ✅ **Test with simple task first** (before complex features)

**The documentation files help, but you must actively provide them as context when running CrewAI!**
