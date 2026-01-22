"""
CrewAI Configuration for Beautiful Timetracker App

This is the main configuration file for CrewAI agents working on this project.
All agents are pre-configured with project context to ensure correct JavaScript code generation.
"""

from crewai import Agent, Task, Crew
from pathlib import Path
import os
import urllib3

# Configure urllib3 to use longer timeouts for GitHub API calls
# This fixes "Connection to api.github.com timed out" errors
urllib3.util.timeout.Timeout.DEFAULT_TIMEOUT = 60  # Increase from default 15 seconds

# Optionally disable urllib3 warnings (uncomment if you want to suppress timeout warnings)
# urllib3.disable_warnings(urllib3.exceptions.ConnectTimeoutError)

# ============================================================================
# PROJECT PATHS
# ============================================================================

PROJECT_ROOT = Path(__file__).parent
CONTEXT_DIR = PROJECT_ROOT / 'docs'
CODE_DIR = PROJECT_ROOT

# ============================================================================
# CONTEXT FILE LOADER
# ============================================================================

def load_project_context():
    """Load all project context files"""
    context = {}
    
    # Core documentation
    context_files = {
        'project_context': CONTEXT_DIR / 'PROJECT_CONTEXT.md',
        'setup_guide': CONTEXT_DIR / 'CREWAI_SETUP.md',
        'quick_start': CONTEXT_DIR / 'CREWAI_QUICK_START.md',
        'readme': PROJECT_ROOT / 'README.md',
    }
    
    # Code files
    code_files = {
        'html': CODE_DIR / 'index.html',
        'javascript': CODE_DIR / 'app.js',
        'css': CODE_DIR / 'styles.css',
    }
    
    # Load all files
    for key, path in {**context_files, **code_files}.items():
        if path.exists():
            context[key] = path.read_text(encoding='utf-8')
        else:
            print(f"⚠️ Warning: {path} not found")
            context[key] = ""
    
    return context

# ============================================================================
# AGENT CONFIGURATION
# ============================================================================

def create_javascript_developer_agent(context):
    """
    Create a JavaScript developer agent with full project context.
    This agent is configured to generate vanilla JavaScript code.
    """
    
    backstory = f"""
    You are an expert vanilla JavaScript developer working on the Beautiful Timetracker App.
    
    ⚠️ CRITICAL TECHNOLOGY STACK:
    - JavaScript (ES6+) - NO Python, NO TypeScript, NO frameworks
    - HTML5 - Semantic markup
    - CSS3 - Modern styling
    - localStorage - Browser data persistence
    - NO build tools, NO Node.js dependencies, NO frameworks
    
    📚 PROJECT CONTEXT:
    {context.get('project_context', '')}
    
    📄 CURRENT HTML STRUCTURE:
    {context.get('html', '')}
    
    💻 CURRENT JAVASCRIPT CODE (FOLLOW THESE PATTERNS EXACTLY):
    {context.get('javascript', '')}
    
    🎨 CURRENT CSS STYLING (FOLLOW THESE PATTERNS):
    {context.get('css', '')}
    
    📖 PROJECT README:
    {context.get('readme', '')}
    
    🔧 SETUP GUIDE:
    {context.get('setup_guide', '')}
    
    ✅ MANDATORY RULES:
    1. Use vanilla JavaScript (ES6+) - NO Python, NO TypeScript
    2. Follow code patterns in app.js EXACTLY
    3. Use existing DOM structure from index.html
    4. Use localStorage for data persistence (if needed)
    5. Follow CSS patterns from styles.css
    6. NO frameworks (React, Vue, Angular, Svelte, etc.)
    7. NO build tools (webpack, vite, rollup, etc.)
    8. NO Node.js dependencies
    9. NO TypeScript
    10. Match existing code style exactly
    
    📋 BEFORE WRITING CODE:
    - Review the provided app.js to understand patterns
    - Review index.html to understand DOM structure
    - Review styles.css to understand styling approach
    - Check implementations/ folder for similar features
    - Match existing code style exactly
    
    🎯 OUTPUT REQUIREMENTS:
    - Generate JavaScript code (NOT Python)
    - Show HTML changes if needed (following index.html structure)
    - Show CSS changes if needed (following styles.css patterns)
    - Explain integration with existing code
    - Provide complete, working code
    """
    
    agent = Agent(
        role='Vanilla JavaScript Developer',
        goal='Implement features in vanilla JavaScript following existing project patterns exactly',
        backstory=backstory,
        verbose=True,
        allow_delegation=False,
        max_iter=3,
        memory=True
    )
    
    return agent

