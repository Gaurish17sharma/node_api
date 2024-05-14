const express = require('express')
const app = express()
const port = 3000;

const db = require('./db');

app.use(express.json());

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUsersById);
app.delete('/users/:id', db.deleteUser);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})