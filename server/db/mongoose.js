require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development';
let mongo_uri;

if (env === 'development') {
    mongo_uri = process.env.MONGODB_URI_DEV;
} else if (env === 'test') {
    mongo_uri = process.env.MONGODB_URI_TEST;
} else {
    mongo_uri = process.env.MONGODB_URI;
}


mongoose.connect(mongo_uri, { useNewUrlParser: true });

module.exports = { mongoose };