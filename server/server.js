import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import favicon from 'serve-favicon'
import axios from 'axios'

import config from './config'
import mongooseService from './services/mongoose'

const { resolve } = require('path')

const server = express()
const httpServer = http.createServer(server)

const PORT = config.port
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const apiKey = process.env.API_KEY
const toolTipsUrl = process.env.TOOLTIPS_URL
const cadastrUrl = process.env.CADASTR_URL
const objectIdUrl = process.env.OBJECT_ID_URL
const egrpUrl = process.env.EGRP_URL
const priceUrl = process.env.PRICE_URL
const socialUrl = process.env.SOCIAL_URL

const middleware = [
  cors(),
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, '../dist')),
  favicon(`${__dirname}/public/favicon.ico`)
]

middleware.forEach((it) => server.use(it))

server.get('/', (req, res) => {
  res.send('Express Server')
})

// MongoDB
if (config.mongoEnabled) {
  // eslint-disable-next-line
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongooseService.connect()
}

// SocketsIO
// if (config.socketsEnabled) {
//   // eslint-disable-next-line
//   console.log('Sockets Enabled: ', config.socketsEnabled)
//   const socketIO = io(httpServer, {
//     path: '/ws'
//   })

//   socketIO.on('connection', (socket) => {
//     console.log(`${socket.id} login`)

//     socket.on('disconnect', () => {
//       console.log(`${socket.id} logout`)
//     })
//   })
// }

//  запрос к подсказкам

server.get('/api/v1/search/:adress', async (req, res) => {
  const { adress } = req.params
  const url = `${toolTipsUrl}${adress}/`
  const encodingUrl = encodeURI(url)
  const getAskByReestrByAdress = await axios(encodingUrl)
    .then(({ data }) => {
      return data
    })
    .catch((e) => console.log('ERROR', e.status))
  res.json(getAskByReestrByAdress)
})

// Запрсо к реестру по адресу или кадастровому номеру

server.get('/api/v1/findObject/:adress', async (req, res) => {
  const { adress } = req.params
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
})

server.get('/api/v1/findId/:adress', async (req, res) => {
  const { adress } = req.params
  const getAskId = await axios({
    method: 'GET',
    timeout: 1000 * 10,
    url: `${objectIdUrl}${adress}`
  })
    .then(({ data }) => {
      if (data.length !== 0) {
        return data[0].objectId
      }
      return data.length
    })
    .catch((e) => {
      console.log('ERROR', e)
      res.json({ error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' })
    })
  console.log('ID', getAskId)
  return res.json({ getAskId })
})

server.get('/api/v1/findRights/:objectId', async (req, res) => {
  const { objectId } = req.params
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
})

server.get('/api/v1/findFlat/:flat', async (req, res) => {
  const { flat } = req.params
  console.log('flatAddress', req.params)
  const url = `${priceUrl}${flat}`
  const encodingUrl = encodeURI(url)
  const getAskPrice = await axios({
    headers: {
      'X-Api-Key': apiKey,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
      'Referer': 'https://xn--h1alcedd.xn--d1aqf.xn--p1ai/',
    },
    method: 'GET',
    timeout: 1000 * 10,
    url: encodingUrl
  })
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.log('ERROR', e)
      res.json({ error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' })
    })

  const lat = getAskPrice?.bld?.pos?.lat
  const lng = getAskPrice?.bld?.pos?.lng
  const infraUrl = `${socialUrl}${lat}&lng=${lng}`
  const encodingInfraUrl = encodeURI(infraUrl)

  const getAskStructure = await axios({
    headers: {
      'X-Api-Key': apiKey,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
      'Referer': 'https://xn--h1alcedd.xn--d1aqf.xn--p1ai/',
    },
    method: 'GET',
    timeout: 1000 * 10,
    url: encodingInfraUrl
  })
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.log('ERROR', e)
      res.json({ error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' })
    })

  res.json({ ...getAskPrice, getAskStructure })
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

httpServer.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Serving at http://localhost:${PORT}`)
})
