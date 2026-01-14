# ✨ Beautiful Time Tracker

A minimalist, premium time tracking app with an ambient focus mode that transforms into a living canvas when idle. 

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

## ✨ Features

### 🌙 Ambient Focus Mode
When idle, the timer gracefully transitions into a serene screensaver featuring slowly rotating abstract artwork. Move your mouse to wake it up.

### ⏱️ Time Tracking
- Start, pause, and reset timer with smooth controls
- Automatic session recording
- Track time across multiple projects

### 📊 Project Management
- Create unlimited projects with auto-assigned colors
- Quick project switching
- Per-project time analytics

### 📈 Session History & Analytics
- View all past sessions with duration and project info
- Interactive charts showing time distribution
- Daily totals and trend analysis
- Export data to CSV

### 🎨 Premium Mouse Effects
- **Cursor Glow** - Soft colored glow follows your cursor
- **3D Glass Tilt** - Timer panel tilts with perspective on hover
- **Background Parallax** - Multi-layered depth effect
- **Magnetic Buttons** - Controls subtly attract to cursor

### 💾 Local-First
All data persists in your browser's localStorage. No account required, no data leaves your device.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Vanilla JavaScript (ES6+)** | Core application logic and interactivity |
| **HTML5** | Semantic markup and structure |
| **CSS3** | Styling with modern features (Grid, Flexbox, Custom Properties) |
| **Canvas API** | Ambient background animations |
| **Web APIs** | localStorage, requestAnimationFrame, IntersectionObserver |
| **CSS Animations** | Smooth transitions and effects |
| **Chart.js** (optional) | Analytics visualizations |

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or Node.js required!

### Installation

```bash
# Clone the repository
git clone https://github.com/NeotronProductions/Beautiful-Timetracker-App.git

# Navigate to project directory
cd Beautiful-Timetracker-App

# Open index.html in your browser
# Or use a local server:
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Development

No build step required! Simply:
1. Edit HTML, CSS, or JavaScript files
2. Refresh your browser
3. See changes instantly

For a better development experience, use a local server:
```bash
# Python
python3 -m http.server 8000

# Node.js (if you have it)
npx serve

# PHP
php -S localhost:8000
```

## 📖 Usage

### Basic Timer
1. Click the **Play** button to start tracking time
2. Click **Pause** to stop temporarily
3. Click **Reset** to end the session and clear the timer

### Managing Projects
1. Click the project dropdown in the timer panel
2. Select an existing project or create a new one
3. Each project gets a unique color automatically

### Viewing History
1. Click the **History** icon in the controls
2. Browse past sessions by project
3. Edit or delete sessions as needed
4. Export to CSV for external analysis

### Ambient Mode
- Activates automatically after idle timeout
- Move your mouse to wake the interface
- Toggle manually with the moon/sun icon

## 📁 Project Structure

```
Beautiful-Timetracker-App/
├── index.html              # Main HTML entry point
├── css/
│   ├── styles.css          # Main stylesheet
│   ├── animations.css      # Animation keyframes
│   └── glass-morphism.css  # Glass effect styles
├── js/
│   ├── app.js              # Main application logic
│   ├── timer.js            # Timer functionality
│   ├── projects.js         # Project management
│   ├── sessionHistory.js   # Session persistence
│   ├── ambientMode.js      # Idle detection & screensaver
│   ├── cursorEffects.js    # Mouse tracking & glow
│   ├── magneticButton.js   # Magnetic hover effects
│   ├── charts.js           # Analytics visualizations
│   └── utils.js            # Utility functions
├── assets/
│   ├── images/             # Background images for ambient mode
│   └── icons/              # Icon files
└── README.md
```

## 🎯 Key Design Decisions

- **Glass Morphism**: Frosted glass aesthetic with subtle transparency using CSS backdrop-filter
- **Dark Theme**: Easy on the eyes during long focus sessions
- **Smooth Animations**: 60fps interactions via CSS transitions and requestAnimationFrame
- **No Dependencies on External Services**: Everything runs locally
- **Vanilla JavaScript**: No frameworks - pure, performant, and lightweight
- **Modular Architecture**: Organized into focused JavaScript modules
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## 💻 Code Style

- **ES6+ Features**: Arrow functions, const/let, template literals, destructuring
- **Module Pattern**: Organized into focused modules with clear responsibilities
- **Event-Driven**: Uses native DOM events and custom events for communication
- **CSS Custom Properties**: Uses CSS variables for theming and dynamic values
- **Semantic HTML**: Accessible markup with proper ARIA labels

## 🔧 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

<p align="center">
  Built with ❤️ using vanilla web technologies
</p>
