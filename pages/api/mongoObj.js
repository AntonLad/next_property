import { MongoClient } from 'mongodb'
import regions from '../../Components/files/regions'
const { readFile, writeFile, stat, unlink } = require('fs').promises
const { create } = require('xmlbuilder2')


// функция по созданию файлов sitemap

// const url = process.env.MONGO_URL
// const client = new MongoClient(url, { useUnifiedTopology: true })
// let count = 1
// const arrayOfCollectionOfRegions = Object.values(regions)
// export default async function mongoObj (req, res) {
//   const result = client.connect(async () => {
//     async function totalResult () {
//       arrayOfCollectionOfRegions.slice(90, 100).map(async (it) => {
//       // arrayOfCollectionOfRegions.filter(it => it === 'Voronejskaya Oblast').map(async (it) => {  // строка для создания файла по конкретной области
//         console.log('arrayOfCollectionOfRegions', it)
//         const filePath = () => {
//           const renameRegion = it.split(' ').join('_')
//           const path = `/mnt/d/dev/next-property/public/sitemap/sitemap_${renameRegion}_${count}.xml`
//           count += 1
//           console.log('renameRegion', renameRegion  )
//           return path
//         } // формируем название файла виде sitemap+имяРегиона+count, count  увеличивем на один после каждой записи файла
//         const writeNewFile = (data) => {
//           return writeFile(filePath(), data, 'utf-8')
//         }
//         const db = client.db(process.env.MONGO_COLLECTION)
//         const collection = db.collection(it)
//         const arrayOfFias = await collection.find({}).toArray() // делаем массив из всех объектов в коллекции
//         const urlFias = arrayOfFias.reduce((acc, rec) => {
//           acc = [...acc, `https://mkdfond.ru/mkd/${rec.region_id}-mkd-${rec.houseguid}`]
//           return acc
//         }, [])   // создаем массив адресов с двумя кодами фиас региональным и дома
//         const bucketSize = 1750
//         const bucketArr = urlFias.reduce(
//           (acc, rec) => {
//             if (acc[acc.length - 1].length < bucketSize) {
//               acc[acc.length - 1] = [...acc[acc.length - 1], rec]
//               return acc
//             }
//             return [...acc, [rec]]
//           }, [[]]
//         )  // создаем масиив с масивами ограниченными по колличеству переменной  bucketSize
//         // console.log('bucketArr', bucketArr.slice(0, 5))

//         bucketArr.map ((it) => {
//           const doc = create({ version: '1.0', encoding: "UTF-8" }, {
//             urlset: {
//               '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
//               '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
//               '@xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd',
//               url: () => {
//                 return it.map((it) => {
//                   const x = {
//                     loc: it,
//                     lastmod: '2022-04-08T09:54:04-05:00',
//                     changefreq: 'monthly',
//                     priority: 0.8
//                   }
//                   return x
//                 })
//               }
//             }
//           })
//           const dataForXML = doc.end({ prettyPrint: true })  // формируем при помощи библиотеки xmlbuilder2 из объекта рзметку xml
//           writeNewFile(dataForXML)  // записываем в файл данные со всеми url в формате xml
//           console.log('файл номер', count, it.length )
//         })
//       })
//     }
//     return totalResult()
//   })
//   return res.json(result)
// }

// функция по созданию файла sitemapindex

const fs = require('fs')
const dir = '/mnt/d/dev/next-property/public/sitemap'
const files = fs.readdirSync(dir)

export default async function mongoObj (req, res) {
  let arrayOfFileName = []

  for (const file of files) {
    arrayOfFileName = [...arrayOfFileName, file]
  }
  // console.log('arrofName', arrayOfFileName.slice(0, 10) )
  const arrayOfUrl = arrayOfFileName.reduce((acc, rec) => {
    acc = [...acc, `https://mkdfond.ru/sitemap/${rec}`]
    return acc
  }, [])  // создаем массив адресов где лежат файлы sitemap

  const doc = create({ version: '1.0', encoding: "UTF-8" }, {
    sitemapindex: {
      '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      '@xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd',
      sitemap: () => {
        return arrayOfUrl.slice(0, 1000).map((it) => {
          const x = {
            loc: it,
          }
          return x
        })
      }
    }
  })

  const dataForXML = doc.end({ prettyPrint: true }) // формируем при помощи библиотеки xmlbuilder2 из объекта рзметку xml
  writeFile('/mnt/d/dev/next-property/public/sitemap.xml', dataForXML, 'utf-8') // записываем в файл данные со всеми url в формате xml
  return res.json(arrayOfFileName)
}

