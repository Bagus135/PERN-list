/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import InputTodo from "./handler/inputTodo";
import { ListTodos } from "./handler/listTodo";
import axi from "../../adios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContex";
import { GetTodos } from "./handler/listTodo";

function Main() {
    const [dataTodo, setDataTodo] = useState([]);
    const [err, setErr] = useState();
    const navigate = useNavigate()
    const {user, setUser, setIsAuthenticated} = useContext(AuthContext)
    const getUser = async () =>{
        try{
            const token = JSON.parse(localStorage.token)
            const res = await axi.get('/dashboard', {headers:{token}});
            await setUser(res.data)
            await GetTodos(setDataTodo,res.data)
        } catch(err) {
            navigate("/")
            setIsAuthenticated(false)
            localStorage.removeItem("token")
            console.log(err)
        }

    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false)
        navigate("/")
    }

    const handleEditName = async () =>{
       const newName = prompt("Edit your name here!! \n(pake prompt menu aja....admin nya malas membuat modal input hehehe)");
       try {
           await axi.put(`/users/${user.id}`,{newName})
           getUser();
       } catch (error) {
        setErr(error.message)
       }
    }

    useEffect(()=>{
        getUser();
    }, []);


    return(
    <div className="mt-5">
        <h1>Welcome {user.name} 
            <button className="btn btn-secondary" onClick={()=>handleEditName()}>✏</button>
        </h1>
        <button className="btn btn-secondary" onClick={() => logout()}> Logout</button>
        <InputTodo setDataTodo={setDataTodo} setErr={setErr} />
        <div className='d-flex justify-content-center'>{err}</div>
        <ListTodos setDataTodo={setDataTodo} dataTodo={dataTodo} setErr={setErr}/>
    </div>
    )
}
export default Main