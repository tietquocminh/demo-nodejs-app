const functions = require('firebase-functions');
const express = require('express');
const mongoClient = require('mongodb').MongoClient;

const app = express();

const credentials = {
    data: [
    {
        id: 1,
        type: 'credentials',
        attributes: {
            label: 'Apple ID',
            userId: '@gmail.com',
            password: '****'
        }
    },
    {
        id: 2,
        type: 'credentials',
        attributes: {
            label: 'MongoDB',
            userId: '@gmail.com',
            password: '****'
        }
    },
    {
        id: 3,
        type: 'credentials',
        attributes: {
            label: 'github',
            userId: '@gmail.com',
            password: '****'
        }
    },
    {
        id: 4,
        type: 'credentials',
        attributes: {
            label: 'GMail',
            userId: '@gmail.com',
            password: '****'
        }
    },
    {
        id: 5,
        type: 'credentials',
        attributes: {
            label: 'GMail',
            userId: '@gmail.com',
            password: '****'
        }
    },
    {
        id: 6,
        type: 'credentials',
        attributes: {
            label: 'Facebook',
            userId: '@gmail.com',
            password: '****'
        }
    },
]};

const credentialsTest = [
    {
        label: 'Facebook',
        userId: '@gmail.com',
        password: '****'
    },
    {
        label: 'GMail',
        userId: '@gmail.com',
        password: '****'
    }
];

let dbConnect = false;

app.get('/', (request, response) => {
    response.send(`Timestamp: ${Date.now()}`);
});

app.get('/credentials', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);

    mongoClient.connect('mongodb+srv://tietquocminh:****@cluster0-gsl2m.mongodb.net/', function (err, db) {
        if (err) {
            throw err;
        } else {
            dbConnect = true;
            console.log("successfully connected to the database");
            let client = db.db('test');
            client.collection('my_coll').find({}).toArray((err, result) => {
                if (err) {
                    response.send('error!');
                } else {
                    response.json(result);
                }
            });
        }
        db.close();
    });
    // response.json(credentialsTest);
});

exports.app = functions.https.onRequest(app);
