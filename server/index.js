const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

// Logging middleware
app.use(morgan('dev'));

// You'll of course want static middleware so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, '../public')));

// Body parsing middleware
app.use(express.json());

// Mounts all routes on /api
app.use('/api', require('./apiRoutes'));

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error.');
});

// Starts up the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
