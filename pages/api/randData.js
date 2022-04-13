import { MongoClient } from 'mongodb'
import regions from '../../Components/files/regions'

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useUnifiedTopology: true })


export default async function randData (req, res) {
  const array = Object.values(regions)
  await client.connect()
  const db = client.db(process.env.MONGO_COLLECTION)
  let randArr = []
  for (let i = 0; i < 6; i += 1) {
    const rand = Math.random()*array.length | 0  // выбираем рандомное число для индекса массива
    const  randRegion = array[rand]  // берем объект (регион) с рандомным индексом
    
    const collection = db.collection(randRegion)
    const randomListObject = await collection.aggregate([{ $sample: {size: 1}}]).toArray() // получаем массив с тремя случайных обекта  - не работает
    // console.log('RANDOMOBJECT', randomListObject?.[0])
    if (randomListObject?.[0]) {
      await randomListObject?.[0].houseguid ? randArr = [...randArr, randomListObject[0]] : i -=1  // проверяем есть ли фиас дома - да - вносим в массив, нет - уменьшаем счетчик
    } 
  }

  return res.json(randArr)
}
