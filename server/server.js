const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');

const app = express();

const MONGO_URI = 'mongodb://graphql:graphql2019@ds251518.mlab.com:51518/graphql';

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('connected'))
    .on('error', error => console.log('error', error));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'xtcvhbjknlm',
    store: new MongoStore({
        url: MONGO_URI,
        autoReconnect: true
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

module.exports = app;


module.exports = app;