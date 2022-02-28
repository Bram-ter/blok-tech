const express = require('express')
const ejs = require('ejs');
const app = express()
const port = 3600

const info = {
  name: "Olaf",
  age: "22",
  hobbies: ["Gaming", "Reading", "Mind games"],
  favorite: "Chess"
}

app.set("view engine", "ejs");

app.use(express.static("src"));

app.get('/', (req, res) => {
  res.render("profile", {
    pageTitle: `profile`,
  })
})

app.use((req, res, next) => {
  res.status(404).send(`404 This page could not be found`)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(`Something broke!`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})