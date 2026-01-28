# Node.js Server Setup

## Quick Start

### Install Dependencies (First Time Only)
```bash
npm install
```

### Start the Server
```bash
npm start
```

Or directly:
```bash
node server.js
```

The server will start on `http://localhost:8000`

## Configuration

### Environment Variables
- `PORT` - Server port (default: 8000)
- `HOST` - Server host (default: 0.0.0.0)

Example:
```bash
PORT=3000 HOST=127.0.0.1 npm start
```

## Features

- ✅ Serves static files (HTML, CSS, JS)
- ✅ CORS enabled for development
- ✅ Health check endpoint at `/health`
- ✅ Simple and lightweight
- ✅ Works with vanilla JavaScript app

## Alternative: Simple Static Server

If you prefer a simpler option without Express:

```bash
# Using npx (no installation needed)
npx serve -p 8000

# Or install globally
npm install -g serve
serve -p 8000
```

## Comparison

| Method | Pros | Cons |
|--------|------|------|
| **Express (server.js)** | More control, extensible | Requires npm install |
| **serve package** | Very simple, no config | Less control |
| **Python http.server** | No dependencies | Less features |

## Production

For production, consider:
- **Static hosting**: GitHub Pages, Netlify, Vercel (free)
- **No server needed**: App is client-side only!
