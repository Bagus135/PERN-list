const Validator = (req, res, next) =>{
    const {email,name, password} = req.body;
    
    function emailValidator(email){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }

    if(req.path === "/register"){
        if(![email, name, password].every(Boolean)){
            return res.status(401).json("Persyaratan tidak terpenuhi");
        } 
        else if (!emailValidator(email)){
            return res.status(401).json("Invalid Email")
        }
    } else if(req.path === "/login"){
        if(![email, password].every(Boolean)){
            return res.status(401).json("Persyaratan tidak terpenuhi");
        } else if (!emailValidator(email)){
            return res.status(401).json("Invalid Email")
        }
    }
next();
}

module.exports = Validator
