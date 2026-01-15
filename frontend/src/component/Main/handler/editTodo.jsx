/* eslint-disable react/prop-types */
import { useContext, useState } from "react"
import { GetTodos } from "./listTodo";
import { AuthContext } from "../../Auth/AuthContex";
import axi from "../../../adios";

const EditTodo = ({todo, setDataTodo, setErr}) =>{
    const [Value, setValue] = useState(todo.todo_desc);
    const {user} = useContext(AuthContext)

    const editTodo = async (e) =>{
        e.preventDefault();
        try {
            if(Value !== ""){
                const body = {description : Value};
                await axi.put(`/todos/${user.id}/${todo.todo_id}`,body);
                setErr("Berhasil Mengedit Jadwal")
                return  GetTodos(setDataTodo, user)
            }
            throw new Error("Input data tidak boleh kosong")
        } catch (error) {
            console.log(error.message)
            setErr(error.message)
        }
 }
    return(
        <>
            <button type="button" 
            className="btn btn-primary" 
            data-toggle="modal"
            data-target={`#id${todo.todo_id}`}>
            Edit
            </button>

            <div className="modal" id={`id${todo.todo_id}`}>
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Edit Menu</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <div className="modal-body">
                   <input 
                   type="text"
                   className="form-control" 
                   placeholder="Edit your todo here !"
                   value ={Value}
                   onChange={e => setValue(e.target.value)}/>
                </div>

                <div className="modal-footer">
                    <button type="button" 
                    className="btn btn-success" 
                    data-dismiss="modal"
                    onClick={e => editTodo(e)}>Edit</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>
        </>
    )
}

export default EditTodo