// State management
let currentTimer = null;
let timerStartTime = null;
let timerElapsed = 0;
let currentProject = null;
let timeEntries = [];
let projects = ['Projekt A', 'Projekt B', 'Projekt C'];

// DOM elements
const projectSelect = document.getElementById('project-select');
const customProjectInput = document.getElementById('custom-project-input');
const addProjectBtn = document.getElementById('add-project-btn');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const timerDisplay = document.getElementById('timer');
const currentProjectDisplay = document.getElementById('current-project-display');
const todaySummary = document.getElementById('today-summary');
const entriesList = document.getElementById('entries-list');

// Initialize app
function init() {
    loadFromLocalStorage();
    setupEventListeners();
    updateUI();
}

// Event listeners
function setupEventListeners() {
    projectSelect.addEventListener('change', handleProjectSelect);
    addProjectBtn.addEventListener('click', handleAddProject);
    customProjectInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddProject();
    });
    startBtn.addEventListener('click', handleStart);
    stopBtn.addEventListener('click', handleStop);
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', handleReset);
    }
}

function handleProjectSelect() {
    const selected = projectSelect.value;
    if (selected) {
        currentProject = selected;
        startBtn.disabled = false;
        customProjectInput.value = '';
    } else {
        currentProject = null;
        startBtn.disabled = true;
    }
    updateCurrentProjectDisplay();
}

function handleAddProject() {
    const newProject = customProjectInput.value.trim();
    if (newProject && !projects.includes(newProject)) {
        projects.push(newProject);
        const option = document.createElement('option');
        option.value = newProject;
        option.textContent = newProject;
        projectSelect.appendChild(option);
        projectSelect.value = newProject;
        currentProject = newProject;
        customProjectInput.value = '';
        startBtn.disabled = false;
        saveProjectsToLocalStorage();
        updateCurrentProjectDisplay();
    }
}

function handleStart() {
    if (!currentProject) return;
    
    timerStartTime = Date.now() - timerElapsed;
    currentTimer = setInterval(updateTimer, 100);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    projectSelect.disabled = true;
    customProjectInput.disabled = true;
    addProjectBtn.disabled = true;
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.disabled = false;
    }
}

function handleStop() {
    if (!currentTimer) return;
    
    clearInterval(currentTimer);
    currentTimer = null;
    
    // Create a time entry
    const entry = {
        id: Date.now(),
        project: currentProject,
        duration: timerElapsed,
        startTime: timerStartTime,
        endTime: Date.now(),
        date: new Date().toISOString().split('T')[0]
    };
    
    timeEntries.unshift(entry);
    saveToLocalStorage();
    
    // Reset timer
    timerElapsed = 0;
    timerStartTime = null;
    updateTimer();
    
    startBtn.disabled = false;
    stopBtn.disabled = true;
    projectSelect.disabled = false;
    customProjectInput.disabled = false;
    addProjectBtn.disabled = false;
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.disabled = true;
    }
    
    updateUI();
}

function confirmReset() {
    const timerMinutes = Math.floor(timerElapsed / 60000);
    if (timerMinutes > 1) {
        return confirm("Are you sure you want to reset the timer? This will discard any ongoing session.");
    }
    return true;
}

function handleReset() {
    if (!confirmReset()) return;
    
    // Stop timer if running
    if (currentTimer) {
        clearInterval(currentTimer);
        currentTimer = null;
    }
    
    // Reset timer state
    timerElapsed = 0;
    timerStartTime = null;
    updateTimer();
    
    // Re-enable controls
    startBtn.disabled = !currentProject;
    stopBtn.disabled = true;
    projectSelect.disabled = false;
    customProjectInput.disabled = false;
    addProjectBtn.disabled = true; // Disable reset when at zero
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.disabled = true;
    }
}

function updateTimer() {
    if (currentTimer) {
        timerElapsed = Date.now() - timerStartTime;
    }
    
    const hours = Math.floor(timerElapsed / 3600000);
    const minutes = Math.floor((timerElapsed % 3600000) / 60000);
    const seconds = Math.floor((timerElapsed % 60000) / 1000);
    
    timerDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateCurrentProjectDisplay() {
    if (currentProject) {
        currentProjectDisplay.textContent = `Aktuelles Projekt: ${currentProject}`;
    } else {
        currentProjectDisplay.textContent = '';
    }
}

function updateUI() {
    updateTodaySummary();
    updateEntriesList();
}

function updateTodaySummary() {
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = timeEntries.filter(entry => entry.date === today);
    
    const projectTotals = {};
    todayEntries.forEach(entry => {
        if (!projectTotals[entry.project]) {
            projectTotals[entry.project] = 0;
        }
        projectTotals[entry.project] += entry.duration;
    });
    
    if (Object.keys(projectTotals).length === 0) {
        todaySummary.textContent = '';
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'Noch keine Zeiteinträge heute';
        todaySummary.appendChild(emptyState);
        return;
    }
    
    todaySummary.textContent = '';
    Object.entries(projectTotals).forEach(([project, duration]) => {
        const card = document.createElement('div');
        card.className = 'summary-card';
        
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);
        
        const projectNameDiv = document.createElement('div');
        projectNameDiv.className = 'project-name';
        projectNameDiv.textContent = project;
        
        const projectTimeDiv = document.createElement('div');
        projectTimeDiv.className = 'project-time';
        projectTimeDiv.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        card.appendChild(projectNameDiv);
        card.appendChild(projectTimeDiv);
        todaySummary.appendChild(card);
    });
}

