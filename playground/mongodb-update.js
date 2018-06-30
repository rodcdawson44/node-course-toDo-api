//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to Mongo DB server');
const db= client.db('TodoApp');

db.collection('Todos').findOneAndUpdate({
  _id: new ObjectID('5b3539630787b8b9cdf06cd1')
}, {
  $set: {
    completed:true
    }
  },{
    returnOriginal:false
  }).then((result) => {
    console.log(result);
  })
//  client.close();
} );
