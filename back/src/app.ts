import { Request, Response } from 'express';
import { db } from './db';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/todos', async (req: Request, res: Response) => {
  res.send(await db.getTodos());
});

app.post('/todos', async (req: Request, res: Response) => {
  res.json(await db.addTodo(req.body.text));
});

app.listen(4000);
