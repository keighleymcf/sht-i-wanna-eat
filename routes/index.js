const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const Tag = require("../models/Tag");

const axios = require("axios");
const yelpApi = axios.create({
  baseURL: "https://api.yelp.com/v3/businesses/",
  headers: {
    Authorization: `Bearer ${process.env.YELP_API_KEY}`
  }
});

const yelp = require("yelp-fusion");

const apiKey = process.env.YELP_API_KEY;

let lat = 52.520008;
let lng = 13.404954;

const client = yelp.client(apiKey);

router.get("/search", (req, res, next) => {
  client
    .search({ term: req.query.q, latitude: lat, longitude: lng, limit: 10 })
    .then(response => {
      const results = response.jsonBody.businesses;
      res.render("search", { results });
    })
    .catch(err => {
      console.log("Error while retrieving data: ", err);
    });
});

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.user;
  res.render("index", { user });
});

//access map
router.get("/map", (req, res, next) => {
  res.render("map");
});

//show user's list of saved restaurants
router.get("/list", (req, res, next) => {
  const user = req.user;
  Restaurant.find().then(restaurants => {
    res.render("list", { user: user, restaurantList: restaurants });
  });
});

//show user's map of saved restaurants !!!!!INCOMPLETE!!!!!!
router.get("/my-map", (req, res, next) => {
  const user = req.user;

  res.render("my-map", { user });
});

//add new restaurant to list
router.get("/add-result/:id", (req, res, next) => {
  const id = req.params.id;
  yelpApi
    .get(id)
    .then(response => {
      Restaurant.create({
        yelpId: response.data.id,
        name: response.data.name,
        display_address: response.data.display_address,
        categories: response.data.categories,
        price: response.data.price,
        owner: req.user._id
      });
      console.log("restaurant successfully added");
      res.redirect("/list");
    })
    .catch(err => {
      console.log("Error while adding restaurant to DB");
      next(err);
    });
});

//delete restaurant from list

//add tag to restaurant

module.exports = router;
