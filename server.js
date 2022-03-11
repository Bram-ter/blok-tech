const express = require("express")
const ejs = require("ejs");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const slug = require('slug'); 
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb")
const res = require('express/lib/response');

const app = express()
const port = 3600;

/* constante */
let db = null;

/* Set template engine */
app.set("view engine", "ejs");

/* Middleware */
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Get started as homepage */
app.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Getting started",
  })
})

/* Get map */
app.get("/map", (req, res) => {
  res.render("map", {
    pageTitle: "Hobby map",
  })
})

/* Get profile */
app.get("/profile", async (req, res) => {
  // RENDER PAGE
  /* const query = {} */
  const names = await db.collection('hobbies').find({}).toArray();
  const title  = (names.length == 0) ? "No hobbies were found" : "Hobbies";
  res.render('profile', {title, names});
})

/* Post form with filled in info to the server */
app.post("/profile", async (req, res) => {

  let addPerson = {
    slug: slug(req.body.name),
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    selecthobby: req.body.selecthobby,
  };
  
  await db.collection('hobbies').insertOne(addPerson)

  console.log(addPerson);

  res.redirect('/profile')
})

/* Get form */
app.get("/credentials", (req, res) => {
  res.render("credentials", {
    pageTitle: "Fill in information",
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

/* Shows the app is listening on the specified port, and returns if there is a connection to mongo */
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