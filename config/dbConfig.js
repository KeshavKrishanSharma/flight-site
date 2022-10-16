const mongoose = require('mongoose');

mongoose.connect(process.env.mongoose_url)

const db = mongoose.connection;

db.on('connected', () => {
    console.log('mongo db connection successfully')
})

db.on('error', () => {
    console.log('mongo db connection failed')
})