import express from 'express';
import cors from 'cors';
import { urlencoded } from 'body-parser';
import { MongoClient } from 'mongodb';
import { Request, Response } from 'express';

const app = express();

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));

const port = 4000;

const uri = "mongodb+srv://user0:awesomeTodos@cluster0.qjrp4.mongodb.net/todos-app?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const getTodos = () => {
  return (
    new Promise((res) => {
      client.connect(async () => {
        const collection = client.db('todos-app').collection('todos');
        const todos = await collection.find().toArray();
        res(todos);
      });
    })
  );
};

const addTodo = (text: string) => {
  return (
    new Promise((res) => {
      client.connect(async () => {
        const collection = client.db('todos-app').collection('todos');
        const addedData = await collection.insertOne({ text: text });
        res(addedData);
      });
    })
  );
};

app.get('/todos', async (req: Request, res: Response) => {
  res.send(await getTodos());
});

app.post('/todos', async (req: Request, res: Response) => {
  res.json(await addTodo(req.body.text));
});

app.listen(port, () => console.log(`Server is listening at port ${port}`));
