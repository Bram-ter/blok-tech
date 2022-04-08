const express = require("express")
const ejs = require("ejs");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const slug = require('slug'); 
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb")
const res = require('express/lib/response');

const app = express()

const port = process.env.PORT || 3000;

/* constante */
let db = null;

/* Set template engine */
app.set("view engine", "ejs");

/* Middleware (These middlewares are functions that process incoming requests before they reach the target controller https://www.educative.io/edpresso/what-is-express-body-parser) */
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
app.get("/map", async (req, res) => {
  const people = await db.collection('profiles').find({}).toArray();
  res.render('map', {people})
})


/* Get search results of map page */
app.get("/searchresults", async (req, res) => {
  const userLocations = await db.collection('location').find({}).toArray();
  res.render('searchresults', {userLocations})
})

/* Insert location into the database and print a list of users */
app.post("/searchresults", async (req, res) => {

  let addLocation = {
    name: req.body.name,
    lon: req.body.lon,
    lat: req.body.lat
  };

  console.log(addLocation);

  await db.collection('location').insertOne(addLocation, async (error, item) => {
    const userLocations = await db.collection('location').find({}).toArray();
    res.render('searchresults', {userLocations})
  })
})

/* get empty profile */
app.get("/profile", (req, res) => { 
  res.render("emptyprofile", {
    pageTitle: "profile",
  })
})

/* Post form with filled in info to the server */
app.post("/profile", async (req, res) => {

  let addPerson = {
    slug: slug(req.body.name),
    name: req.body.name,
    selecthobby: req.body.selecthobby,
    region: req.body.region,
    age: req.body.age,
    lon: req.body.lon,
    lat: req.body.lat
  };

  console.log(addPerson);
  
  /* await and insert info of addPerson to the database */
  await db.collection('profiles').insertOne(addPerson, (err, item) => {

    /* Redirect to profile with the id of the user that just filled in the form */
    res.redirect(`/profile/${item.insertedId}`)
  })
})

/* Get profile with profile id given from the ObjectId and render the profile after */
app.get("/profile/:id", async (req, res) => {
  /* const query = {} */

  const id = req.params.id
  
  /* Look in the database for the ObjectId of the user and render to his profile page */
  const names = await db.collection('profiles').findOne({ _id: ObjectId(id) }, (err, item) => {

    const title  = err ? "No profile was found" : "Profiles";

    res.render('profile', {title, item, names});
  });
})

/* Get form */
app.get("/userform", (req, res) => {
  res.render("userform", {
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

/* Connect to the database */
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