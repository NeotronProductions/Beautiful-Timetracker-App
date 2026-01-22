#!/usr/bin/env python3
"""
CrewAI Setup Verification Script

This script verifies that CrewAI is properly configured for this project.
Run this before using CrewAI to ensure everything is set up correctly.
"""

import sys
from pathlib import Path

def check_files():
    """Check that all required files exist"""
    print("📁 Checking required files...")
    
    required_files = {
        'Configuration': 'crewai_config.py',
        'Usage Examples': 'crewai_usage.py',
        'Requirements': 'requirements.txt',
        'Main README': 'CREWAI_README.md',
        'Project Context': 'docs/PROJECT_CONTEXT.md',
        'HTML': 'index.html',
        'JavaScript': 'app.js',
        'CSS': 'styles.css',
    }
    
    all_good = True
    for name, filepath in required_files.items():
        path = Path(filepath)
        if path.exists():
            size = path.stat().st_size
            print(f"  ✅ {name}: {filepath} ({size:,} bytes)")
        else:
            print(f"  ❌ {name}: {filepath} - MISSING!")
            all_good = False
    
    return all_good

def check_context_files():
    """Check that context files can be loaded"""
    print("\n📚 Checking context file loading...")
    
    try:
        from crewai_config import load_project_context
        context = load_project_context()
        
        checks = {
            'Project Context': context.get('project_context'),
            'HTML': context.get('html'),
            'JavaScript': context.get('javascript'),
            'CSS': context.get('css'),
        }
        
        all_good = True
        for name, content in checks.items():
            if content and len(content) > 0:
                print(f"  ✅ {name}: Loaded ({len(content):,} characters)")
            else:
                print(f"  ❌ {name}: Empty or missing!")
                all_good = False
        
        return all_good
    except Exception as e:
        print(f"  ❌ Error loading context: {e}")
        return False

def check_agents():
    """Check that agents can be created"""
    print("\n🤖 Checking agent creation...")
    
    try:
        from crewai_config import create_javascript_developer_agent, load_project_context
        
        context = load_project_context()
        agent = create_javascript_developer_agent(context)
        
        print(f"  ✅ JavaScript Developer Agent: Created")
        print(f"     Role: {agent.role}")
        print(f"     Goal: {agent.goal[:60]}...")
        
        return True
    except Exception as e:
        print(f"  ❌ Error creating agent: {e}")
        import traceback
        traceback.print_exc()
        return False

def check_dependencies():
    """Check if required Python packages are installed"""
    print("\n📦 Checking Python dependencies...")
    
    required = ['crewai']
    optional = ['openai', 'anthropic', 'python-dotenv']
    
    all_good = True
    for package in required:
        try:
            __import__(package)
            print(f"  ✅ {package}: Installed")
        except ImportError:
            print(f"  ❌ {package}: NOT INSTALLED (run: pip install -r requirements.txt)")
            all_good = False
    
    for package in optional:
        try:
            __import__(package)
            print(f"  ✅ {package}: Installed (optional)")
        except ImportError:
            print(f"  ⚠️  {package}: Not installed (optional)")
    
    return all_good

def check_env_file():
    """Check if .env file exists"""
    print("\n🔐 Checking environment setup...")
    
    env_file = Path('.env')
    env_example = Path('.env.example')
    
    if env_file.exists():
        print("  ✅ .env file exists")
        return True
    elif env_example.exists():
        print("  ⚠️  .env file not found, but .env.example exists")
        print("     Copy .env.example to .env and add your API keys")
        return False
    else:
        print("  ⚠️  No .env file found")
        print("     Create .env file with your API keys")
        return False

def main():
    """Run all checks"""
    print("🔍 CrewAI Setup Verification")
    print("=" * 60)
    print()
    
    results = {
        'Files': check_files(),
        'Context Loading': check_context_files(),
        'Agent Creation': check_agents(),
        'Dependencies': check_dependencies(),
        'Environment': check_env_file(),
    }
    
    print("\n" + "=" * 60)
    print("📊 Summary:")
    print()
    
    all_passed = True
    for check, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"  {status}: {check}")
        if not passed:
            all_passed = False
    
    print()
    if all_passed:
        print("🎉 All checks passed! CrewAI is ready to use.")
        print("\nNext steps:")
        print("  1. Add API keys to .env file (if not done)")
        print("  2. Run: python crewai_config.py")
        print("  3. Start using: from crewai_config import implement_feature")
        return 0
    else:
        print("⚠️  Some checks failed. Please fix the issues above.")
        print("\nCommon fixes:")
        print("  - Install dependencies: pip install -r requirements.txt")
        print("  - Create .env file: cp .env.example .env")
        print("  - Add API keys to .env file")
        return 1

if __name__ == "__main__":
    sys.exit(main())
