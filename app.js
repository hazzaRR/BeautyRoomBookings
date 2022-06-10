const express = require("express");
const { continueSession } = require("pg/lib/sasl");
const app = express();
const pool = require('./db');
const path = require('path');


app.use(express.json()); // => req.body

app.use(express.static(path.join(__dirname, 'public')));
app.use("/fullcalendar_modules", express.static(path.join(__dirname , "node_modules", "fullcalendar")));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/createBooking', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'newAppointment.html'));
});

const adminRouter = require('./routes/adminRouter');
const bookingRouter = require('./routes/bookingRouter');
const clientRouter = require('./routes/clientRouter');
const treatmentRouter = require('./routes/treatmentRouter');

app.use('/admin', adminRouter);
app.use('/booking', bookingRouter);
app.use('/client', clientRouter);
app.use('/treatment', treatmentRouter);


app.listen(3000, () => {
    console.log("server is listening on port 3000...");
});