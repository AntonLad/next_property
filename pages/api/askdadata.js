import axios from "axios"
import { MongoClient } from 'mongodb'

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useUnifiedTopology: true })

export default async function dadata(req, res) {
  const cadNumber = req.query.cadNumber
  console.log('DADATACADNUMBER', cadNumber)
  await client.connect()
  const db = client.db(process.env.MONGO_COLLECTION)
  const collection = db.collection('searchingObjects')
  const resultOfCheckObject = await collection.find({ $or : [{'objectData.objectCn': cadNumber}, {'objectData.id':cadNumber}]}).toArray()
  const address = resultOfCheckObject[0]?.objectData?.objectAddress?.addressNotes || resultOfCheckObject[0]?.objectData?.objectAddress?.mergedAddress
  const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
  if (address) {
    const getAskDadata = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Token 70b8dda637580dd14625d9296f24945f2a6fc4f9',
        'Host': 'suggestions.dadata.ru',
      },
      url: encodeURI(url),
      data: {query: address, 'count':10}
    })
      .then(({ data }) => {
        return data
      })
      .catch((e) => {
        console.log('ERROR_FIND_SOCIAL', e)
        return res.json({ error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' })
      })

      client.connect(async () => {
        const db = client.db(process.env.MONGO_COLLECTION)
        const collection = db.collection('searchingObjects')
        await collection.updateOne({ $or : [{'objectData.objectCn': cadNumber}, {'objectData.id':cadNumber}]}, { $set: {dadata: getAskDadata?.suggestions[0]?.data}}, { upsert: false })
      })
      return res.json(getAskDadata)
  }

}

