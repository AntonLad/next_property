import { useRouter } from 'next/router'
import InfoAppart from '../../Components/info-building'

// const objectIdUrl = process.env.OBJECT_ID_URL
// const egrpUrl = process.env.EGRP_URL
// const apiKey = process.env.API_KEY
// const cadastrUrl = process.env.CADASTR_URL
// const priceUrl = process.env.PRICE_URL
// const socialUrl = process.env.SOCIAL_URL

export default function Object({ cadastralObject }) {
console.log('DATAPROPS', JSON.parse(cadastralObject))
// const db = useIndexedDB('people');
// console.log('DATABASE', db)
const router = useRouter()
const cadNumber = router.query.cadnumber
// console.log('CADNMB', cadNumber)
// localStorage.setItem(`${cadNumber}`, JSON.stringify(objectInfo))

  return (
    <div>
      <InfoAppart props={JSON.parse(cadastralObject)}/>
      {cadNumber}
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
  // console.log('CONTEXT', context)
  const cookieName = context.params.cadnumber
  const cadastr = cookieName.replace(/[^0-9]/g, '')
   return {
    props: {cadastralObject: context.req.cookies[cadastr] || null}, // will be passed to the page component as props
  }
}

