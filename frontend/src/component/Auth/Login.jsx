/* eslint-disable react/prop-types */
import { useContext, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { AuthContext } from "./AuthContex"
import axi from "../../adios";

function Login(){
    const navigate = useNavigate(0);
    const {setIsAuthenticated} = useContext(AuthContext);
    const [Err, setErr] = useState(null)
    const [inputs, setInputs] = useState({
        email : "",
        password : "",
    }) 
    const {email, password} = inputs

    // const [error, setErr]= useState(null)

    const onChange = (e) =>{
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmit = async (e) =>{
        e.preventDefault();

        const body = {email, password}
        try {
            const res = await axi.post('/login', body)
            
            const token = res.data.token
            localStorage.setItem("token", JSON.stringify(token));
            setIsAuthenticated(true)
            console.log(res)
            navigate('/main')

        } catch (error) {
            setErr(error.message)
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={(e)=> onSubmit(e)}>
                {Err}
                <hr/>
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
                name = "password"
                placeholder="Masukkan password anda"
                className="form-control my-3"
                value={password}
                onChange={e=> onChange(e)}
                />
                <button className="btn btn-primary btn btn-block" type="submit"> Submit</button>
            </form>
            <p> Belum Memiliki Akun? <Link to={"/register"}>Register</Link></p>
        </div>
    )
}


export default Login