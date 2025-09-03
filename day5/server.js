const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Enable CORS for all origins
app.use(cors());

// Alternatively, if you want to allow only specific origin, you can do:
// app.use(cors({ origin: 'http://localhost:5173' }));

const students = [
  { id: 1, name: 'Priyanshu', age: 20 },
  { id: 2, name: 'Rehan', age: 21 },
  { id: 3, name: 'Raunak', age: 19 },
    { id: 4, name: 'Aman', age: 22 },
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/students', (req, res) => {
  res.json(students);  // returns JSON list of students
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
