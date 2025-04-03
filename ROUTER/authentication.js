const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let users = [
    { username: 'admin', password: '$2a$12$4uCFfZcx2aUxVXJ3THID2uoU0qM/OhI3E7VHkDqSzTd7guKqzS2Uu', role: 'admin' },
    { username: 'user1', password: '$2a$12$6isIU5BO1GjzCjxPhkrhMeOykd3J3noVbBvMbq8fuzgs5/vHXtMve', role: 'user' }
]
const route = express.Router();
const JWT_SECRET = 'mySecret';

route.post('/login', function (req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'username and password are required.' });
    }

    const userLogin = users.find(u => u.username == username);

    if (!userLogin) {
        return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const isValid = bcrypt.compareSync(password, userLogin.password);
    if (!isValid) {
        return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const token = jwt.sign(
        { username: userLogin.username, role: userLogin.role },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
});

module.exports = route;