import axios from "axios"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const toolTipsUrl = process.env.TOOLTIPS_URL

export default async function tooltips(req, res) {
  const text = req.query.text
  console.log('TEXT', text)
  const url = `${toolTipsUrl}${text}`
  const encodingUrl = encodeURI(url)
  const getAskByReestrByAdress = await axios({
    headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
      timeout: 1000 * 10,
      url: encodingUrl
    })
  .then(({ data }) => {
    return data
  })
  .catch((e) => console.log('ERROR_TOOLTIPS', e.status))
  return res.json(getAskByReestrByAdress)
}
