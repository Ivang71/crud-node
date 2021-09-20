const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const { MongoClient } = require('mongodb');

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

const addTodo = (text) => {
  return (
    new Promise((res) => {
      client.connect(async () => {
        const collection = client.db('todos-app').collection('todos');
        const todos = await collection.insertOne({ text: text });
        res(todos);
      });
    })
  );
};

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/todos', async (req, res) => {
  res.send(await getTodos());
});

app.post('/todos', async (req, res) => {
  res.json(await addTodo(req.body.text));
});

app.listen(4000);
