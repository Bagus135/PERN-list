/* eslint-disable react/prop-types */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axi from "../../adios"

function Register(){
    const navigate = useNavigate();
    const [Err, setErr] = useState(null)
    const [inputs, setInputs] = useState({
        name : "",
        email : "",
        password : "",
    }) 
    const { name, email, password} = inputs

    const onChange = (e) =>{
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        
        const body = {name, email, password}
        try {
              const res = await axi.post('/register', body)
              const token = res.data.token
              localStorage.setItem("token", JSON.stringify(token))
              navigate('/main')
        } catch (error) {
            setErr(error.message)
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center my-5">Register</h1>
            {Err}
            <hr/>
            <form onSubmit={(e)=> onSubmit(e)}>
                <input 
                type="text"
                name="name"
                placeholder="Masukkan nama anda"
                className="form-control my-3"
                value={name}
                onChange={e=> onChange(e)}
                />
                <input 
                type="email"
                name="email"
                placeholder="Masukkan email anda"
                className="form-control my-3"
                value={email}
                onChange={e=> onChange(e)}
                />
                <input 
                type="password"
                name="password"
                placeholder="Masukkan password anda"
                className="form-control my-3"
                value={password}
                onChange={e=> onChange(e)}
                />
                <button className="btn btn-primary btn btn-block" type="submit"> Submit</button>
            </form>
            <p> Sudah Memiliki Akun? <Link to={"/login"}>Login</Link></p>
        </div>
    )
}

export default Register