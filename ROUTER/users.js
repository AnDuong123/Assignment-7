const express = require('express');
const route = express.Router();

let users = [
    { id: 1, username: 'admin', name: 'Obama' },
    { id: 2, username: 'user1', name: 'Trum' },
    { id: 3, username: 'user2', name: 'J97' }
]

route.post('/users', function (req, res) {
    const { username, name } = req.body;
    if (!name || !username) {
        return res.status(400).json({ message: 'Username and Name are required.' });
    }
    const newUser = { id: users.length + 1, username, name };
    users.push(newUser);

    return res.status(200).json(newUser);
});

route.get('/users', function(req, res) {
    return res.status(200).json(users);
});

route.get('/users/:id', function (req, res) {
    const userId = req.params.id;
    const foundUser = users.find(u => u.id == userId);

    if (!foundUser) {
        return res.status(404).json({ message: 'User ' + userId + ' not found' });
    }

    return res.status(200).json(foundUser);
});

route.put('/users/:id', function (req, res) {
    const userId = req.params.id;
    const updateUser = users.find(u => u.id == userId);
    if (!updateUser) {
        return res.status(404).json({ message: 'User ' + userId + ' not found' });
    }
    
    const { username, name } = req.body;
    
    if (username) {
        updateUser.username = username;
    }
    if (name) {
        updateUser.name = name;
    }

    return res.status(200).json(updateUser);
});

route.delete('/users/:id', function (req, res) {
    const userId = req.params.id;
    const deleteUserIndex = users.findIndex(u => u.id == userId);
    if (!deleteUser) {
        return res.status(404).json({ message: 'User ' + userId + ' not found' });
    }

    users.splice(deleteUserIndex, 1);

    return res.status(201).json({ message: 'Delete user successfully' });
});

module.exports = route;