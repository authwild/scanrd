// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

// Create express app
const app = express();

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/scan', (req, res) => {
  // Parse URLs from request body
  const urls = req.body.urls.split('\n');

  // Spawn a child process to run the scanning script
  const child = spawn('python', ['scan.py', ...urls]);

  // Send the child process output to the client in real-time
  child.stdout.on('data', (data) => {
    res.write(data.toString());
  });

  // Send the child process exit status to the client when the process exits
  child.on('exit', (code) => {
    res.write(`Scan completed with exit code ${code}\n`);
    res.end();
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