def create_code_reviewer_agent(context):
    """
    Create a code reviewer agent to verify JavaScript code quality.
    """
    
    backstory = f"""
    You are a senior JavaScript code reviewer specializing in vanilla JavaScript projects.
    
    PROJECT CONTEXT:
    {context.get('project_context', '')}
    
    CURRENT CODE PATTERNS:
    {context.get('javascript', '')}
    
    Your job is to review code and ensure:
    1. It's JavaScript (NOT Python, NOT TypeScript)
    2. It follows existing patterns in app.js
    3. It uses vanilla JavaScript (no frameworks)
    4. It matches the existing code style
    5. It integrates properly with existing code
    """
    
    agent = Agent(
        role='JavaScript Code Reviewer',
        goal='Review and verify JavaScript code matches project standards',
        backstory=backstory,
        verbose=True,
        allow_delegation=False
    )
    
    return agent

# ============================================================================
# TASK TEMPLATES
# ============================================================================

def create_feature_task(description, agent):
    """Create a task for implementing a new feature"""
    
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
        - Add HTML elements to index.html if needed (following existing structure)
        - Add CSS to styles.css if needed (following existing patterns)
        - Add JavaScript to app.js or create new JS file following app.js patterns
        
        OUTPUT FORMAT:
        1. JavaScript code (complete, working code)
        2. HTML changes (if needed, show exact changes to index.html)
        3. CSS changes (if needed, show exact changes to styles.css)
        4. Integration explanation (how it works with existing code)
        5. Testing instructions (how to test the feature)
        
        CRITICAL: Generate JavaScript code, NOT Python!
        """,
        agent=agent,
        expected_output="Complete JavaScript implementation with HTML/CSS changes if needed, following app.js patterns exactly"
    )
    
    return task

def create_review_task(code_to_review, reviewer_agent):
    """Create a task for reviewing generated code"""
    
    task = Task(
        description=f"""
        Review the following code and verify:
        
        {code_to_review}
        
        Check:
        1. Is it JavaScript (NOT Python)?
        2. Does it follow patterns in app.js?
        3. Does it use vanilla JavaScript (no frameworks)?
        4. Does it match existing code style?
        5. Will it integrate properly with existing code?
        
        Provide feedback and corrections if needed.
        """,
        agent=reviewer_agent,
        expected_output="Code review with verification that code is JavaScript and follows project patterns"
    )
    
    return task

# ============================================================================
# CREW FACTORY
# ============================================================================

def create_development_crew():
    """Create a development crew with JavaScript developer and reviewer"""
    
    context = load_project_context()
    
    developer = create_javascript_developer_agent(context)
    reviewer = create_code_reviewer_agent(context)
    
    crew = Crew(
        agents=[developer, reviewer],
        tasks=[],  # Tasks will be added when using the crew
        verbose=True,
        process='sequential'  # Developer first, then reviewer
    )
    
    return crew, developer, reviewer

# ============================================================================
# QUICK START FUNCTIONS
# ============================================================================

def implement_feature(feature_description):
    """
    Quick function to implement a feature.
    
    Usage:
        result = implement_feature("Add export to CSV functionality")
    """
    
    context = load_project_context()
    developer = create_javascript_developer_agent(context)
    reviewer = create_code_reviewer_agent(context)
    
    # Create tasks
    implement_task = create_feature_task(feature_description, developer)
    
    # Create crew
    crew = Crew(
        agents=[developer, reviewer],
        tasks=[implement_task],
        verbose=True
    )
    
    # Execute
    result = crew.kickoff()
    
    return result

def test_setup():
    """Test that CrewAI is configured correctly"""
    
    print("🧪 Testing CrewAI Configuration...")
    print("=" * 60)
    
    # Load context
    context = load_project_context()
    
    # Check if context loaded
    if not context.get('javascript'):
        print("❌ ERROR: Could not load app.js")
        return False
    
    if not context.get('html'):
        print("❌ ERROR: Could not load index.html")
        return False
    
    print("✅ Context files loaded successfully")
    print(f"   - JavaScript: {len(context.get('javascript', ''))} characters")
    print(f"   - HTML: {len(context.get('html', ''))} characters")
    print(f"   - CSS: {len(context.get('css', ''))} characters")
    print(f"   - Project Context: {len(context.get('project_context', ''))} characters")
    
    # Test agent creation
    try:
        developer = create_javascript_developer_agent(context)
        print("✅ JavaScript developer agent created")
    except Exception as e:
        print(f"❌ ERROR creating agent: {e}")
        return False
    
    # Test simple task
    print("\n📝 Testing with simple task...")
    try:
        task = create_feature_task(
            "Add a simple console.log('Hello from CrewAI') to app.js",
            developer
        )
        print("✅ Task created successfully")
    except Exception as e:
        print(f"❌ ERROR creating task: {e}")
        return False
    
    print("\n✅ CrewAI setup is ready to use!")
    print("\nTo implement a feature, use:")
    print("  from crewai_config import implement_feature")
    print("  result = implement_feature('Your feature description')")
    
    return True

# ============================================================================
# MAIN
# ============================================================================

if __name__ == "__main__":
    print("🚀 CrewAI Configuration for Beautiful Timetracker App")
    print("=" * 60)
    
    # Test setup
    if test_setup():
        print("\n✅ Setup complete! CrewAI is ready to use.")
    else:
        print("\n❌ Setup failed. Please check the configuration.")
