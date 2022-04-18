const express = require("express");
const { continueSession } = require("pg/lib/sasl");
const app = express();
const pool = require('./db');


app.use(express.json()); // => req.body


//Create new admin

app.post("/admin", async(req, res) => {
try {
    const { username } = req.body;
    const { password } = req.body;

    const newAdmin = await pool.query("INSERT INTO admins (username, AdminPassword) VALUES ($1, $2)", [username, password]);

    res.json("Admin successfully created");
} catch (err) {
    console.error(err.message);
    res.json("username already exists");
}
});

//Create new client

app.post("/client", async(req, res) => {

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
//Create new treatment

app.post("/treatment", async(req, res) => {
    try {


        const { name } = req.body;
        const { type }= req.body;
        const { price } = req.body;

        console.log(price);

        const newTreatment = await pool.query("INSERT INTO treatment (TreatmentName, TreatmentType, Price) VALUES ($1, $2, $3)", [name, type, price]);
        
        res.json("Treatment successfully created");

    } catch (err) {
       console.error(err.message);
       res.json("Error making new Treatment");
    }
});

//Create new booking

app.post("/booking", async(req, res) => {
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

//Get all clients

app.get("/client", async(req, res) => {

    try {

        const clients = await pool.query("SELECT * FROM clients");

        res.json(clients.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve clients");
    }
});

//Get specific client

app.get("/client/:id", async(req, res) => {

    try {

        const { id } = req.params;
    
        const getClient = await pool.query("SELECT * FROM clients WHERE id = $1", [id]);

        res.json(getClient.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve client");
    }
});

//Get all bookings

app.get("/booking", async(req, res) => {

    try {

        const bookings = await pool.query("SELECT * FROM bookings");

        res.json(bookings.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve bookings");
    }
});

//Get specific day of bookings

app.get("/booking/:date", async(req, res) => {

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

app.get("/booking/range", async(req, res) => {

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


//Get all bookings

app.get("/treatment", async(req, res) => {

    try {

        const treatments = await pool.query("SELECT * FROM treatment");

        res.json(treatments.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve treatments");
    }
});

//delete admin

app.delete("/admin/:id", async(req, res) => {
    try {

        const { id } = req.params;

        const deleteAdmin = await pool.query("DELETE FROM admins WHERE id = $1", [id]);

        res.json("Admin sucessfully deleted");

    } catch (err) {
        console.error(err.message);
        res.json("Admin does not exist");
        
    }
});


//delete client

app.delete("/client/:id", async(req, res) => {
    try {

        const { id } = req.params;

        const deleteClient = await pool.query("DELETE FROM clients WHERE id = $1", [id]);

        res.json("Client sucessfully deleted");

    } catch (err) {
        console.error(err.message);
        res.json("Client does not exist");
        
    }
});

//delete treatment

app.delete("/treatment/:id", async(req, res) => {
    try {

        const { id } = req.params;

        const deleteTreatment = await pool.query("DELETE FROM Treatment WHERE id = $1", [id]);

        res.json("Treatment sucessfully deleted");

    } catch (err) {
        console.error(err.message);
        res.json("Treatment does not exist");
        
    }
});


//delete booking

app.delete("/booking", async(req, res) => {
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





app.listen(3000, () => {
    console.log("server is listening on port 3000...");
});