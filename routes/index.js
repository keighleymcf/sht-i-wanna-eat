const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.user;
  res.render("index", { user });
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
  res.render("list", { user });
});

router.get("/my-map", (req, res, next) => {
  const user = req.user;
  res.render("my-map", { user });
});

module.exports = router;
