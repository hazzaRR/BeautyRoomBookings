const express = require('express');
const path = require('path');
const fs = require('fs');

const pool = require('../db');


const router = express.Router();

router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','calendar.html'));
});

router.get('/viewAppointment', async (req, res) => {

    try {

        const { id } = req.query;

        let appointmentDetails = await pool.query("SELECT appointment.id, clients.clientname, appointment.appdate, appointment.starttime, appointment.endtime, appointment.totalprice FROM appointment LEFT JOIN clients on appointment.clientid = clients.id WHERE appointment.id = $1", [id]);
        let treatmentDetails = await pool.query("SELECT treatment.id, treatment.treatmentname, treatment.price FROM treatment INNER JOIN appointmenttreatments on treatment.id = appointmenttreatments.treatmentid WHERE appointmenttreatments.appointmentid = $1", [id]);

        console.log(treatmentDetails.rows);
    
        appointmentDetails = appointmentDetails.rows[0];

        console.log(appointmentDetails);

        res.render('viewAppointment', {
            script: '/viewAppointment.js',
            appointmentID : appointmentDetails.id,
            client_name: appointmentDetails.clientname,
            date: appointmentDetails.appdate.toLocaleDateString(),
            start_time: appointmentDetails.starttime.substring(0,5),
            end_time: appointmentDetails.endtime.substring(0,5),
            total_cost: appointmentDetails.totalprice,
            treatments: treatmentDetails.rows
        });

    } catch (err) {
        console.error(err.message);
        res.render("Couldnt retrieve appointments");
    }

});

router.get('/createAppointment', (req, res) => {
    res.render('newAppointment', {
        script: '/appointment.js'
    });
});


//Create new booking

router.post("/createAppointment", async(req, res) => {
    try {
        const { date } = req.body;
        const { startTime} = req.body;
        const { endTime } = req.body;
        const { clientId } = req.body;
        const { treatments } = req.body;

        // for (let i = 0; i < treatments.length; i++) {
        //     console.log(treatments[i])
        // }
    
        const newApp = await pool.query("INSERT INTO appointment (AppDate, StartTime, EndTime, ClientID) VALUES ($1, $2, $3, $4) RETURNING ID", [date, startTime, endTime, clientId]);

        console.log(newApp.rows[0].id);

        for (let i = 0; i < treatments.length; i++) {
            const newAppTreatments =  await pool.query("INSERT INTO appointmenttreatments (treatmentid, appointmentid) VALUES ($1, $2) RETURNING *", [treatments[i], newApp.rows[0].id]);
        }
    
        res.json("Appointment successfully made");
    
    } catch (error) {
        console.error(err.message);
        res.json("Error making new Appointment");
    }
    });

    //Get all bookings

router.get("/getAllAppointments", async(req, res) => {

    try {

        const appointments = await pool.query("SELECT * FROM appointment");

        res.json(appointments.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve appointments");
    }
});

router.get("/getAppointments", async(req,res) => {

    try {
        const appointments = await pool.query("SELECT clients.ClientName as title, appointment.AppDate, appointment.StartTime, appointment.EndTime, appointment.id as id FROM clients INNER JOIN appointment ON clients.ID = appointment.clientID");

        res.json(appointments.rows);
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve appointments");
    }


});


//Get specific day of bookings

router.get("/appointment/:date", async(req, res) => {

    try {

        const { date } = req.params;

        const appointments = await pool.query("SELECT * FROM appointment WHERE Date = $1", [date]);

        res.json(appointments.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve appointments");
    }
});

//Get specific range of bookings

router.get("/appointment/range", async(req, res) => {

    try {

        const { startDate } = req.query;
        const { endDate } = req.query;

        //const bookings = await pool.query("SELECT * FROM bookings WHERE Date >= $1 AND Date <= $2", [startDate, endDate]);
        const appointments = await pool.query(`SELECT bookings.BookingDate, bookings.StartTime, bookings.EndTime, clients.ClientName, clients.Email, clients.Telephone, treatment.TreatmentName, treatment.Price 
        FROM bookings 
        INNER JOIN clients ON bookings.id = clients.id
        INNER JOIN treatment ON bookings.id = treatment.id
        ORDER BY booking.BookingDate ASC;
        WHERE Date >= $1 AND Date <= $2`, [startDate, endDate]);

        res.json(appointments.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve appointments");
    }
});

//delete booking

router.delete("/delete", async(req, res) => {
    try {

        const { id } = req.query;

        const deleteAppointment = await pool.query("DELETE FROM appointment WHERE id = $1", [id]);

        res.json("Appointment sucessfully deleted");

    } catch (err) {
        console.error(err.message);
        res.json("Appointment does not exist");
        
    }
});

router.delete("/deleteAppTreatment", async(req, res) => {
    try {

        const { appid } = req.query;
        const { treatmentid } = req.query;

        const deleteAppointment = await pool.query("DELETE FROM appointmenttreatments WHERE appointmentid = $1 AND treatmentid = $2", [appid, treatmentid]);

        res.json("Treatment for this appointment has been sucessfully deleted");

    } catch (err) {
        console.error(err.message);
        res.json("Treatment for this appointment does not exist");
        
    }
});
    


module.exports = router;