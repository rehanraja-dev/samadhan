const express = require('express')
const app = express()
const port = 3000

const students = [
    { id: 1, name: 'Priyanshu', age: 20 },
    { id: 2, name: 'Rehan', age: 21 },
    { id: 3, name: 'Raunak', age: 19 },
]

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/students', (req, res) => {
    res.json(students)   // returns JSON list
})

app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`)
})
