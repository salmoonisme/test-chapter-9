// require
const express = require('express');
const app = express();
const routes = require('./routes');
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use('/api', routes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const error = err.error || err.message || 'Internal server error'
  return res.status(status).json({
    status: status,
    error: error 
  })
})

// server
server.listen(port, () => {
  console.log(`Port running on localhost:${port}`);
});

