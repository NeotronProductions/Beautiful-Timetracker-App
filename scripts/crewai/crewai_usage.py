"""
CrewAI Usage Examples for Beautiful Timetracker App

This file shows how to use CrewAI to implement features in this project.
"""

from crewai_config import implement_feature, create_development_crew, create_feature_task, test_setup

# ============================================================================
# EXAMPLE 1: Simple Feature Implementation
# ============================================================================

def example_export_to_csv():
    """Example: Add export to CSV functionality"""
    
    feature_description = """
    Add a feature to export all time entries to CSV format.
    
    Requirements:
    1. Add an "Export to CSV" button in the entries section of index.html
    2. When clicked, generate a CSV file with all time entries from localStorage
    3. The CSV should include: project name, duration, start time, end time, date
    4. Download the CSV file with filename: timetracker_export_YYYY-MM-DD.csv
    5. Follow existing code patterns in app.js
    6. Style the button following styles.css patterns
    """
    
    result = implement_feature(feature_description)
    return result

# ============================================================================
# EXAMPLE 2: Using Crew Directly
# ============================================================================

def example_custom_crew():
    """Example: Using the crew directly for more control"""
    
    crew, developer, reviewer = create_development_crew()
    
    # Create custom task
    task = create_feature_task(
        """
        Add a "Reset All" button that clears all time entries.
        
        Requirements:
        - Add button to index.html in entries section
        - Add JavaScript handler in app.js following existing patterns
        - Add CSS styling in styles.css following existing button styles
        - Show confirmation dialog before clearing
        - Clear both timeEntries array and localStorage
        """,
        developer
    )
    
    # Add task to crew
    crew.tasks = [task]
    
    # Execute
    result = crew.kickoff()
    return result

# ============================================================================
# EXAMPLE 3: Multiple Features
# ============================================================================

def example_multiple_features():
    """Example: Implementing multiple features"""
    
    crew, developer, reviewer = create_development_crew()
    
    features = [
        "Add a filter dropdown to filter entries by project",
        "Add a search box to search entries by project name",
        "Add keyboard shortcuts: Space to start/stop timer, Escape to reset"
    ]
    
    tasks = []
    for feature in features:
        task = create_feature_task(feature, developer)
        tasks.append(task)
    
    crew.tasks = tasks
    result = crew.kickoff()
    return result

# ============================================================================
# MAIN
# ============================================================================

if __name__ == "__main__":
    print("📚 CrewAI Usage Examples")
    print("=" * 60)
    print("\nAvailable examples:")
    print("1. example_export_to_csv() - Add CSV export feature")
    print("2. example_custom_crew() - Use crew directly")
    print("3. example_multiple_features() - Implement multiple features")
    print("\nTo test setup:")
    print("  test_setup()")
    print("\nTo implement a feature:")
    print("  result = implement_feature('Your feature description')")
