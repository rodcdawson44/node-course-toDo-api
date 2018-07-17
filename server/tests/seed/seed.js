const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

var {Todo} = require('./../../models/todo');
var {User} = require('./../../models/user');
const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users =[{
  _id: userOneID,
  email: 'rcdawson@gmail.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token:jwt.sign({_id: userOneID, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoID,
  email:'ChosenOne@gmail.com',
  password: 'userTwoPass',
  tokens: [{
      access: 'auth',
      token:jwt.sign({_id: userTwoID, access: 'auth'}, 'abc123').toString()
    }]
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First todo'
},{
  _id: new ObjectID(),
  text:'second todo'
},{
  id: new ObjectID(),
   text: 'third todo'
}];

const populateTodos = (done) =>{
  Todo.remove({}).then(() => {
  return Todo.insertMany(todos);
}).then(() => done());
};

module.exports = {todos, populateTodos};
