const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

//layouts and database
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie and authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const passportJWT = require('./config/passport-jwt');
const passportGoogle = require('./config/passport-googlr-oth');
const MongoStore = require('connect-mongo')(session);

// looks goods : SCSS flash etc
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//Chat service
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);

const env = require('./config/environment');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//make upload available
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'social',

    // TODO change the secret before deployment in production mode
    secret: env.session_secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
            mongooseConnection: db,
            autoRemove: 'disabled'

        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: http://localhost:${port}`);
});