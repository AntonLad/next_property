import axios from "axios"
import { MongoClient } from 'mongodb'

const url = 'mongodb://127.0.0.1/'
const client = new MongoClient(url, { useUnifiedTopology: true })

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const apiKey = process.env.API_KEY
const priceUrl = process.env.PRICE_URL
const socialUrl = process.env.SOCIAL_URL

export default async function findFlat(req, res) {
  const flat = req.query.address
  const cadNumber = req.query.cadNumber
  console.log('CADNUMBER', cadNumber)
  const url = `${priceUrl}${flat}`
  const encodingUrl = encodeURI(url)

  await client.connect()
  const db = client.db('cadastr')
  const collection = db.collection('searchingObjects')
  const resultOfCheckObject = await collection.find({ $or : [{'objectData.objectCn': cadNumber}, {'objectData.id':cadNumber}]}).toArray()
  console.log('CHECKOBJECT', resultOfCheckObject[0].price)
  if (!resultOfCheckObject[0].price) {
    const getAskPrice = await axios({
      headers: {
        'X-Api-Key': apiKey,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
        'Referer': 'https://xn--h1alcedd.xn--d1aqf.xn--p1ai/',
      },
      method: 'GET',
      timeout: 1000 * 15,
      url: encodingUrl
    })
      .then(({ data }) => {
        console.log('PRICE', data)
        return data
      })
      .catch((e) => {
        console.log('ERROR_FIND_FLAT', e)
        return res.json({ error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' })
      })

    const lat = getAskPrice?.bld?.pos?.lat
    const lng = getAskPrice?.bld?.pos?.lng
    const infraUrl = `${socialUrl}${lat}&lng=${lng}`
    const encodingInfraUrl = encodeURI(infraUrl)

    const getAskStructure = await axios({
      headers: {
        'X-Api-Key': apiKey,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
        'Referer': 'https://xn--h1alcedd.xn--d1aqf.xn--p1ai/',
      },
      method: 'GET',
      timeout: 1000 * 15,
      url: encodingInfraUrl
    })
      .then(({ data }) => {
        console.log('SOCIAL', data)
        return data
      })
      .catch((e) => {
        console.log('ERROR_FIND_SOCIAL', e)
        return res.json({ error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' })
      })

    client.connect(async () => {
      const db = client.db('cadastr')
      const collection = db.collection('searchingObjects')
      await collection.updateOne({ $or : [{'objectData.objectCn': cadNumber}, {'objectData.id':cadNumber}]}, { $set: {price: getAskPrice, structures: getAskStructure.social}}, { upsert: false })
    })
    return res.json({ ...getAskPrice, getAskStructure })
  }
  return res.json(resultOfCheckObject[0])
}