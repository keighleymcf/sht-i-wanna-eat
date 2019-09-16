const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
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

router.get("/map", (req, res, next) => {
  res.render("map");
});





module.exports = router;