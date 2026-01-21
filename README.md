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

For more server options, see `SERVER_SETUP.md`.

## Project structure (current)

```
Beautiful-Timetracker-App/
├── index.html
├── styles.css
├── app.js
└── README.md
```

Note: `script.js` exists from an earlier iteration but `index.html` currently loads `app.js`.

## Browser compatibility

Works in modern browsers that support ES6 and localStorage (Chrome/Edge, Firefox, Safari).

## License

MIT
