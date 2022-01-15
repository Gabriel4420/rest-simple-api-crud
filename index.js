//config initial
const mongoose = require('mongoose')
const express = require('express')
const personRoutes = require('./routes/personRoutes')

require('dotenv/config')

const app = express()

//Forma de ler JSON // middlewares

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())
app.use('/person', personRoutes)

// rotas da api

//rota inicial / endpoint

app.get('/test', (req, res) => {
  return res.json({ message: 'OI Express' })
})

// entregar uma porta
mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => {
    console.log('Conectamos ao banco')
    app.listen(3000)
  })
  .catch((error) => console.log(error))
