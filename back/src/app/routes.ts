import { Express } from 'express'
import { Db } from 'mongodb'

/*app.put('/todos', async (req, res) => {
  res.send(await db.updateTodo(req.body._id, req.body.text));
});*/

export const routes = (app: Express, db: Db) => {
  app.get('/todos', async (req, res) => {
    const collection = db.collection('todos')
    res.send(await collection.find().toArray())
  })

  app.post('/todos', async (req, res) => {
    const collection = db.collection('todos')
    const insertedData = await collection.insertOne({ text: req.body.text })
    res.send(insertedData)
  })

  app.put('/todos', async (req, res) => {
    const collection = db.collection('todos')
    const s = await collection.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body.text },
      { upsert: true }
    )
    console.log('insertedData', s)
  })
  /*updateTodo(_id: string, text: string) {
    return new Promise((res) => {
      client.connect(async () => {
        const collection = client.db('todos-app').collection('todos');
        const t = await collection.findOneAndUpdate({ _id }, { text });
        client.close();
        console.log(t);
        res(t);
      })
    });
  },*/
}
