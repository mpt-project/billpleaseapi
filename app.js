const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')
const mongo = require('./config/mongo')
const routes = require('./routes');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// set environment
process.env.NODE_ENV = config.env || 'dev';

const app = express()
const db = mongo(config.mongo[process.env.NODE_ENV])
/**
 * Configuration
 */
app.set('port', process.env.port || 3000);

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// users session
app.use(session({
    secret: 'billpleaseapiandsomethingverylong',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: db
    })
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/**
 * Set routes for API
 */
routes(app);

app.listen(app.get('port'), () => {
	console.info(`[i] server app is listening on port ${app.get('port')}`)
});
