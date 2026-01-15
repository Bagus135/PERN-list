const pool = require('../db');
const router = require('express').Router();

router.put("/:id", async (req,res) =>{
    try {
        const {id} = req.params;
        const {newName} = req.body;
        const updateTodo =  await pool.query(
            "UPDATE account SET name = $1 WHERE id = $2", [newName, id]
        )
        res.json("Name was updated!!")
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router