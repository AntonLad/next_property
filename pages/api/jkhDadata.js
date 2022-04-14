import { MongoClient } from 'mongodb'
import regions from '../../Components/files/regions'

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useUnifiedTopology: true })

export default async function jkhRec(req, res) {
  console.log('REQ', req.query)
  const inn = req.query.inn
  const ogrn = req.query.ogrn
  const okpo = req.query.okpo
  const okato = req.query.okato
  const oktmo = req.query.oktmo
  const lat = req.query.lat
  const lon = req.query.lon
  const regionFiasCode = req.query.regionFiasCode

  await client.connect()
  const db = client.db(process.env.MONGO_COLLECTION)
  const collection = db.collection('JKHBase')
  const jkhSearch = await collection.find({inn: inn}).toArray()
  const jkh = jkhSearch[0]

  if (jkh) {
    await collection.updateOne({'inn':inn}, { $set: {ogrn, okpo, okato, oktmo, lat, lon, regionFiasCode}}, { upsert: false })
    return res.json('file rec sucsess')
  }

  return res.json({'error' : 'По данным реквизитам управляющая компания не найдена.'})
}
