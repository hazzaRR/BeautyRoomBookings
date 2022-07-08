const express = require('express');
const path = require('path');

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

        const { start } = req.query
        const { end } = req.query

        //const appointments = await pool.query("SELECT clients.clientName, appointment.appdate, appointment.totalprice FROM appointment INNER JOIN clients on clients.id = appointment.clientid where CAST(appointment.appdate AS VARCHAR) LIKE $1", [month+'%']);

        const appointments = await pool.query(`
        SELECT appointment.id, clients.clientName, treatment.treatmentname, appointment.appdate, treatment.price, appointment.totalprice 
        FROM appointment 
        INNER JOIN clients on clients.id = appointment.clientid
        INNER JOIN appointmenttreatments on appointment.id = appointmenttreatments.appointmentid
        INNER JOIN treatment on treatment.id = appointmenttreatments.treatmentid 
        where CAST(appointment.appdate AS VARCHAR) >= $1
        AND CAST(appointment.appdate AS VARCHAR) <= $2
        ORDER BY appdate ASC, appointmentid ASC`, [start, end])

        res.json(appointments.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve appointments for statement");
    }
});



module.exports = router;