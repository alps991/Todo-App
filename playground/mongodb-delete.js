const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to server');
    }

    console.log('Connected to mongodb server');

    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndDelete({
        _id: new ObjectID('5bb18bb01f7233754ad21c97')
    }).then((res) => {
        console.log(res);
    })

    client.close();
});