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

        res.render('treatment', {
            script: '/viewTreatment.js',
            treatments: treatments
        });

    } catch (err) {
        console.error(err.message);
        res.render("Couldnt retrieve treatments");
    }

});

router.get('/viewTreatment', async (req, res) => {

    try {

        const { id } = req.query;

        let treatmentDetails = await pool.query("SELECT id, treatmentname, treatmenttype, price FROM treatment WHERE id = $1", [id]);

        console.log(treatmentDetails.rows);
    
        treatmentDetails = treatmentDetails.rows[0];

        res.render('individualTreatment', {
            script: '/viewIndividualTreatment.js',
            treatmentID : treatmentDetails.id,
            name: treatmentDetails.treatmentname,
            type: treatmentDetails.treatmenttype,
            price: treatmentDetails.price
        });

    } catch (err) {
        console.error(err.message);
        res.render("Couldnt retrieve treatment");
    }

});


router.post("/", async(req, res) => {
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

router.put("/updatedTreatment", async(req, res) => {
    try {

        const { id } = req.body;
        const { name } = req.body;
        const { type } = req.body;
        const { price } = req.body;

        const treatment = await pool.query("UPDATE treatment SET treatmentname = $1, treatmenttype = $2, price = $3 WHERE id = $4", [name, type, price, id]);

        res.json("Treatment sucessfully updated");

    } catch (err) {
        console.error(err.message);
        res.json("Appointment does not exist");
        
    }
});

//delete treatment

router.delete("/", async(req, res) => {
    try {

        const { id } = req.query;

        console.log(id);

        const deleteTreatment = await pool.query("DELETE FROM Treatment WHERE id = $1", [id]);

        res.json("Treatment sucessfully deleted");

    } catch (err) {
        console.error(err.message);
        res.json("Treatment does not exist");
        
    }
});


module.exports = router;