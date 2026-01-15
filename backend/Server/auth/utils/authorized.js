const jwt = require("jsonwebtoken")
require("dotenv").config();

const Authorized = async (req,res,next) =>{
  const jwtToken =req.header("token");
  if(!jwtToken){
       return res.status(403).json({ message :"Authorized Denied"});
    } 
        
    try{
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        req.id = payload.user
        next();
    } catch (error) {
        res.status(401).json({message :"Token is not valid"})
    }

}

module.exports = Authorized