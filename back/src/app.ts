import express from 'express';
import cors from 'cors';
import { urlencoded } from 'body-parser';
import { Request, Response } from 'express';
import { db } from './db';

const app = express();

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));

app.get('/todos', async (req: Request, res: Response) => {
  res.send(await db.getTodos());
});

app.post('/todos', async (req: Request, res: Response) => {
  res.json(await db.addTodo(req.body.text));
});

const port = 4000;

const server = app.listen(port, () => console.log(`Server is listening at port ${port}`));

process.on('SIGINT', async () => {
  await server.close(() => console.log('Server stopped'));
  process.exit();
});
