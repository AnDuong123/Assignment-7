const express = require('express');
const userRoutes = require('./ROUTER/users');
const authRoutes = require('./ROUTER/authentication');
const dataRoutes = require('./ROUTER/getdata');
const middlewares = require('./middleware')();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', middlewares.authenticateToken, userRoutes);
app.use('/auth', authRoutes);
app.use('/api/data', middlewares.authenticateToken, dataRoutes);
app.listen(PORT, function() {
    console.log('Listening to port ' + PORT);
});