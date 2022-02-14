const express = require('express')
const camelCase = require('camelCase')
const getName = require('./name')
const app = express()
const port = 3600

app.get('/', (req, res) => {
  res.send(`Hallo ${getName} die dit leest!` )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})