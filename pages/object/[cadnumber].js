import { MongoClient } from 'mongodb'
import InfoAppart from '../../Components/info-building'
import Meta from '../../Components/meta'
import { useRouter } from 'next/router'
import regions from '../../Components/files/regions'

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


export async function getServerSideProps(context) {
  const cadastr = context.params.cadnumber
  await client.connect()
  const db = client.db('cadastr')
  const collection = db.collection('searchingObjects')
  const res = await collection.find({ $or : [{'objectData.objectCn': cadastr}, {'objectData.id':cadastr}]}).toArray()
  const cadastrObj = res[0]
  const searchAdress = res?.[0].objectData?.objectAddress?.addressNotes || res[0].objectData?.objectAddress?.mergedAddress
  const searchFlat = res[0].dadata?.flat_type
  if (searchFlat !== null && searchAdress) {
    const regionFiasCode = res[0].dadata?.region_fias_id
    const houseFiasCode = res[0].dadata?.house_fias_id
    const needRegionsForBase = regions[regionFiasCode]
    const regionBase = client.db('dataHousePassports')
    const regionCollection = regionBase.collection(`${needRegionsForBase}`)
    const findBuildingFromBase = await regionCollection.find({houseguid: houseFiasCode}).toArray()
    console.log('НАШЕЛ ДОМ В БАЗЕ', findBuildingFromBase[0])
  }
 return {
    props: {cadastralObject: JSON.stringify(cadastrObj) || null}, // will be passed to the page component as props
  }
}

