import axios from "axios"

export default async function tooltips(req, res) {
  console.log('ПРИХОД', req.query)
  const text = req.query.text
  console.log('TEXT', text)
  const url = `https://lk.rosreestr.ru/account-back/address/search?term=${text}/`
  console.log('URL', url)
  const encodingUrl = encodeURI(url)
  const getAskByReestrByAdress = await axios(encodingUrl)
  .then(({ data }) => {
    console.log('DATA', data)
    return data
  })
  .catch((e) => console.log('ERROR', e.status))
  res.json(getAskByReestrByAdress)

}
