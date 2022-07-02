const express = require('express');
const path = require('path');
const fs = require('fs');

const pool = require('../db');


const router = express.Router();

router.use(express.json()); // => req.body


router.get('/', async (req, res) => {

    res.render('statement', {
        script: '/statement.js'
    });

});

router.get('/getStatements', async (req, res) => {

    try {

        const { month } = req.query

        const appointments = await pool.query("SELECT clients.clientName, appointment.appdate, appointment.totalprice FROM appointment INNER JOIN clients on clients.id = appointment.clientid where CAST(appointment.appdate AS VARCHAR) LIKE $1", [month+'%']);

        res.json(appointments.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve appointments for statement");
    }
});



module.exports = router;