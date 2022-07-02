const express = require("express");
const app = express();
const pool = require('./db');
const path = require('path');
const {engine} = require('express-handlebars');

app.engine('handlebars', engine({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.use(express.json()); // => req.body

app.use(express.static(path.join(__dirname, 'public')));
app.use("/fullcalendar_modules", express.static(path.join(__dirname , "node_modules", "fullcalendar")));


app.get('/', (req, res) => {
    res.render('index', {
        script: '/index.js'
    });
});

const adminRouter = require('./routes/adminRouter');
const appointmentRouter = require('./routes/appointmentRouter');
const clientRouter = require('./routes/clientRouter');
const treatmentRouter = require('./routes/treatmentRouter');
const statementRouter = require('./routes/statementRouter');

app.use('/admin', adminRouter);
app.use('/appointment', appointmentRouter);
app.use('/client', clientRouter);
app.use('/treatment', treatmentRouter);
app.use('/statement', statementRouter);



app.listen(3000, () => {
    console.log("server is listening on port 3000...");
});