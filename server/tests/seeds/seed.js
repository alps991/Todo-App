const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const testUsers = [{
    _id: userOneId,
    email: 'alps99@hotmail.com',
    password: 'thisisapass',
    tokens: [{
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'secret').toString(),
        access: 'auth'
    }]
}, {
    _id: userTwoId,
    email: 'lolz@hotmail.com',
    password: 'password2',
    tokens: [{
        token: jwt.sign({ _id: userTwoId, access: 'auth' }, 'secret').toString(),
        access: 'auth'
    }]
}];

const testTodos = [{
    _id: new ObjectID,
    text: 'test1',
    _creator: userOneId
}, {
    _id: new ObjectID,
    text: 'test2',
    _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(testTodos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.deleteMany({}).then(() => {
        const user1 = new User(testUsers[0]).save();
        const user2 = new User(testUsers[1]).save();

        return Promise.all([user1, user2]);
    }).then(() => done());
};

module.exports = {
    testTodos,
    testUsers,
    populateTodos,
    populateUsers
};