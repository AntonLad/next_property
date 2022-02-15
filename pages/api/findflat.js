import axios from "axios"
import { MongoClient } from 'mongodb'

const url = 'mongodb://127.0.0.1/'
const client = new MongoClient(url, { useUnifiedTopology: true })

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const apiKey = process.env.API_KEY
const priceUrl = process.env.PRICE_URL
const socialUrl = process.env.SOCIAL_URL

export default async function tooltips(req, res) {
  const flat = req.query.address
  const cadNumber = req.query.cadNumber
  const url = `${priceUrl}${flat}`
  const encodingUrl = encodeURI(url)
  const getAskPrice = await axios({
    headers: {
      'X-Api-Key': apiKey,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
      'Referer': 'https://xn--h1alcedd.xn--d1aqf.xn--p1ai/',
    },
    method: 'GET',
    timeout: 1000 * 10,
    url: encodingUrl
  })
    .then(({ data }) => {
      console.log('PRICE', data.address)
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
    timeout: 1000 * 10,
    url: encodingInfraUrl
  })
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.log('ERROR_FIND_SOCIAL', e)
      return res.json({ error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' })
    })

  client.connect(async () => {
    const db = client.db('cadastr')
    const collection = db.collection('searchingObjects')
    await collection.updateOne({'objectData.objectCn': cadNumber}, { $set: {price: getAskPrice, structures: getAskStructure.social}}, { upsert: false })
  })
  return res.json({ ...getAskPrice, getAskStructure })
}