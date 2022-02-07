import axios from "axios"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const toolTipsUrl = process.env.TOOLTIPS_URL

export default async function tooltips(req, res) {
  const text = req.query.text
  const url = `${toolTipsUrl}${text}`
  const encodingUrl = encodeURI(url)
  const getAskByReestrByAdress = await axios(encodingUrl)
  .then(({ data }) => {
    return data
  })
  .catch((e) => console.log('ERROR', e.status))
  res.json(getAskByReestrByAdress)
}
