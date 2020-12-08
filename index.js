require('dotenv').config();
const express = require('express');
const app = express();

const Theorem = require('./lib/models/theorem')

app.use(express.json());
const port = 7890;

app.post('/make/theorem', async (req, res) => {
  Theorem.insert(req.body)
    .then(thm => res.send(thm))
})

app.listen(port, () => {
  console.log(`Started on ${port}.`);
})
