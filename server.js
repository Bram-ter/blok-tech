const express = require("express")
const ejs = require("ejs");
const dotenv = require("dotenv").config();
const app = express()
const port = 3600;

const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb")
let db = 0;

console.log(process.env.TESTVAR);

/* Set template engine */
app.set("view engine", "ejs");

/* Middleware */
app.use(express.static(__dirname + "/public"));

/* Get started as homepage */
app.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Getting started",
  })
})

/* Get map */
app.get("/map", (req, res) => {
  res.render("map", {
    pageTitle: "map",
  })
})

/* Get profile */
app.get("/profile", (req, res) => {
  res.render("profile", {
    pageTitle: "profile",
  })
})

/* If no routes give response, show 404 Page */
app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "404",
  })
})

/* If something breaks in the code, show this message */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

/* Shows the app is listening, and also returns the port with it */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connectDB().then( () => console.log( "We have a connection to mongo" ));
})

/*****************************************************
* Connect to database
****************************************************/

async function connectDB() {

  const uri = process.env.DB_URI;
  const client = new MongoClient(uri, {
  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
  });
  
  try {
  await client.connect();
  db = client.db(process.env.DB_NAME);
  
  } catch (error) {
  throw error;
  
  }
  }