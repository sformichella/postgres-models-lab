require('dotenv').config();
const express = require('express');
const app = express();

const Theorem = require('./lib/models/theorem');

app.use(express.json());


// Theorem Routes
app.get('/theorems', (req, res) => {
  Theorem.getAll()
    .then(thms => res.send(thms));
});

app.get('/theorems/:id', (req, res) => {
  Theorem.getById(req.params.id)
    .then(thm => res.send(thm))
    .catch(err => res.send(err.message));
});

app.post('/theorems', (req, res) => {
  Theorem.make(req.body)
    .then(thm => res.send(thm));
});

app.put('/theorems/:id', (req, res) => {
  Theorem.update(req.params.id, req.body)
    .then(thm => res.send(thm));
});

app.delete('/theorems/:id', (req, res) => {
  Theorem.delete(req.params.id)
    .then(thm => res.send(thm));
});


module.exports = app;
