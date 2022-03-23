
import { MongoClient } from 'mongodb'

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useUnifiedTopology: true })

export default async function mongoObj (req, res) {
  const obj = {
    1: 'fuck the mongo'
  }
  const result = client.connect(async () => {
    const db = client.db(process.env.MONGO_COLLECTION)
  const collection = db.collection('searchingObjects')
  await collection.insertOne(obj)
  // collection.updateOne
  })
  return res.json(result) 
}

