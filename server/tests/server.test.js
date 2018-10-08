const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/todo');
const { ObjectID } = require('mongodb');

const testTodos = [{
    _id: new ObjectID,
    text: 'test1'
}, {
    _id: new ObjectID,
    text: 'test2'
}];

beforeEach(done => {
    Todo.deleteMany({}).then(() => {
        Todo.insertMany(testTodos);
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'this is a todo';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect(res => expect(res.body.text).toBe(text))
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text }).then(todos => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(err => done(err));
            });
    });

    it('should not create todo with invalid data', done => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then(todos => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(err => done(err))
            });
    });

});

describe('GET Todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => expect(res.body.doc.length).toBe(2))
            .end(done);
    });
});

describe('GET todos/:id', () => {
    it('should get todo by id', (done) => {
        request(app)
            .get('/todos/' + testTodos[0]._id)
            .expect(200)
            .expect(res => expect(res.body.todo.text).toBe(testTodos[0].text))
            .end(done);
    });

    it('should return 404 if id is not found', (done) => {
        request(app)
            .get('/todos/' + new ObjectID().toHexString())
            .expect(404)
            .end(done);
    });
    it('should return 404 if id is invalid', (done) => {
        request(app)
            .get('/todos/' + 'asdf23')
            .expect(404)
            .end(done);
    });
});

describe('DELETE todos/:id', () => {
    it('should delete todo by id', (done) => {
        request(app)
            .delete('/todos/' + testTodos[0]._id)
            .expect(200)
            .expect(res => expect(res.body.todo._id).toBe(testTodos[0]._id.toHexString()))
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(testTodos[0]._id).then(todo => {
                    expect(todo).toBeNull();
                    done();
                }).catch(err => done(err));
            });
    });

    it('should return 404 if id is not found', (done) => {
        request(app)
            .get('/todos/' + new ObjectID().toHexString())
            .expect(404)
            .end(done);
    });
    it('should return 404 if id is invalid', (done) => {
        request(app)
            .get('/todos/' + 'asdf23')
            .expect(404)
            .end(done);
    });
});