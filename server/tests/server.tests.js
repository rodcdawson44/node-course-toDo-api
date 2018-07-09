const expect = require('expect');
const request= require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

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

beforeEach((done) =>{
  Todo.remove({}).then(()=> {
  return Todo.insertMany(todos);
}).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err,res) => {
        if(err){
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) =>{
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res) =>{
        if(err){
          return done(err);
        }

      Todo.find().then((todos) =>{
        expect(todos.length).toBe(3);
        done();
      }).catch((e) => done(e));
  });
});
});

describe('Get/todos', ()=>{
  it('should get all todos', (done) => {
    request(app)
     .get('/todos')
     .expect(200)
     .expect((res) => {
       expect(res.body.todos.length).toBe(3);
     })
     .end(done);
  });
});

describe('GET/todos/:id', () =>{
  it('should return todo doc', (done) =>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        console.log(res.body)
        expect(res.body.text).toBe(todos[0].text);
      })
      .end(done);
  });


  it('should return 404 if todo not found', (done) =>{
      var ident = new ObjectID();
    request(app)
      .get(`/todos/${ident.toHexString()}`)
      .expect(404)
      .expect((res) => {
        console.log(`The status is ${res.status}` )
        expect(res.status).toBe(404)
      })
   .end(done);
  });

  it('should return 404 if id not valid', (done) =>{
    request(app)
      .get('/todos/123')
      .expect(404)
      .expect((res) => {
        console.log(`The status is ${res.status}`)
        expect(res.status).toBe(404)
      })
      .end(done);
  });
});
