const express = require("express");
const app = express();
require('dotenv').config()
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;
app.use(express.json())

const usersRoute = require('./routes/usersRoute')
const flightsRoute = require('./routes/flightsRoute')

app.use('/api/users', usersRoute)
app.use('/api/flights', flightsRoute)
app.listen(port, () =>console.log('node server started') );