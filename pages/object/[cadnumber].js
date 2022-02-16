import { MongoClient } from 'mongodb'
import InfoAppart from '../../Components/info-building'
import Meta from '../../Components/meta'
import { useRouter } from 'next/router'
const url = 'mongodb://127.0.0.1/'
const client = new MongoClient(url, { useUnifiedTopology: true })

// const objectIdUrl = process.env.OBJECT_ID_URL
// const egrpUrl = process.env.EGRP_URL
// const apiKey = process.env.API_KEY
// const cadastrUrl = process.env.CADASTR_URL
// const priceUrl = process.env.PRICE_URL
// const socialUrl = process.env.SOCIAL_URL

export default function Object({ cadastralObject }) {
  const router = useRouter()
  const cadNumber = router.query.cadnumber
  const props = JSON.parse(cadastralObject)
  const addressNotes = props?.objectData?.objectAddress?.addressNotes || props?.objectData?.objectAddress?.mergedAddress
  console.log('addressNotes', addressNotes)
  return (
      <div>
        <Meta
          title={`Проверка объекта недвижимости онлайн. Кадастровый номер: ${cadNumber}, адрес: ${addressNotes}`}
          descritoin={`Проверка объекта недвижимости онлайн по кадастровому номеру ${cadNumber} | Проверка объекта недвижимости онлайн по адресу: ${addressNotes}`}
          keywords={`${cadNumber}, проверка недвижимости, ЕГРН, Росреестр`}
        />
        <InfoAppart cadastrObj={JSON.parse(cadastralObject)}/>
      </div>
  )
}

// export async function getStaticPaths() {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: 'blocking' //indicates the type of fallback
//   }
// }

// export async function getStaticProps(context) {
//   const info = context.params.cadnumber
//   const getAskReestrByCudNum = await axios.get(`${cadastrUrl}${info}`)
//   const reestrData = getAskReestrByCudNum.data
//   console.log('REESTRBLYA', reestrData)
//   const askObjectId = await axios(`${objectIdUrl}/${info}`)
//   const objectId = askObjectId.data[0]?.objectId || null
//   console.log('objectId', objectId)

//   const getAskRights = await axios(`${egrpUrl}${objectId}`)
//   const rights = getAskRights.data
//   console.log('rights', rights)

//   const oksType = reestrData.parcelData.oksType
//   const address = reestrData.objectData.addressNote

//   if (oksType === 'flat') {
//     const url = `${priceUrl}${address}`
//     const encodingUrl = encodeURI(url)
//     const getAskPrice = await axios({
//       headers: {
//         'X-Api-Key': apiKey,
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
//         'Referer': 'https://xn--h1alcedd.xn--d1aqf.xn--p1ai/',
//       },
//       method: 'GET',
//       timeout: 1000 * 10,
//       url: encodingUrl
//     })
//     const flatPrice = getAskPrice.data
//     console.log('PRICE', flatPrice)
//     const lat = flatPrice?.bld?.pos?.lat
//     const lng = flatPrice?.bld?.pos?.lng
//     const infraUrl = `${socialUrl}${lat}&lng=${lng}`
//     const encodingInfraUrl = encodeURI(infraUrl)

//     const getAskStructure = await axios({
//       headers: {
//         'X-Api-Key': apiKey,
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
//         'Referer': 'https://xn--h1alcedd.xn--d1aqf.xn--p1ai/',
//       },
//       method: 'GET',
//       timeout: 1000 * 10,
//       url: encodingInfraUrl
//     })
//     const socialStructure = getAskStructure.data
//     console.log('SOCIAL', socialStructure)
//     return {
//       props: {reestrData, objectId, rights, flatPrice, socialStructure}
//     }
//   }

//   return {
//     props: {reestrData, objectId, rights}
//   }
// }


export async function getServerSideProps(context) {
  const cadastr = context.params.cadnumber
  await client.connect()
  const db = client.db('cadastr')
  const collection = db.collection('searchingObjects')
  const res = await collection.find({ $or : [{'objectData.objectCn': cadastr}, {'objectData.id':cadastr}]}).toArray()
  const cadastrObj = res[0]
  // console.log('CADASRTOBJECT', cadastrObj)
  return {
    props: {cadastralObject: JSON.stringify(cadastrObj) || null}, // will be passed to the page component as props
  }
}