function updateEntriesList() {
    if (timeEntries.length === 0) {
        entriesList.textContent = '';
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'Keine Zeiteinträge vorhanden';
        entriesList.appendChild(emptyState);
        return;
    }
    
    entriesList.textContent = '';
    timeEntries.forEach(entry => {
        const card = createEntryCard(entry);
        entriesList.appendChild(card);
    });
}

function createEntryCard(entry) {
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.dataset.id = entry.id;
    
    const hours = Math.floor(entry.duration / 3600000);
    const minutes = Math.floor((entry.duration % 3600000) / 60000);
    const seconds = Math.floor((entry.duration % 60000) / 1000);
    
    const startTime = new Date(entry.startTime);
    const endTime = new Date(entry.endTime);
    
    // Create info section
    const infoDiv = document.createElement('div');
    infoDiv.className = 'entry-info';
    
    const projectDiv = document.createElement('div');
    projectDiv.className = 'entry-project';
    projectDiv.textContent = entry.project;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'entry-time';
    timeDiv.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const timestampDiv = document.createElement('div');
    timestampDiv.className = 'entry-timestamp';
    timestampDiv.textContent = `${startTime.toLocaleTimeString('de-DE')} - ${endTime.toLocaleTimeString('de-DE')} | ${new Date(entry.date).toLocaleDateString('de-DE')}`;
    
    infoDiv.appendChild(projectDiv);
    infoDiv.appendChild(timeDiv);
    infoDiv.appendChild(timestampDiv);
    
    // Create actions section
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'entry-actions';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'btn-edit';
    editBtn.textContent = 'Bearbeiten';
    editBtn.addEventListener('click', () => editEntry(entry.id));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Löschen';
    deleteBtn.addEventListener('click', () => deleteEntry(entry.id));
    
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);
    
    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);
    
    return card;
}

function editEntry(id) {
    const entry = timeEntries.find(e => e.id === id);
    if (!entry) return;
    
    const card = document.querySelector(`[data-id="${id}"]`);
    card.classList.add('editing');
    
    const hours = Math.floor(entry.duration / 3600000);
    const minutes = Math.floor((entry.duration % 3600000) / 60000);
    const seconds = Math.floor((entry.duration % 60000) / 1000);
    
    const currentTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const entryTimeEl = card.querySelector('.entry-time');
    entryTimeEl.textContent = '';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = currentTime;
    input.id = `edit-${id}`;
    input.placeholder = 'HH:MM:SS';
    entryTimeEl.appendChild(input);
    
    const actions = card.querySelector('.entry-actions');
    actions.textContent = '';
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-edit';
    saveBtn.textContent = 'Speichern';
    saveBtn.addEventListener('click', () => saveEntry(id));
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn-delete';
    cancelBtn.textContent = 'Abbrechen';
    cancelBtn.addEventListener('click', () => cancelEdit(id));
    
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
    
    input.focus();
}

function saveEntry(id) {
    const input = document.getElementById(`edit-${id}`);
    const timeStr = input.value.trim();
    
    const timeParts = timeStr.split(':');
    if (timeParts.length !== 3) {
        alert('Ungültiges Format. Bitte HH:MM:SS verwenden.');
        return;
    }
    
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        alert('Ungültige Zeitwerte.');
        return;
    }
    
    // Validate ranges
    if (hours < 0 || minutes < 0 || minutes >= 60 || seconds < 0 || seconds >= 60) {
        alert('Ungültige Zeitwerte. Minuten und Sekunden müssen zwischen 0 und 59 liegen.');
        return;
    }
    
    const newDuration = hours * 3600000 + minutes * 60000 + seconds * 1000;
    
    const entry = timeEntries.find(e => e.id === id);
    entry.duration = newDuration;
    entry.endTime = entry.startTime + newDuration;
    
    saveToLocalStorage();
    updateUI();
}

function cancelEdit(id) {
    updateUI();
}

function deleteEntry(id) {
    if (!confirm('Möchten Sie diesen Eintrag wirklich löschen?')) {
        return;
    }
    
    timeEntries = timeEntries.filter(e => e.id !== id);
    saveToLocalStorage();
    updateUI();
}

// LocalStorage functions
function saveToLocalStorage() {
    localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
}

function saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadFromLocalStorage() {
    const stored = localStorage.getItem('timeEntries');
    if (stored) {
        try {
            timeEntries = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading entries:', e);
            timeEntries = [];
        }
    }
    
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
        try {
            const loadedProjects = JSON.parse(storedProjects);
            // Add only new projects
            loadedProjects.forEach(project => {
                if (!projects.includes(project)) {
                    projects.push(project);
                    const option = document.createElement('option');
                    option.value = project;
                    option.textContent = project;
                    projectSelect.appendChild(option);
                }
            });
        } catch (e) {
            console.error('Error loading projects:', e);
        }
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', init);
