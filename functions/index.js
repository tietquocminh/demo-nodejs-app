const functions = require('firebase-functions');
const express = require('express');

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

app.get('/', (request, response) => {
    response.send(`Timestamp: ${Date.now()}`);
});

app.get('/credentials', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);

    response.json(credentials);
});

exports.app = functions.https.onRequest(app);
