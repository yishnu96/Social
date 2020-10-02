const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID:     "1037759794694-1n2shghoj4j7cbfbfo5044177r32n5te.apps.googleusercontent.com",
    clientSecret: "Re9rjvS7hxutzC0wX02khDLQ",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      User.findOne({email : profile.emails[0].value}).exec(function(error , user){
            if(error){
                console.error("Google authintication Error : ", error);
            }

            console.log(profile);

            if(user){
                return done(null,user);
            }else{
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.error("Error in creating user : " , err);
                    }
                    return done(null,user);
                })
            }
      })
    
    
    //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

module.exports = passport;