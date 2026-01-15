/* eslint-disable react/prop-types */
import {useContext, useState} from"react"
import { GetTodos } from "./listTodo";
import { AuthContext } from "../../Auth/AuthContex";
import axi from "../../../adios";

const InputTodo = ({setDataTodo, setErr}) =>{
    const {user} = useContext(AuthContext)
    const [description, setDescription] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const  onSubmitForm = async (e) =>{
        e.preventDefault()
        try {
            if(description != null ){
                console.log(description)
                const body = {description};
                const response = await axi.post(`/todos/${user.id}`, body
                )
                console.log(response)    
                setInputValue("")
                setDescription(null)
                setErr('Berhasil Menambahkan Jadwal')
                GetTodos(setDataTodo, user);
                return 
            }
        throw new Error("Silahkan masukkan data")

        } catch (error) {
            console.log(error.message)
            setErr(error.message)
        }
    }
    return (
        <div className="Header">
            <h1 className="text-center mt-5">LIST APP</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                type="text" 
                className="form-control"
                placeholder="Input your list here!"
                value = {inputValue}
                onChange={e => {
                    setDescription(e.target.value);
                    setInputValue(e.target.value);
                }}/>
                <button className="btn btn-primary" type="submit">Add</button>
            </form>

        </div>
    )
}

export default InputTodo