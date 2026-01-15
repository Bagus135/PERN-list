const router = require('express').Router();
const authorized = require('./utils/authorized');
const pool = require('../db')

router.get("/", authorized, async(req,res)=>{
    try{
        const user = await pool.query('SELECT * FROM account WHERE id =$1',[req.id]
        );
        res.json(user.rows[0]);
    } catch(err){
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router
