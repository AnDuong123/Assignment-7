const express = require('express');
const userRoutes = require('./ROUTER/user');
const authRoutes = require('./ROUTER/auth');
const dataRoutes = require('./ROUTER/data');
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