const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email,password,done){
        User.findOne({email: email},
            function(err, user){
                if(err){
                    console.log('Error in finding user ==> Passport');
                    return done(err);
                }

                if(!user || user.password != password){
                    console.log('Invalid id Username/Password');
                    return done(null,false);
                }
                return done(null,user);
            });
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);
    });
});

//check user is Authentication
passport.checkAuthentication = function(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signIn');
}

passport.setAuthentication = function(req,res,next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from 
        // the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;