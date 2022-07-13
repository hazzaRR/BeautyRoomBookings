const express = require('express');
const path = require('path');

const pool = require('../db');


const router = express.Router();

router.use(express.json()); // => req.body

// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname,'..','public','treatment.html'));
// });

router.get('/', async (req, res) => {

    try {
        let treatmentTypes = await pool.query("SELECT DISTINCT TreatmentType FROM treatment ORDER BY treatmenttype ASC");
        let treatment = await pool.query("SELECT id, treatmentname, TreatmentType, price FROM treatment ORDER BY treatmenttype ASC");


        let treatments = [];


        for (let i = 0; i < treatmentTypes.rows.length; i++) {
            console.log(treatmentTypes.rows[i].treatmenttype)
            let data = {
                treatmenttype: treatmentTypes.rows[i].treatmenttype,
                treatment: []
            }
            for (let j = 0; j < treatment.rows.length; j++) {
                if(treatmentTypes.rows[i].treatmenttype === treatment.rows[j].treatmenttype) {
                    data.treatment.push(treatment.rows[j]);
                }
            }

            treatments.push(data);
        }

        // console.log(treatments);

        // res.json(treatments);


        // console.log(treatmentTypes.rows);
        // console.log(treatment.rows);

        res.render('treatment', {
            script: '/viewTreatment.js',
            treatments: treatments
        });

    } catch (err) {
        console.error(err.message);
        res.render("Couldnt retrieve treatments");
    }

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