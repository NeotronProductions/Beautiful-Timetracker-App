# Server Setup Guide

## 🎯 For Your Vanilla JS Project

Since your project is **client-side only** (uses localStorage), you just need a simple static file server. Both Python and Node.js work, but here's what's best for your situation:

## ✅ Recommended: Python HTTP Server

### Why Python?
- ✅ **Already installed** on your Raspberry Pi
- ✅ **Zero configuration** - just one command
- ✅ **Lightweight** - perfect for static files
- ✅ **No dependencies** to install
- ✅ **Simple** - no build tools needed

### Quick Start

```bash
cd ~/dev/Beautiful-Timetracker-App
python3 -m http.server 8000
```

Then visit: `http://localhost:8000` or `http://192.168.1.104:8000` (your Pi's IP)

### Advanced Python Server (with CORS, etc.)

If you need more features, create `server.py`:

```python
#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8000))
    server = HTTPServer(('0.0.0.0', port), CORSRequestHandler)
    print(f'Server running at http://localhost:{port}')
    server.serve_forever()
```

Run: `python3 server.py`

## 🔵 Alternative: Node.js (if you prefer)

### Why Node.js?
- ✅ **Fast** and feature-rich
- ✅ **Better for SPAs** (single-page app routing)
- ✅ **More features** (live reload, etc.)
- ⚠️ Requires Node.js installation
- ⚠️ More setup

### Quick Start

```bash
# Install serve globally (one time)
npm install -g serve

# Run server
cd ~/dev/Beautiful-Timetracker-App
serve -p 8000
```

Or use `npx` (no installation):
```bash
npx serve -p 8000
```

## 📊 Comparison

| Feature | Python | Node.js |
|---------|--------|---------|
| **Installation** | ✅ Pre-installed | ⚠️ Need to install |
| **Setup** | ✅ One command | ⚠️ Install package |
| **Performance** | ✅ Good for static | ✅ Excellent |
| **Features** | ⚠️ Basic | ✅ Advanced |
| **SPA Routing** | ⚠️ Manual config | ✅ Built-in |
| **Live Reload** | ❌ No | ✅ Yes (with tools) |
| **CORS** | ⚠️ Manual | ✅ Built-in |

## 🎯 Recommendation for Your Project

**Use Python HTTP Server** because:

1. **Your project is static** - no backend needed
2. **Already installed** - no setup required
3. **Simple** - just `python3 -m http.server 8000`
4. **Sufficient** - handles HTML/CSS/JS perfectly
5. **Lightweight** - minimal resource usage on Pi

## 🚀 Quick Commands

### Python (Recommended)
```bash
# Basic server
python3 -m http.server 8000

# With specific IP (accessible from network)
python3 -m http.server 8000 --bind 0.0.0.0
```

### Node.js (Alternative)
```bash
# Using npx (no install)
npx serve -p 8000

# Or install globally
npm install -g serve
serve -p 8000
```

## 💡 For Production

If you deploy to production later:

- **Static hosting**: GitHub Pages, Netlify, Vercel (all free)
- **No server needed**: Your app is client-side only!
- **CDN**: Use a CDN for better performance

## ✅ Bottom Line

**For development on your Pi: Use Python** - it's simpler, already there, and perfect for your static vanilla JS project!
