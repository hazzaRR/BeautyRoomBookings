const express = require('express');
const path = require('path');


const router = express.Router();

router.use(express.json()); // => req.body

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','admin.html'));
});

//Create new admin

router.post("/admin", async(req, res) => {
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
    
//delete admin
    
router.delete("/admin/:id", async(req, res) => {
    try {
    
        const { id } = req.params;
    
        const deleteAdmin = await pool.query("DELETE FROM admins WHERE id = $1", [id]);
    
        res.json("Admin sucessfully deleted");
    
    } catch (err) {
        console.error(err.message);
        res.json("Admin does not exist");
            
    }
});


module.exports = router;