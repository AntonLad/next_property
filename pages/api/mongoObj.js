import { MongoClient } from 'mongodb'
const { readFile, writeFile, stat, unlink } = require('fs').promises
const { create } = require('xmlbuilder2')

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useUnifiedTopology: true })

let count = 1

export default async function mongoObj (req, res) {
  const filePath = () => {
    const path = `/mnt/d/dev/next-property/sitemap/sitemap${count}.xml`
    count += 1
    return path
  } 

  const writeNewFile = (data) => {
    return writeFile(filePath(), data, 'utf-8')
  }

  const result = client.connect(async () => {
    const db = client.db(process.env.MONGO_COLLECTION)
    const collection = db.collection('Adygeya')
    const arrayOfFias = await collection.find({}).toArray() // делаем массив из всех объектов в коллекции  
    
    const urlFias = arrayOfFias.reduce((acc, rec) => {
      acc = [...acc, `https://mkdfond.ru/${rec.region_id}-mkd-${rec.houseguid}`]
      return acc
    }, [])   // создаем массив адресов с двумя кодами фиас региональным и дома

    const BUCKET_SIZE = 1000
    const bucketArr = urlFias.reduce(
      (acc, rec) => {
        if (acc[acc.length - 1].length < BUCKET_SIZE) {
          acc[acc.length - 1] = [...acc[acc.length - 1], rec]
          return acc
        }
        return [...acc, [rec]]
      }, [[]]
    )
    // console.log('bucketArr', bucketArr.slice(0, 5))

    bucketArr.map ((it) => {
      const doc = create({ version: '1.0', encoding: "UTF-8" }, {
        urlset: {
          '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
          url: () => {
            return it.map((it) => {
              const x = {
                loc: it,
              } 
              return x 
            })
          } 
        }
      })
      const dataForXML = doc.end({ prettyPrint: true })  // формируем при помощи библиотеки xmlbuilder2 из объекта рзметку xml 
      
      writeNewFile(dataForXML)  // записываем в файл данные со всеми url в формате xml
      // console.log('dataForXML', dataForXML)
    })    
  })
 
  return res.json(result) 
}

