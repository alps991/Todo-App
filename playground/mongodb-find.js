const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to server');
    }

    console.log('Connected to mongodb server');

    // db.collection('Todos').find({ completed: false }).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to get todos')
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(count);
    // }, (err) => {
    //     console.log('unable to get todos')
    // });

    client.close();
});