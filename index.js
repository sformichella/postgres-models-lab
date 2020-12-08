require('dotenv').config();
const express = require('express');
const app = express();

const Theorem = require('./lib/models/theorem');
const Mathematician = require('./lib/models/mathematician');
const ProofTechnique = require('./lib/models/proofTechnique');
const FamousNumber = require('./lib/models/famousNumber');
const Paradox = require('./lib/models/paradox');

app.use(express.json());
const port = 7890;


// Theorem Routes
app.get('/theorems', (req, res) => {
  Theorem.getAll()
    .then(thms => res.send(thms));
})

app.get('/theorems/:id', (req, res) => {
  Theorem.getById(req.query.id)
    .then(thm => res.send(thm));
})

app.post('/make/theorem', (req, res) => {
  Theorem.insert(req.body)
    .then(thm => res.send(thm));
})



app.listen(port, () => {
  console.log(`Started on ${port}.`);
})
