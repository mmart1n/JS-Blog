const express = require('express');
const config = require('./config/config.js');
const app = express();
const hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
hbs.registerHelper('ifeq', function (a, b, options) {
    if (a == b) { return options.fn(this); }
    return options.inverse(this);
});


require('./config/express')(app, config);
require('./config/passport')();
require('./config/routes')(app);





module.exports = app;
