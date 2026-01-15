const express = require('express');
const cors = require('cors');
const app = express();
const todoRoutes = require('./Server/main/routesTodo')
const authRoutes = require("./Server/auth/authRoutes")
const dashbRoutes = require("./Server/auth/dashboard")
const userRoutes = require("./Server/main/userRoutes")

//middleware 
app.use(cors());
app.use(express.json());
app.get("/", (req,res)=>{
    res.send('Backend is working properly')
})
app.use('/auth', authRoutes)
app.use('/dashboard', dashbRoutes)
app.use('/todos', todoRoutes)
app.use('/users', userRoutes )

const Port = process.env.Port || 8080;

app.listen(Port, () =>{
    console.log(`Server has started on http://localhost:8080`)
})