const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');



//Used for session cookies
const passport = require('passport');
const session = require('express-session');
const passportLocal = require('./config/passport-local');
const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

app.use(express.urlencoded());      //decodes data inputs
app.use(cookieParser());            //uses for cookies

app.set(express.static('./assets'))
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');      //setting view engine
app.set('views' , './views');

app.use(session({
    name : 'Social',
    secret : 'something',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge : (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup OK')
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);


app.use('/',require('./routes'))            //Sending to router files

// Sass Configuration 
app.use(sassMiddleware({
    /* Options */
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

//Server is UP
app.listen(port,function(err){
    if(err){
        console.log(`Error in Server: ${err}`)
    }
    console.log(`Server running on PORT : ${port}`)
})