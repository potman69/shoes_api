const express = require('express');
const Shoes = require('./models/models');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Models = require('./models/models');
const mongoose = require('mongoose');
const app = express();
// const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/shoes');

var router = express.Router();

mongoose.connect(process.env.MONGO_DB_URL ||'mongodb://localhost/shoes');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept"');
  next();
})

app.get('/', function(req, res){res.redirect('/api')})


app.get('/api', function(req, res){
  res.send({name: "Anton Potgieter"})
})


// initialize routes
app.use('/api',require('./routes/api'));

// error handeling
app.use(function(err, req, res, next){
  // console.log(err);
  res.send({error: err.message})
})

const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log('Web app started on port : ' + port );
});
