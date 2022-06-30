const express = require('express');
const path = require('path');
const fs = require('fs');

const pool = require('../db');


const router = express.Router();

router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','treatment.html'));
});

router.post("/treatment", async(req, res) => {
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

router.get("/getTreatments", async(req, res) => {

    try {

        const treatments = await pool.query("SELECT * FROM treatment");

        res.json(treatments.rows);
        
    } catch (err) {
        console.error(err.message);
        res.json("Couldnt retrieve treatments");
    }
});

//delete treatment

router.delete("/treatment/:id", async(req, res) => {
    try {

        const { id } = req.params;

        const deleteTreatment = await pool.query("DELETE FROM Treatment WHERE id = $1", [id]);

        res.json("Treatment sucessfully deleted");

    } catch (err) {
        console.error(err.message);
        res.json("Treatment does not exist");
        
    }
});


module.exports = router;