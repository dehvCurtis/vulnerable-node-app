// app.js

const express = require('express');
const bodyParser = require('body-parser');
const lodash = require('lodash'); // Vulnerable dependency

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Vulnerable endpoint with lodash vulnerable function
app.post('/vulnerable-endpoint', (req, res) => {
  const data = req.body;
  const sanitizedData = lodash.pick(data, ['username', 'email']); // Vulnerable usage of lodash

  // Process sanitized data (e.g., save to database)
  // ...

  res.status(200).json({ message: 'Data processed successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
