import { MongoClient } from 'mongodb'
import regions from '../../Components/files/regions'

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useUnifiedTopology: true })

export default async function mkdRec(req, res) {
  console.log('REQ', req.query)
  const postalcode = req.query.postalcode
  const objecregionFiasCodetId = req.query.regionFiasCode
  const houseFiasCode = req.query.houseFiasCode
  const street = req.query.street
  const house = req.query.house
  const lat = req.query.lat
  const lon = req.query.lon
  const oktmo = req.query.oktmo
  const okato = req.query.okato

  if (houseFiasCode === 'null') {
    return res.json({'error' : 'По указанному адресу жилой многоквартирный дом не найден. Убедитесь в правильности ввода адреса.'})
  }

  await client.connect()
  const db = client.db(process.env.MONGO_COLLECTION)
  const searchRegions = regions[objecregionFiasCodetId]
  const regionCollection = db.collection(`${searchRegions}`)
  const mkdsearch = await regionCollection.find({houseguid: houseFiasCode}).toArray()
  const mkd = mkdsearch[0]
  if (mkd) {
    await regionCollection.updateOne({'houseguid':houseFiasCode}, { $set: {postalcode, lat, lon, oktmo, okato}}, { upsert: false })
    return res.json('file rec sucsess')
  }
  const againMkdSearch = await regionCollection.find({formalname_street: street, house_number:house}).toArray()
  const newMkd = againMkdSearch[0]
  if (newMkd) {

    await regionCollection.updateOne({'formalname_street': street, 'house_number': house}, { $set: {postalcode, lat, lon, oktmo, okato, houseguid: houseFiasCode}}, { upsert: false })
    return res.json('file rec sucsess')
  }

  return res.json({'error' : 'По указанному адресу жилой многоквартирный дом не найден. Убедитесь в правильности ввода адреса.'})
}
