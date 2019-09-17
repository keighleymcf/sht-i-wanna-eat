const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const yelp = require("yelp-fusion");

const apiKey = process.env.YELP_API_KEY;
let lat = 52.520008;
let lng = 13.404954;

// const searchRequest = {
//   term: "Four Barrel Coffee",
//   location: "san francisco, ca"
// };

// const client = yelp.client(apiKey);



// router.get("/search", (req, res, next) => {
//   client
//     .search({
//       term: req.query.q,
//       latitude: lat,
//       longitude: lng
//     })
//     .then(response => {
//       const firstResult = response.jsonBody.businesses[0];
//       const prettyJson = JSON.stringify(firstResult, null, 4);
//       // console.log(prettyJson);

//     })
//     .catch(err => {
//       console.log("Error while retrieving data: ", err);
//     });
// });




// const showtoMap = (prettyJson) => {
//   if (prettyJson)
//     var pos = {
//       lat: position.latitude = prettyJson.coordinates.latitude,
//       lng: position.longitude = prettyJson.coordinates.longitude
//     };
//   console.log(pos);
// }








// const axios = require("axios");
// const yelpApi = axios.create({
//   baseURL: "https://api.yelp.com/v3/businesses",
//   // TODO: put the key in an env var later
//   headers: {
//     Authorization: `Bearer ${process.env.YELP_API_KEY}`
//   }
// });

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.user;
  res.render("index", {
    user
  });
});

// //login check
// const loginCheck = () => {
//   return (req, res, next) => {
//     if (req.isAuthenticated()) {
//       next()
//     } else {
//       res.redirect("/login")
//     }
//   }
// }
// router.use(loginCheck())

//access map
router.get("/map", (req, res, next) => {
  res.render("map");
});

router.get("/list", (req, res, next) => {
  const user = req.user;
  res.render("list", {
    user
  });
});

router.post("/list", (req, res, next) => {
  const restaurant = new Restaurant({
    googleId: document.querySelector("#place-id").innerText,
    name: document.querySelector("#place-name").innerText,
    address: document.querySelector("#place-address").innerText
  });
  console.log(restaurant);
  res.redirect("/list");
});

router.get("/my-map", (req, res, next) => {
  const user = req.user;
  res.render("my-map", {
    user
  });
});

module.exports = router;