require('dotenv').config();
const express = require('express');
const app = express();

const Theorem = require('./lib/models/theorem');


app.use(express.json());
const port = 7890;




// Theorem Routes
app.get('/theorems', (req, res) => {
  Theorem.getAll()
    .then(thms => res.send(thms));
});

app.get('/theorems/:id', (req, res) => {
  Theorem.getById(req.params.id)
    .then(thm => res.send(thm));
});

app.post('/make/theorem', (req, res) => {
  Theorem.insert(req.body)
    .then(thm => res.send(thm));
});

app.post('/update/theorems/:id', (req, res) => {
  Theorem.update(req.params.id, req.body)
    .then(thm => res.send(thm));
});

app.get('/delete/theorems/:id', (req, res) => {
  Theorem.delete(req.params.id)
    .then(thm => res.send(thm));
});



app.listen(port, () => {
  console.log(`Started on ${port}.`);
});


module.exports = app;
