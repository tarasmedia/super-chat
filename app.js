require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const commonRouter = require('./routes/commonRouter');
const textRouter = require('./routes/textRouter');

const app = express();
app.set('view engine', 'hbs');
hbs.registerPartials('views');

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/text', textRouter);
app.use('/', commonRouter);

const port = process.env.PORT;
app.listen(port);
