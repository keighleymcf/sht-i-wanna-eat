const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

const axios = require("axios");
const yelpApi = axios.create({
  baseURL: "https://api.yelp.com/v3/businesses/",
  headers: {
    Authorization: `Bearer ${process.env.YELP_API_KEY}`
  }
});

const yelp = require("yelp-fusion");

const apiKey = process.env.YELP_API_KEY;
const client = yelp.client(apiKey);

const googleMapApi = require("../public/javascripts/map");

router.get("/search", (req, res, next) => {
  client
    .search({
      term: req.query.q,
      latitude: req.query.lat,
      longitude: req.query.lng,
      limit: 10
    })
    .then(response => {
      const results = response.jsonBody.businesses;
      res.render("search", {
        results
      });
    })
    .catch(err => {
      console.log("Error while retrieving data: ", err);
    });
});

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.user;
  res.render("index", {
    user
  });
});

//access map
router.get("/map", (req, res, next) => {
  res.render("map");
});

//access search page to add new stuff
router.get("/add", (req, res, next) => {
  res.render("add");
});

//show user's list of saved restaurants
router.get("/list", (req, res, next) => {
  const user = req.user;
  Restaurant.find({
    owner: user._id
  }).then(restaurants => {
    res.render("list", {
      user: user,
      restaurantList: restaurants
    });
    console.log(user);
  });
});

//show user's map of saved restaurants !!!!!INCOMPLETE!!!!!!
router.get("/my-map", (req, res, next) => {
  const user = req.user;
  Restaurant.find({
    owner: user._id
  }).then(restaurants => {
    res.render("my-map", {
      user: user,
      restaurantList: restaurants
    });
  });
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
        display_address: response.data.location.display_address,
        latitude: response.data.coordinates.latitude,
        longitude: response.data.coordinates.longitude,
        categories: response.data.categories,
        price: response.data.price,
        owner: req.user._id,
        tried: false
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
router.post("/delete-result/:objectId", (req, res, next) => {
  const objectId = req.params.objectId;
  Restaurant.findByIdAndDelete(objectId)
    .then(() => {
      console.log("restaurant successfully deleted");
      res.redirect("/list");
    })
    .catch(err => {
      console.log("Error while adding restaurant to DB");
      next(err);
    });
});

//edit tried/new tag of restaurant
router.post("/update_tried/:objectId", (req, res, next) => {
  const objectId = req.params.objectId;
  Restaurant.findByIdAndUpdate(objectId, {
    tried: true
  })
    .then(() => {
      console.log("restaurant marked as tried");
      res.redirect("/list");
    })
    .catch(err => {
      console.log("Error while updating restaurant");
      next(err);
    });
});

// indiv rest view
router.get("/restaurant/:objectId", (req, res, next) => {
  const user = req.user;
  const objectId = req.params.objectId;
  Restaurant.findById(objectId).then(restaurant => {
    console.log(restaurant.name);
    res.render("restaurant", { user, restaurant });
  });
});

router.get("/onlyNew", (req, res) => {
  const user = req.user;
  Restaurant.find({
    owner: user._id,
    tried: false
  })
    .then(restaurants => {
      res.render("list", {
        user: user,
        restaurantList: restaurants
      });
    })
    .catch(err => {
      console.log("Error while updating restaurant", err);
      next(err);
    });
});

router.get("/already", (req, res) => {
  const user = req.user;
  Restaurant.find({
    owner: user._id,
    tried: true
  })
    .then(restaurants => {
      res.render("list", {
        user: user,
        restaurantList: restaurants
      });
    })
    .catch(err => {
      console.log("Error while updating restaurant", err);
      next(err);
    });
});

module.exports = router;
