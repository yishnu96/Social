const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require("./environment")

passport.use(
  new GoogleStrategy(
    {
      clientID: env.google_clint_id,
      clientSecret: env.google_clint_secret,
      callbackURL: env.google_callback,
      passReqToCallback: true,
    },
    
    function (accessToken, refreshToken, profile, done) {
      // find a user
      User.findOne({
        email: profile.emails[0].value,
      }).exec(function (err, user) {
        if (err) {
          console.log("error in google strategy-passport", err);
          return;
        }
        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user) {
          // if found, set this user as req.user
          return done(null, user);
        } else {
          // if not found, create the user and set it as req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "error in creating user google strategy-passport",
                  err
                );
                return;
              }

              return done(null, user);
            }
          );
        }
      });
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  )
);

module.exports = passport;
