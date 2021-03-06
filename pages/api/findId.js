import axios from "axios"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const objectIdUrl = process.env.OBJECT_ID_URL

export default async function tooltips(req, res) {
  const adress = req.query.cadNumber
  const encodeUri =  `${objectIdUrl}${adress}`
  const getAskId = await axios({
    method: 'GET',
    timeout: 1000 * 10,
    url: encodeURI(encodeUri) 
  })
    .then(({ data }) => {
      if (data.length !== 0) {
        return data[0].objectId
      }
      return data.length
    })
    .catch((e) => {
      console.log('ERROR_FIND_ID', e)
      return res.json({ error: 'ERROR' })
    })
  return res.json({ getAskId })
}
