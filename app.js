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
    
    updateUI();
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
        todaySummary.innerHTML = '<div class="empty-state">Noch keine Zeiteinträge heute</div>';
        return;
    }
    
    todaySummary.innerHTML = '';
    Object.entries(projectTotals).forEach(([project, duration]) => {
        const card = document.createElement('div');
        card.className = 'summary-card';
        
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);
        
        card.innerHTML = `
            <div class="project-name">${project}</div>
            <div class="project-time">${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</div>
        `;
        todaySummary.appendChild(card);
    });
}

function updateEntriesList() {
    if (timeEntries.length === 0) {
        entriesList.innerHTML = '<div class="empty-state">Keine Zeiteinträge vorhanden</div>';
        return;
    }
    
    entriesList.innerHTML = '';
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
    
    card.innerHTML = `
        <div class="entry-info">
            <div class="entry-project">${entry.project}</div>
            <div class="entry-time">${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</div>
            <div class="entry-timestamp">${startTime.toLocaleTimeString('de-DE')} - ${endTime.toLocaleTimeString('de-DE')} | ${new Date(entry.date).toLocaleDateString('de-DE')}</div>
        </div>
        <div class="entry-actions">
            <button class="btn-edit" onclick="editEntry(${entry.id})">Bearbeiten</button>
            <button class="btn-delete" onclick="deleteEntry(${entry.id})">Löschen</button>
        </div>
    `;
    
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
    entryTimeEl.innerHTML = `<input type="text" class="edit-input" value="${currentTime}" id="edit-${id}" placeholder="HH:MM:SS">`;
    
    const actions = card.querySelector('.entry-actions');
    actions.innerHTML = `
        <button class="btn-edit" onclick="saveEntry(${id})">Speichern</button>
        <button class="btn-delete" onclick="cancelEdit(${id})">Abbrechen</button>
    `;
    
    document.getElementById(`edit-${id}`).focus();
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
