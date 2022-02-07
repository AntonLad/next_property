import axios from "axios"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const egrpUrl = process.env.EGRP_URL

export default async function tooltips(req, res) {
  const objectId = req.query.objectid
    const getAskRights = await axios({
    method: 'GET',
    timeout: 1000 * 10,
    url: `${egrpUrl}${objectId}`
  })
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.log('ERROR', e)
      res.json({ error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' })
    })
  console.log('RIGHTS', getAskRights)
  res.json(getAskRights)
}
