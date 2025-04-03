const express = require('express');

const pgPool = require('../localDB');
const dalData = require('../DAL/crud')(pgPool);

const route = express.Router();

route.get('/', function (req, res) {
    // get data from DAL layer and localDB
    dalData.getData(req.query, req.query.limit, req.query.offset, function (error, data) {
        if (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }

        res.json(data);
        return;
    });
});

module.exports = route;