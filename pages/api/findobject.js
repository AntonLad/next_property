import axios from "axios"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const cadastrUrl = process.env.CADASTR_URL

export default async function tooltips(req, res) {
  const adress = req.query.cadNumber
  console.log('ADRESS', adress)
  const regexp = /\d+:\d+:\d+:\d+/g
  const checker = regexp.test(adress)
  const cadNum = adress.trim()

  if (!checker) {
    return res.json({ error: 'Не корректные условия поиска. Введите кадастровый номер или адрес объекта' })
  }
  const getAskReestrByCudNum = await axios({
    method: 'GET',
    timeout: 1000 * 10,
    url: `${cadastrUrl}${cadNum}`,
  })
    .then(({ data }) => {
      if (data.errorCode) {
        return { error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' }
      }
      return data
    })
    .catch((e) => {
      console.log('ERROR', e)
      res.json({ error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' })
    })
  console.log('REESTR', getAskReestrByCudNum)
  return res.json(getAskReestrByCudNum)

}