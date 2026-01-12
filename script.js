// Time tracking state
let timerInterval = null;
let startTime = null;
let elapsedSeconds = 0;
let entries = [];

// DOM elements
const taskNameInput = document.getElementById('taskName');
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const entriesList = document.getElementById('entriesList');

// Load entries from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
    renderEntries();
});

// Start button click handler
startBtn.addEventListener('click', startTimer);

// Stop button click handler
stopBtn.addEventListener('click', stopTimer);

// Delete button click handler using event delegation
entriesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const entryItem = e.target.closest('.entry-item');
        const entryId = parseInt(entryItem.dataset.id);
        deleteEntry(entryId);
    }
});

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
}

function stopTimer() {
    if (!timerInterval) return;

    clearInterval(timerInterval);
    timerInterval = null;

    // Create new entry
    const entry = {
        id: Date.now(),
        task: taskNameInput.value.trim(),
        duration: elapsedSeconds,
        timestamp: new Date().toISOString()
    };

    // Add to entries
    entries.unshift(entry);
    saveEntries();
    renderEntries();

    // Reset timer
    elapsedSeconds = 0;
    updateDisplay(0);

    // Update UI
    startBtn.style.display = 'inline-flex';
    stopBtn.style.display = 'none';
    taskNameInput.disabled = false;
    taskNameInput.value = '';
    taskNameInput.focus();
}

function updateTimer() {
    const currentTime = Date.now();
    elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    updateDisplay(elapsedSeconds);
}

function updateDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    timerDisplay.textContent = 
        `${padZero(hours)}:${padZero(minutes)}:${padZero(secs)}`;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return date.toLocaleDateString('en-US', options);
}

function renderEntries() {
    if (entries.length === 0) {
        entriesList.innerHTML = '<p class="empty-state">No time entries yet. Start tracking!</p>';
        return;
    }

    entriesList.innerHTML = entries.map(entry => `
        <div class="entry-item" data-id="${entry.id}">
            <div class="entry-info">
                <div class="entry-task">${escapeHtml(entry.task)}</div>
                <div class="entry-meta">${formatDate(entry.timestamp)}</div>
            </div>
            <div class="entry-duration">${formatDuration(entry.duration)}</div>
            <button class="btn-delete">Delete</button>
        </div>
    `).join('');
}

function deleteEntry(id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        entries = entries.filter(entry => entry.id !== id);
        saveEntries();
        renderEntries();
    }
}

function saveEntries() {
    localStorage.setItem('timeEntries', JSON.stringify(entries));
}

function loadEntries() {
    const stored = localStorage.getItem('timeEntries');
    if (stored) {
        try {
            entries = JSON.parse(stored);
        } catch (e) {
            console.error('Failed to load entries from localStorage:', e);
            entries = [];
        }
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
