const pool = require('../db');
const jwtGenerator = require('./utils/jwtToken');
const router = require('express').Router();
const bcrypt =  require('bcryptjs');
const validator = require('./utils/validator');
const authorized = require('./utils/authorized')

//Handle Register User
router.post("/register", validator, async (req,res)=>{
    try {
        const {name, email, password} = req.body;

        const user = await pool.query("SELECT * FROM account WHERE email = $1 ;",
        [email]);
        
        if(user.rows.length !== 0){
            return res.status(401).send("Pengguna telah terdaftar!!");
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPass = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO account (name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *", [name, email, bcryptPass, "user"]);
        
        const newUserTable = `table_${newUser.rows[0].id}`
        await pool.query(`CREATE TABLE ${newUserTable} (todo_id SERIAL PRIMARY KEY, todo_desc VARCHAR(255) NOT NULL)`)
        
        const token = jwtGenerator(newUser.rows[0].id, "user");
        res.json({token});
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post("/login", async (req, res)=>{
    try{ 
        const {email, password} = req.body;
    const user = await pool.query("SELECT * FROM account WHERE email = $1", [email]);

    if(user.rows[0].length === 0 ){
        return res.status(401).send('Email atau Password salah !!!');
    };

    const validPass = await bcrypt.compare(password, user.rows[0].password); // return boolean

    //check pass
    if(!validPass){
        return res.status(401).send("Email atau Password salah !!!");
    };

    //role check
    let role = "user"
    if(user.rows[0].role === "admin"){
        role = "admin"
    }

    const token = jwtGenerator(user.rows[0].id, role)

    res.json({token})
} catch (err){
    res.status(500).send("Internal Server Error")
}
})


router.get("/is-verify", authorized, async (req,res)=>{
    try{
        res.json(true)
    } catch(err){
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router;