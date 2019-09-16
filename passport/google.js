const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // find a user with profile.id as googleId or create one
      User.findOne({ googleId: profile.id })
        .then(found => {
          if (found !== null) {
            // user with that googleId already exists
            done(null, found);
          } else {
            // no user with that googleId
            return User.create({ googleId: profile.id }).then(dbUser => {
              done(null, dbUser);
            });
          }
        })
        .catch(err => {
          done(err);
        });
    }
  )
);
