const express = require('express');
const path = require('path');
const fs = require('fs');

const pool = require('../db');


const router = express.Router();

router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','calendar.html'));
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

router.get("/gethi", async(req,res) => {
    res.json("Hi");
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

router.delete("/appointment", async(req, res) => {
    try {

        const { date } = req.query.date;
        const { startTime } = req.query.startDate;


        const deleteAppointment = await pool.query("DELETE FROM appointment WHERE AppDate = $1 AND StartTime = $2", [date, startTime]);

        res.json("Appointment sucessfully deleted");

    } catch (err) {
        console.error(err.message);
        res.json("Appointment does not exist");
        
    }
});
    


module.exports = router;