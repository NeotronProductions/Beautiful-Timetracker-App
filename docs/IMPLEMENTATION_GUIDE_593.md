# Implementation Guide: Issue #593 - Filter Sessions by Project

## 📋 Current Codebase Analysis

**Project Type:** Vanilla JavaScript (HTML/CSS/JS)

**Current Structure:**
- Entries stored in `entries` array
- Each entry has: `id`, `task`, `duration`, `timestamp`
- **No project field exists yet** - we need to add this first!

**Files:**
- `index.html` - UI structure
- `script.js` - Logic (187 lines)
- `styles.css` - Styling (239 lines)

## 🎯 Implementation Plan

### Phase 1: Add Project Support to Entries

Since entries don't have projects yet, we need to:
1. Add project field to entry structure
2. Add project input/selection to the timer UI
3. Update entry creation to include project

### Phase 2: Add Filter UI

1. Add filter dropdown in entries section
2. Populate with unique projects
3. Add "All Projects" option
4. Add clear filter button

### Phase 3: Implement Filtering Logic

1. Filter entries by selected projects
2. Update display when filter changes
3. Persist filter state

## 🛠️ Step-by-Step Implementation

### Step 1: Update Entry Structure

**In `script.js`, modify the entry creation (around line 62):**

```javascript
// OLD:
const entry = {
    id: nextId++,
    task: taskNameInput.value.trim(),
    duration: elapsedSeconds,
    timestamp: new Date().toISOString()
};

// NEW:
const entry = {
    id: nextId++,
    task: taskNameInput.value.trim(),
    project: projectInput.value.trim() || 'Uncategorized', // Add project
    duration: elapsedSeconds,
    timestamp: new Date().toISOString()
};
```

### Step 2: Add Project Input to HTML

**In `index.html`, add project input (after taskName input, around line 19):**

```html
<input type="text" id="taskName" placeholder="What are you working on?" class="task-input">
<input type="text" id="projectName" placeholder="Project name (optional)" class="task-input">
```

### Step 3: Update JavaScript to Handle Project Input

**In `script.js`, add project input reference (around line 9):**

```javascript
const taskNameInput = document.getElementById('taskName');
const projectInput = document.getElementById('projectName'); // ADD THIS
const timerDisplay = document.getElementById('timerDisplay');
```

**Update `startTimer()` to handle project (around line 37):**

```javascript
function startTimer() {
    const taskName = taskNameInput.value.trim();
    if (!taskName) {
        alert('Please enter a task name');
        taskNameInput.focus();
        return;
    }

    startTime = Date.now() - (elapsedSeconds * 1000);
    timerInterval = setInterval(updateTimer, 100);
    
    // Update UI
    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline-flex';
    taskNameInput.disabled = true;
    projectInput.disabled = true; // ADD THIS
}
```

**Update `stopTimer()` to reset project input (around line 81):**

```javascript
// Update UI
startBtn.style.display = 'inline-flex';
stopBtn.style.display = 'none';
taskNameInput.disabled = false;
taskNameInput.value = '';
projectInput.disabled = false; // ADD THIS
projectInput.value = ''; // ADD THIS (optional - keep or clear)
taskNameInput.focus();
```

### Step 4: Add Filter UI to HTML

**In `index.html`, add filter section (before entries list, around line 34):**

```html
<section class="entries-section">
    <div class="section-header">
        <h2>Time Entries</h2>
        
        <!-- Project Filter -->
        <div class="session-filter">
            <label for="project-filter">Filter by Project:</label>
            <select id="project-filter" multiple size="3">
                <option value="all">All Projects</option>
            </select>
            <button id="clear-filter" class="btn btn-clear">Clear Filter</button>
        </div>
    </div>
    
    <div id="entriesList" class="entries-list">
        <p class="empty-state">No time entries yet. Start tracking!</p>
    </div>
</section>
```

### Step 5: Add Filter Logic to JavaScript

**Add these functions to `script.js` (after `loadEntries()` function, around line 176):**

