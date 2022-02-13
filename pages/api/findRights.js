import axios from "axios"
import { MongoClient } from 'mongodb'

const url = 'mongodb://127.0.0.1/'
const client = new MongoClient(url, { useUnifiedTopology: true })

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const egrpUrl = process.env.EGRP_URL

export default async function tooltips(req, res) {
  const cadNumber = req.query.cadNumber
  const objectId = req.query.objectid
  console.log('REQ', cadNumber)
  const url = `${egrpUrl}${objectId}`
  console.log('URL', url)
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
    const db = client.db('cadastr')
    const collection = db.collection('searchingObjects')
    await collection.updateOne({'objectData.objectCn': cadNumber}, { $set: {rights: getAskRights}}, { upsert: false })
  })  
  console.log('RIGHTS', getAskRights)
  return res.json(getAskRights)
}
