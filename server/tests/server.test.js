const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');
const { User } = require('../models/user');
const { testTodos, testUsers, populateTodos, populateUsers } = require('./seeds/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

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

describe('GET users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', testUsers[0].tokens[0].token)
            .expect(200)
            .expect(res => {
                expect(res.body._id).toBe(testUsers[0]._id.toHexString());
                expect(res.body.email).toBe(testUsers[0].email);
            })
            .end(done);
    });

    it('should send 401 error if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect(res => expect(res.body).toEqual({}))
            .end(done);
    });
});

describe('POST users', () => {
    it('should create a new user', (done) => {
        request(app)
            .post('/users')
            .send({ email: 'example@example.com', password: 'password2' })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body.email).toBe('example@example.com');
                expect(res.body._id).toBeTruthy();
            })
            .end(err => {
                if (err) {
                    return done(err);
                }
                User.findOne({ email: 'example@example.com' }).then((user) => {
                    expect(user).toBeTruthy();
                    done();
                }).catch(err => done(err));
            });
    });

    it('should not create a new user if input is invalid', (done) => {
        request(app)
            .post('/users')
            .send({ email: 'alps99@hotmail.com' })
            .expect(400)
            .end(done);
    });

    it('should not create a new user if email is taken', (done) => {
        request(app)
            .post('/users')
            .send({ email: 'alps99@hotmail.com', password: 'password2' })
            .expect(400)
            .end(done);

    });
});