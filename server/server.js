var mongoose = require('mongoose');

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/ToDoApp');

var Todo =mongoose.model('Todo', {
  text:{
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt:{
    type: Number
  }
});

var newTodo = new Todo({
  text:'cook dinner',
});

var otherTodo = new Todo({
  text:'play tennis',
  completed:true ,
  completedAt: 1010
})

newTodo.save().then((doc) => {
  console.log('Saved todo',doc);
}, (e) => {
  console.log('Unable to save toDo');
})

otherTodo.save().then((doc)=> {
  console.log('saved todo',doc);
}, (e) => {
  console.log('unable to save toDo');
})
