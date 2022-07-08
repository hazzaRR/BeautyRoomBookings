require('dotenv').config();

const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','admin.html'));
});

//Create new admin

router.post("/admin", async (req, res) => {
    try {
        const { username } = req.body;
        const { password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newAdmin = await pool.query("INSERT INTO admins (username, password) VALUES ($1, $2)", [username, hashedPassword]);
    
        res.json("Admin successfully created");
    } catch (err) {
        console.error(err.message);
        res.status(500).json("username already exists");
    }
});

router.post("/", async (req, res) => {
    try {
        const { username } = req.body;
        const { password } = req.body;

        //finds user details in the database
        let admin = await pool.query("SELECT id, username, password FROM admins WHERE username = $1", [username]);
        admin = admin.rows[0];

        //if the doesnt find a username that matches a 400 status is sent back to the client.
        if (admin == null) {
            return res.status(400).send("Username doesn't exist");
        }

        //if the password provided matches the hashed password in the database the user is given access to the system.
        if (await bcrypt.compare(password, admin.password)) {
            const accessToken = jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'});
            res.status(200).json(
                {
                "accessToken" : accessToken
                }
                );
        } else {
            res.status(403).send();
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send();
    }
});
    
//delete admin
    
router.delete("/admin/:id", async(req, res) => {
    try {
    
        const { id } = req.params;
    
        const deleteAdmin = await pool.query("DELETE FROM admins WHERE id = $1", [id]);
    
        res.json("Admin sucessfully deleted");
    
    } catch (err) {
        console.error(err.message);
        res.json("Admin does not exist");
            
    }
});

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.slit(' ')[1];

//     if (token == null) {
//         return res.sendStatus(401);
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return res.sendStatus(403);
//         }
//         req.user = user;
//         next();
//     })

// };


module.exports = router;