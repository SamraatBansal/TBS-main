const express = require('express');
const app = express();
const env = require('./config/environment.js');
const logger = require('morgan');
const port = process.env.PORT || 8000;
// const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
// const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const passport = require('passport');
// const passportLocal = require('./config/passport_local_strategy')
// const passportGoogle = require('./config/passport_google_auth2_strategy');
const MongoStore = require('connect-mongo')(session);
const db = require('./config/mongoose.js');
require('dotenv').config();  //For env in  heroku
app.use(express.urlencoded({extended: false})); 
// app.use(bodyParser.urlencoded({extended: false}));   
// app.use(sassMiddleware({
//     src:'./assets/scss',
//     dest:'./assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix:'/css'
// }));
// app.use(cookieParser());
//Using the middleware parser 
app.use(express.static(env.asset_path)); //To access the css and js files used in views placed in assets
// app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(logger(env.morgan.mode, env.morgan.options));
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// app.use(session({
//     name: 'Hiring Block',
//     // TODO change the secret before deployment in production mode
//     secret: 'blahsomething',
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: (1000 * 60 * 100)
//     },
//     store: new MongoStore(
//         {
//             mongooseConnection: db,
//             autoRemove: 'disabled'
        
//         },
//         function(err){
//             console.log(err ||  'connect-mongodb setup ok');
//         }
//     )
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passport.setAuthenticatedUser);

// app.use(flash());
// app.use(customMware.setFlash);

app.set('view engine', 'ejs');  //Setting the view template engine to ejss
app.set('views', './views');

app.use('/', require('./routes')); 


app.listen(port, function(err){
    if(err)
    {
        console.log(`Error encountered: ${err}`);
    }
    console.log(`Server is up and running at port: ${port}`);
});