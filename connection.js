//requiring package for interacting with MongoDB
const mongoose = require("mongoose"); 


async function connectMongoDB(url) {
    return mongoose.connect(url);
}

module.exports = { connectMongoDB };