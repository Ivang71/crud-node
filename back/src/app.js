const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./db');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/todos', async (req, res) => {
  res.send(await db.getTodos());
});

app.post('/todos', async (req, res) => {
  res.json(await db.addTodo(req.body.text));
});

app.listen(4000);
