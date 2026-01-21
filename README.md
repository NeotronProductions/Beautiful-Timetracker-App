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

```bash
cd Beautiful-Timetracker-App
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

For more server options, see [`docs/SERVER_SETUP.md`](docs/SERVER_SETUP.md).

## Project structure

```
Beautiful-Timetracker-App/
├── index.html              # Main HTML entry point
├── styles.css              # Main stylesheet
├── app.js                  # Main application logic
├── README.md               # This file
├── .gitignore              # Git ignore rules
│
├── docs/                   # Documentation
│   ├── GETTING_STARTED.md
│   ├── PROJECT_CONTEXT.md
│   ├── SERVER_SETUP.md
│   ├── PULL_REQUEST_GUIDE.md
│   └── ...
│
├── implementations/        # Issue implementation plans
│   ├── issue_528_plan.md
│   ├── issue_542_plan.md
│   └── ...
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
