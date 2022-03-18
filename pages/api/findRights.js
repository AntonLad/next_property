import axios from "axios"
import { MongoClient } from 'mongodb'

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useUnifiedTopology: true })

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const egrpUrl = process.env.EGRP_URL

export default async function tooltips(req, res) {
  const cadNumber = req.query.cadNumber
  const objectId = req.query.objectid
  const url = `${egrpUrl}${objectId}`
  const getAskRights = await axios({
    method: 'GET',
    timeout: 1000 * 10,
    url: url
  })
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.log('ERROR_FIND_RIGHTS', e)
      return res.json({ error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' })
    })

  client.connect(async () => {
    const db = client.db(process.env.MONGO_COLLECTION)
    const collection = db.collection('searchingObjects')
    await collection.updateOne({ $or : [{'objectData.objectCn': cadNumber}, {'objectData.id':cadNumber}]}, { $set: {rights: getAskRights}}, { upsert: false })
  })
  return res.json(getAskRights)
}
