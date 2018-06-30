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
// delete many
db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
  console.log(result);
});
//delete one
db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
  console.log(result);
});

//delete one and have what you deleted returned
db.collection('Todos').findOneAndDeleteOne({text: 'eat lunch'}).then((result) => {
  console.log(result);
});
//  client.close();
} );
