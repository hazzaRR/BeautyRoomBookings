const express = require('express');
const path = require('path');
const fs = require('fs');


const router = express.Router();

router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','calendar.html'));
});


module.exports = router;