```javascript
// Filter state
let selectedProjects = ['all'];

// Get all unique projects from entries
function getAllProjects() {
    const projects = new Set();
    entries.forEach(entry => {
        if (entry.project) {
            projects.add(entry.project);
        }
    });
    return Array.from(projects).sort();
}

// Populate filter dropdown
function populateProjectFilter() {
    const filterSelect = document.getElementById('project-filter');
    if (!filterSelect) return;
    
    const projects = getAllProjects();
    
    // Clear existing options except "All Projects"
    filterSelect.innerHTML = '<option value="all">All Projects</option>';
    
    // Add project options
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project;
        option.textContent = project;
        filterSelect.appendChild(option);
    });
    
    // Restore selected state
    loadFilterState();
}

// Filter entries by selected projects
function getFilteredEntries() {
    if (selectedProjects.length === 0 || selectedProjects.includes('all')) {
        return entries;
    }
    return entries.filter(entry => 
        selectedProjects.includes(entry.project)
    );
}

// Apply filter
function applyProjectFilter() {
    const filterSelect = document.getElementById('project-filter');
    if (!filterSelect) return;
    
    selectedProjects = Array.from(filterSelect.selectedOptions)
        .map(option => option.value);
    
    // Re-render entries with filtered data
    renderEntries();
    
    // Save filter state
    saveFilterState();
}

// Clear filter
function clearProjectFilter() {
    const filterSelect = document.getElementById('project-filter');
    if (!filterSelect) return;
    
    // Select "All Projects"
    Array.from(filterSelect.options).forEach(option => {
        option.selected = (option.value === 'all');
    });
    
    selectedProjects = ['all'];
    applyProjectFilter();
}

// Persist filter state
function saveFilterState() {
    localStorage.setItem('projectFilter', JSON.stringify(selectedProjects));
}

function loadFilterState() {
    const saved = localStorage.getItem('projectFilter');
    if (saved) {
        try {
            selectedProjects = JSON.parse(saved);
            const filterSelect = document.getElementById('project-filter');
            if (filterSelect) {
                Array.from(filterSelect.options).forEach(option => {
                    option.selected = selectedProjects.includes(option.value);
                });
            }
        } catch (e) {
            console.error('Failed to load filter state:', e);
        }
    }
}

// Update renderEntries to use filtered entries
function renderEntries() {
    const filteredEntries = getFilteredEntries();
    
    if (filteredEntries.length === 0) {
        entriesList.innerHTML = '<p class="empty-state">No entries match the selected filter.</p>';
        return;
    }

    entriesList.innerHTML = filteredEntries.map(entry => `
        <div class="entry-item" data-id="${entry.id}">
            <div class="entry-info">
                <div class="entry-task">${escapeHtml(entry.task)}</div>
                <div class="entry-meta">
                    <span class="entry-project">${escapeHtml(entry.project || 'Uncategorized')}</span>
                    <span class="entry-date">${formatDate(entry.timestamp)}</span>
                </div>
            </div>
            <div class="entry-duration">${formatDuration(entry.duration)}</div>
            <button class="btn-delete">Delete</button>
        </div>
    `).join('');
}
```

### Step 6: Initialize Filter on Load

**Update the DOMContentLoaded event (around line 16):**

```javascript
document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
    populateProjectFilter(); // ADD THIS
    renderEntries();
    
    // Filter event listeners
    const filterSelect = document.getElementById('project-filter');
    const clearBtn = document.getElementById('clear-filter');
    
    if (filterSelect) {
        filterSelect.addEventListener('change', applyProjectFilter);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearProjectFilter);
    }
});
```

**Update `saveEntries()` to repopulate filter (around line 157):**

```javascript
function saveEntries() {
    localStorage.setItem('timeEntries', JSON.stringify(entries));
    populateProjectFilter(); // Update filter options when entries change
}
```

### Step 7: Add Styling

**Add to `styles.css`:**

```css
/* Project Filter Styles */
.section-header {
    margin-bottom: 20px;
}

.session-filter {
    margin-top: 15px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
}

.session-filter label {
    font-weight: 600;
    color: #333;
    margin-right: 5px;
}

#project-filter {
    flex: 1;
    min-width: 200px;
    padding: 8px 12px;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    background: white;
    font-size: 14px;
    min-height: 80px;
    max-height: 120px;
}

#project-filter:focus {
    outline: none;
    border-color: #4a90e2;
}

#clear-filter {
    padding: 8px 16px;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;
}

#clear-filter:hover {
    background: #ee5a5a;
}

/* Entry Project Display */
.entry-project {
    display: inline-block;
    padding: 2px 8px;
    background: #e3f2fd;
    color: #1976d2;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    margin-right: 8px;
}
```

## ✅ Testing Checklist

- [ ] Add entries with different projects
- [ ] Filter by single project
- [ ] Filter by multiple projects
- [ ] "All Projects" shows all entries
- [ ] Filter persists on page reload
- [ ] Clear filter works
- [ ] New entries appear in filter dropdown
- [ ] Project displays in entry list

## 📤 Commit

```bash
git checkout -b feature/US-011-filter-sessions-by-project
# Make your changes
git add .
git commit -m "feat: add project support and filter for entries (US-011)

- Add project field to time entries
- Add project input to timer UI
- Implement multi-select project filter
- Add 'All Projects' option
- Add clear filter button
- Persist filter state in localStorage
- Display project in entry list

Closes #593"
```
