const express = require('express')
const camelCase = require('camelCase')
const app = express()
const port = 3600

app.get('/', (req, res) => {
  res.send(`Hallo een persoon die dit leest!` )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/howdy', function (req, res) {
  res.send('Howdy!')
})