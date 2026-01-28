"""
Example CrewAI Configuration for Beautiful Timetracker App

This is an EXAMPLE file showing how to properly configure CrewAI
to work with this vanilla JavaScript project.

IMPORTANT: This is a template - adjust based on your CrewAI setup!
"""

from crewai import Agent, Task, Crew
from pathlib import Path

# ============================================================================
# STEP 1: Load Context Files (CRITICAL!)
# ============================================================================

def load_context_files():
    """Load all necessary context files for CrewAI"""
    base_path = Path(__file__).parent
    
    context = {
        'project_context': (base_path / 'docs' / 'PROJECT_CONTEXT.md').read_text(),
        'html': (base_path / 'index.html').read_text(),
        'js': (base_path / 'app.js').read_text(),
        'css': (base_path / 'styles.css').read_text(),
        'readme': (base_path / 'README.md').read_text(),
        'setup_guide': (base_path / 'docs' / 'CREWAI_SETUP.md').read_text(),
    }
    
    return context

# ============================================================================
# STEP 2: Create Agent with Full Context
# ============================================================================

def create_javascript_agent(context):
    """Create a CrewAI agent configured for this JavaScript project"""
    
    backstory = f"""
    You are an expert vanilla JavaScript developer working on a time tracking web application.
    
    ⚠️ CRITICAL: This is a VANILLA JAVASCRIPT project - NOT Python, NOT TypeScript, NO frameworks!
    
    PROJECT CONTEXT:
    {context['project_context']}
    
    CURRENT HTML STRUCTURE:
    {context['html']}
    
    CURRENT JAVASCRIPT CODE (FOLLOW THESE PATTERNS):
    {context['js']}
    
    CURRENT CSS STYLING (FOLLOW THESE PATTERNS):
    {context['css']}
    
    SETUP GUIDE:
    {context['setup_guide']}
    
    RULES:
    1. Use vanilla JavaScript (ES6+) - NO Python, NO TypeScript
    2. Follow code patterns in app.js exactly
    3. Use existing DOM structure from index.html
    4. Use localStorage for data persistence
    5. Follow CSS patterns from styles.css
    6. NO frameworks (React, Vue, Angular, etc.)
    7. NO build tools (webpack, vite, etc.)
    8. NO Node.js dependencies
    
    Before writing code:
    - Review the provided app.js to understand patterns
    - Review index.html to understand DOM structure
    - Review styles.css to understand styling approach
    - Match existing code style exactly
    """
    
    agent = Agent(
        role='Vanilla JavaScript Developer',
        goal='Implement features in vanilla JavaScript following existing project patterns',
        backstory=backstory,
        verbose=True,
        allow_delegation=False
    )
    
    return agent

# ============================================================================
# STEP 3: Create Task with Clear Requirements
# ============================================================================

def create_task(description):
    """Create a task with clear JavaScript requirements"""
    
    task = Task(
        description=f"""
        {description}
        
        REQUIREMENTS:
        - Use vanilla JavaScript (ES6+) - NO Python, NO frameworks
        - Review app.js (provided in context) to understand code patterns
        - Review index.html (provided in context) to understand DOM structure
        - Review styles.css (provided in context) to understand styling
        - Follow existing code style exactly
        - Use localStorage for data persistence if needed
        - Add HTML elements to index.html if needed
        - Add CSS to styles.css if needed
        - Add JavaScript to app.js or create new JS file following app.js patterns
        
        OUTPUT:
        - Provide JavaScript code (NOT Python)
        - Show HTML changes if needed
        - Show CSS changes if needed
        - Explain how it integrates with existing code
        """,
        agent=create_javascript_agent(load_context_files()),
        expected_output="JavaScript code following app.js patterns, with HTML/CSS changes if needed"
    )
    
    return task

# ============================================================================
# STEP 4: Example Usage
# ============================================================================

def example_usage():
    """Example of how to use CrewAI with this project"""
    
    # Load context
    context = load_context_files()
    
    # Create agent
    agent = create_javascript_agent(context)
    
    # Create task (example: add export to CSV feature)
    task = create_task("""
    Add a feature to export all time entries to CSV format.
    
    The feature should:
    1. Add an "Export to CSV" button in the entries section
    2. When clicked, generate a CSV file with all time entries
    3. Download the CSV file
    4. Follow existing code patterns in app.js
    5. Style the button following styles.css patterns
    """)
    
    # Create crew
    crew = Crew(
        agents=[agent],
        tasks=[task],
        verbose=True
    )
    
    # Run crew
    result = crew.kickoff()
    
    return result

# ============================================================================
# Quick Test Task
# ============================================================================

def test_setup():
    """Simple test to verify CrewAI is configured correctly"""
    
    context = load_context_files()
    agent = create_javascript_agent(context)
    
    # Simple test task
    task = Task(
        description="""
        Add a simple "Reset All" button that clears all time entries.
        
        Requirements:
        - Add button HTML to index.html in entries section
        - Add JavaScript handler in app.js following existing patterns
        - Add CSS styling in styles.css following existing button styles
        - Use vanilla JavaScript only (NO Python)
        """,
        agent=agent,
        expected_output="JavaScript code for reset button feature"
    )
    
    crew = Crew(agents=[agent], tasks=[task], verbose=True)
    result = crew.kickoff()
    
    # Verify output
    if 'def ' in str(result) or 'import ' in str(result) or '.py' in str(result):
        print("⚠️ WARNING: Output contains Python code! Check configuration.")
    else:
        print("✅ Output appears to be JavaScript")
    
    return result

# ============================================================================
# Main
# ============================================================================

if __name__ == "__main__":
    print("CrewAI Configuration Example for Beautiful Timetracker App")
    print("=" * 60)
    print("\nThis is an EXAMPLE configuration file.")
    print("Adjust based on your CrewAI setup and requirements.\n")
    print("To test the setup, run: test_setup()")
    print("To use for a task, run: example_usage()\n")
