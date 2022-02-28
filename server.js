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

/* Set template engine */
app.set("view engine", "ejs");

/* Middleware */
app.use(express.static("src"));

/* Get profile as homepage */
app.get('/', (req, res) => {
  res.render("profile", {
    pageTitle: `profile`,
  })
})

/* If no routes give response, show 404 Page */
app.use((req, res, next) => {
  res.status(404).send(`404 This page could not be found`)
})

/* If something breaks in the code, show this message */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(`Something broke!`)
})

/* Shows the app is listening, and also returns the port with it */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})