const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://user0:awesomeTodos@cluster0.qjrp4.mongodb.net/todos-app?retryWrites=true&w=majority';
const client = new MongoClient(uri);

export const db = {
  getTodos() {
    return new Promise((res) => {
      client.connect(async () => {
        const collection = client.db('todos-app').collection('todos');
        const todos = await collection.find().toArray();
        client.close();
        res(todos);
      });
    })
  },
  
  addTodo(text) {
    return new Promise((res) => {
      client.connect(async () => {
        const collection = client.db('todos-app').collection('todos');
        const addedData = await collection.insertOne({ text: text });
        client.close();
        res(addedData);
      });
    })
  }
};
