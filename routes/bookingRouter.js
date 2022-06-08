const express = require('express');
const path = require('path');
const fs = require('fs');


const router = express.Router();

router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','calendar.html'));
});

//Create new booking

router.post("/booking", async(req, res) => {
    try {
        const { date } = req.body;
        const { startTime} = req.body;
        const { endTime } = req.body;
        const { clientId } = req.body;
        const { treatmentId } = req.body;
    
        const newBooking = await pool.query("INSERT INTO bookings (Date, StartTime, EndTime, ClientID, treatmentID) VALUES ($1, $2, $3)", [date, startTime, endTime, clientId, treatmentId]);
    
        console.log("Booking successfully made");
    
    } catch (error) {
        console.error(err.message);
        res.json("Error making new Booking");
    }
    });

    //Get all bookings

router.get("/booking", async(req, res) => {

    try {

        const bookings = await pool.query("SELECT * FROM bookings");

        res.json(bookings.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve bookings");
    }
});

//Get specific day of bookings

router.get("/booking/:date", async(req, res) => {

    try {

        const { date } = req.params;

        const bookings = await pool.query("SELECT * FROM bookings WHERE Date = $1", [date]);

        res.json(bookings.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve bookings");
    }
});

//Get specific range of bookings

router.get("/booking/range", async(req, res) => {

    try {

        const { startDate } = req.query;
        const { endDate } = req.query;

        //const bookings = await pool.query("SELECT * FROM bookings WHERE Date >= $1 AND Date <= $2", [startDate, endDate]);
        const bookings = await pool.query(`SELECT bookings.BookingDate, bookings.StartTime, bookings.EndTime, clients.ClientName, clients.Email, clients.Telephone, treatment.TreatmentName, treatment.Price 
        FROM bookings 
        INNER JOIN clients ON bookings.id = clients.id
        INNER JOIN treatment ON bookings.id = treatment.id
        ORDER BY booking.BookingDate ASC;
        WHERE Date >= $1 AND Date <= $2`, [startDate, endDate]);

        res.json(bookings.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve bookings");
    }
});

//delete booking

router.delete("/booking", async(req, res) => {
    try {

        const { date } = req.query.date;
        const { startTime } = req.query.startDate;


        const deleteBooking = await pool.query("DELETE FROM admins WHERE BookingDate = $1 AND StartTime = $2", [date, startTime]);

        res.json("Booking sucessfully deleted");

    } catch (err) {
        console.error(err.message);
        res.json("Booking does not exist");
        
    }
});
    


module.exports = router;