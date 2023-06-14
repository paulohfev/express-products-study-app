const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

require('dotenv').config();

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.d0lnwlc.mongodb.net/?retryWrites=true&w=majority`
  )
    .then(result => {
      console.log('Connected');
      callback(result)
    })
    .catch(err => {
      console.log(err)
    });
}

module.exports = mongoConnect;
