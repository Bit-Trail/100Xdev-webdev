const jwt = require('jsonwebtoken');
const pool = require('../db/dbconfig');

// SIGNUP CONTROLLER
function signup(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const createdAt = new Date();

    pool.query(
        'INSERT INTO "user".users (username, password, created_at) VALUES ($1, $2, $3)',
        [username, password, createdAt],
        (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error signing up user');
            }

            res.status(201).send('User signed up successfully');
        }
    );
}

// LOGIN CONTROLLER
function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    pool.query(
        'SELECT id, username, password FROM "user".users WHERE username = $1',
        [username],
        (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Database error');
            }

            if (result.rows.length === 0) {
                return res.status(401).send('Invalid credentials');
            }

            const user = result.rows[0];

            // Plain-text password check (TEMP)
            if (user.password !== password) {
                return res.status(401).send('Invalid credentials');
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Login successful',
                token
            });
        }
    );
}

module.exports = {
    login,
    signup
};