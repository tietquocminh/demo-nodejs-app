const functions = require('firebase-functions');
const express = require('express');
const credentials = require('./env');
const mongoClient = require('mongodb').MongoClient;

const JSONAPISerializer = require('json-api-serializer');

const app = express();

let dbConnect = false;

app.get('/', (request, response) => {
    response.send(`Timestamp: ${Date.now()}`);
});

app.get('/employees', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);

    let serializer = new JSONAPISerializer();
    serializer.register('employees', {
        id: '_id',
        links: {
            self: function(data) {
                return '/employees/' + data._id;
            }
        }
    });

    mongoClient.connect(`mongodb+srv://${credentials.mongoDBCredential.userId}:${credentials.mongoDBCredential.password}@cluster0-gsl2m.mongodb.net/`, function (err, db) {
        if (err) {
            throw err;
        } else {
            dbConnect = true;
            console.log("successfully connected to the database");
            let client = db.db('test');
            client.collection('employees').find({}).toArray((err, result) => {
                if (err) {
                    response.send('error!');
                } else {
                    response.send(serializer.serialize('employees', result));
                }
            });
        }
        db.close();
    });
});

app.get('/test', (request, response) => {
    let serializer = new JSONAPISerializer();
    serializer.register('lesson', {
        id: 'id'
    });

    let result = serializer.serialize('lesson', {
        id: 1,
        firstName: 'Minh',
        lastName: 'Tiet',
        title: 'Captain'
    });

    response.send(result);
});

exports.app = functions.https.onRequest(app);
