const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to server');
    }

    console.log('Connected to mongodb server');

    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5bb18c481f7233754ad21cad')
    }, {
            $set: {
                completed: false
            }
        }, {
            returnOriginal: false
        }).then((res) => {
            console.log(res);
        });

    client.close();
});