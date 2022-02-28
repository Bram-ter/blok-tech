const express = require('express')
const app = express()
const port = 3600

const info = {
  name: "Olaf",
  age: "22",
  hobbies: ["Gaming", "Reading", "Mind games"],
  favorite: "Chess"
}

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("src"));

app.get('/', (req, res) => {
  res.send(`Hallo een persoon die dit leest!` )
})

app.use((err, req, res, next) => {
  res.status(404).send('404 not found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/profile', (req, res) => {
  res.send('Howdy!')
})