const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username })
      .then(foundUser => {
        if (!foundUser) {
          done(null, false, {
            message: "No user exists with this email address"
          });
          return;
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
          done(null, false, { message: "Incorrect password" });
          return;
        }

        done(null, foundUser);
      })
      .catch(err => done(err));
  })
);
