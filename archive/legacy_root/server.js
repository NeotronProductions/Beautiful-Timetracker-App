#!/usr/bin/env node
/**
 * Node.js Server for Beautiful Timetracker App
 * 
 * Simple Express server for serving static files.
 * Run with: npm start
 * Or: node server.js
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || '0.0.0.0';

// Serve static files from the project root
app.use(express.static(path.join(__dirname)));

// Enable CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route for root - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Beautiful Timetracker App is running' });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log('🚀 Beautiful Timetracker App Server');
  console.log('=' .repeat(50));
  console.log(`📡 Server running at: http://localhost:${PORT}`);
  console.log(`🌐 Network access: http://${HOST}:${PORT}`);
  console.log(`📁 Serving files from: ${__dirname}`);
  console.log('=' .repeat(50));
  console.log('Press Ctrl+C to stop the server');
});
