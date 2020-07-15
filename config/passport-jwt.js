const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'codeial';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    
    User.findById(jwt_payload._id, function(err,user){
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            console.error('***Error in JWT payload');
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;