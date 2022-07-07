const express = require('express');
const path = require('path');

const pool = require('../db');


const router = express.Router();

router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','displayClient.html'));
});

router.get('/newClient', (req, res) => {
    res.render('newClient', {
        script: '/client.js'
    });
});

//Create new client

router.post("/client", async(req, res) => {

    try {

        const { name } = req.body;
        const { email } = req.body;
        const { telephone } = req.body;

        const newClient = await pool.query("INSERT INTO clients (clientName, Email, Telephone) VALUES ($1, $2, $3)", [name, email, telephone]);

        res.json("Client successfully created");
        
    } catch (err) {
        console.error(err.message);
        res.json("Error making new Client");

    }
});

//Get all clients

router.get("/getClients", async(req, res) => {

    try {

        const clients = await pool.query("SELECT * FROM clients");

        res.json(clients.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve clients");
    }
});

//Get specific client

router.get("/client/:id", async(req, res) => {

    try {

        const { id } = req.params;
    
        const getClient = await pool.query("SELECT * FROM clients WHERE id = $1", [id]);

        res.json(getClient.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve client");
    }
});


router.delete("/client/:id", async(req, res) => {
    try {

        const { id } = req.params;

        const deleteClient = await pool.query("DELETE FROM clients WHERE id = $1", [id]);

        res.json("Client sucessfully deleted");

    } catch (err) {
        console.error(err.message);
        res.json("Client does not exist");
        
    }
});


module.exports = router;