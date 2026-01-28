# Beautiful Timetracker App ⏱️

A simple, beautiful **vanilla HTML/CSS/JavaScript** time tracker with **project selection**, **daily summaries**, and **local-first storage** (localStorage).

## Features

- **Project-based tracking**: pick a project and start/stop the timer
- **Custom projects**: add your own project names
- **Daily summary**: totals per project for “today”
- **History**: saved entries list with timestamps
- **Edit & delete**: adjust durations or remove entries
- **Local-first**: data stays in your browser via localStorage
- **No build step**: static files only

## Getting started

### Option A: open directly

- Open `index.html` in your browser.

### Option B (recommended): run a local server

**Node.js Server (Recommended):**
```bash
cd Beautiful-Timetracker-App
npm install  # First time only
npm start    # Starts on port 9000
```

**Or Python Server:**
```bash
cd Beautiful-Timetracker-App
python3 -m http.server 9000
```

Then open `http://localhost:9000`.

For more server options, see [`docs/SERVER_SETUP.md`](docs/SERVER_SETUP.md).

## Project structure

```
Beautiful-Timetracker-App/
├── index.html              # Main HTML entry point
├── styles.css              # Main stylesheet
├── app.js                  # Main application logic
├── server.js               # Node.js server
├── package.json            # Node.js dependencies
├── README.md               # This file
├── .gitignore              # Git ignore rules
│
├── docs/                   # Documentation
│   ├── GETTING_STARTED.md
│   ├── PROJECT_CONTEXT.md
│   ├── SERVER_SETUP.md
│   ├── README_SERVER.md
│   ├── SETUP_COMPLETE.md
│   ├── SETUP_STATUS.md
│   ├── PULL_REQUEST_GUIDE.md
│   └── ...
│
├── scripts/                # Scripts and utilities
│   └── crewai/            # CrewAI integration scripts
│       ├── crewai_config.py
│       ├── crewai_example.py
│       ├── activate_crewai.sh
│       ├── requirements.txt
│       └── README.md
│
├── implementations/        # Issue implementation plans
│   ├── issue_528_plan.md
│   ├── issue_542_plan.md
│   └── ...
│
├── tests/                  # Test files
│   └── app.test.js
│
├── patches/                # Patch files
│   └── crewai_patch.diff
│
└── archive/                # Legacy files
    └── script.js           # Previous version (replaced by app.js)
```

See [`docs/README.md`](docs/README.md) for documentation details.

## Browser compatibility

Works in modern browsers that support ES6 and localStorage (Chrome/Edge, Firefox, Safari).

## License

MIT
