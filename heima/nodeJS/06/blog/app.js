const express = require('express'); // framework
const path = require('path');
const bodyParser = require('body-parser'); // middleware deal with json
const session = require('express-session'); // encrypt password
const router = require('./router'); // router

// entry
const app = express();

// static resource
app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use(
  '/node_modules/',
  express.static(path.join(__dirname, './node_modules/'))
);

// template set renderer
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/'));

// deal with post request(json)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// session set
app.use(
  session({
    secret: 'zp',
    resave: false,
    saveUninitialized: false
  })
);

// mount router
app.use(router);

app.listen(5000, function() {
  console.log('The Server is running');
});
