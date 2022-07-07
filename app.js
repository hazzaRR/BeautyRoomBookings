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
    res.render('login', {
        script: '/login.js'
    });
});

app.get('/home', (req, res) => {
    res.render('index', {
        script: '/index.js'
    });
});

const adminRouter = require('./routes/adminRouter');
const appointmentRouter = require('./routes/appointmentRouter');
const clientRouter = require('./routes/clientRouter');
const treatmentRouter = require('./routes/treatmentRouter');
const statementRouter = require('./routes/statementRouter');
const loginRouter = require('./routes/loginRouter');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.slit(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })

};

app.use('/admin',adminRouter);
app.use('/appointment',appointmentRouter);
app.use('/client', clientRouter);
app.use('/treatment',treatmentRouter);
app.use('/statement',statementRouter);
app.use('/login', loginRouter);



app.listen(3000, () => {
    console.log("server is listening on port 3000...");
});