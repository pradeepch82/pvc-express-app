var createError = require('http-errors');
var express = require('express');
var path = require('path');

var expressFileUpload = require('express-fileupload');
var expressSession=require("express-session");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs= require('fs');
var customers   = JSON.parse(fs.readFileSync('data/customers.json', 'utf-8'));
var states      = JSON.parse(fs.readFileSync('data/states.json', 'utf-8'));

const graphqlHTTP = require('express-graphql').graphqlHTTP;
const graphql = require('graphql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bankingArrayRouter = require('./routes/bankingarray');
var bankingMySQLRouter = require('./routes/bankingmysql');
var bankingMongoDBRouter = require('./routes/bankingmongodb');
var uploadRouter = require('./routes/upload');
var shoppingRouter = require('./routes/shopping');





var loginRouter = require('./routes/login');

var calculateRouter = require('./routes/calculate');
var cookieRouter = require('./routes/cookiedemo');



/*
For GraphQL to work, you need to define what will be queried by a client with 
the help of a schema. For starters, you’ll make the API return Hello world! 
whenever a user requests it.
*/
const QueryRoot = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Hello All"
    }
   })
});

/* GraphQL API needs to know what value(s) to return. */

const schema = new graphql.GraphQLSchema({ query: QueryRoot });


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(expressSession({
  resave:true,
  saveUninitialized:true,
  secret:"Hello"
})); //enabel session handling 
app.use(logger('dev'));
app.use(express.json());//parse the json data
app.use(express.urlencoded({ extended: false })); //parse the form data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressFileUpload());//enable file uplading

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bankingarray', bankingArrayRouter);
app.use('/bankingmysql', bankingMySQLRouter);
app.use('/bankingmongodb', bankingMongoDBRouter);


app.use('/login', loginRouter);
app.use('/calculate',calculateRouter);
app.use('/cookiedemo',cookieRouter);
app.use('/upload',uploadRouter);
app.use('/shopping',shoppingRouter);


app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));



app.get('/api/customers', (req, res) => {
  res.json(customers);
});

app.get('/api/states', (req, res) => {
  res.json(states);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
