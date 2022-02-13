import axios from "axios"
import { MongoClient } from 'mongodb'

const url = 'mongodb://127.0.0.1/'
const client = new MongoClient(url, { useUnifiedTopology: true })

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const cadastrUrl = process.env.CADASTR_URL


export default async function tooltips(req, res) {
  const cadNumber = req.query.cadNumber
  console.log('CADNUMBER', cadNumber)
  const regexp = /\d+:\d+:\d+:\d+/g
  const checker = regexp.test(cadNumber)
  const cadNum = cadNumber.trim()

  if (!checker) {
    return res.json({ error: 'Не корректные условия поиска. Введите кадастровый номер или адрес объекта' })
  }
  const getAskReestrByCudNum = await axios({
    method: 'GET',
    timeout: 1000 * 15,
    url: `${cadastrUrl}${cadNum}`,
  })
    .then(({ data }) => {
      if (data.errorCode) {
        return res.json({ error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' })
      }
      return data
    })
    .catch((e) => {
      console.log('ERROR_FIND_OBJECT', e)
      return res.json({ error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' })
    })
  console.log('REESTR', getAskReestrByCudNum)

  client.connect(async () => {
    const db = client.db('cadastr')
    const collection = db.collection('searchingObjects')
    const object = await collection.find({'objectData.objectCn': cadNumber}).toArray()
    console.log('OBJECT', object.length)
    if (object.length === 0) {
      await collection.insertOne(getAskReestrByCudNum)
      await collection.updateOne
    }
  })
  return res.json(getAskReestrByCudNum)

}