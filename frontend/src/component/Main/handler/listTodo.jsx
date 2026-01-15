/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {useContext} from "react"
import DeleteTodo from "./deleteButton";
import EditTodo from "./editTodo";
import { AuthContext } from "../../Auth/AuthContex";
import axi from "../../../adios";

export const GetTodos = async (setDataTodo, user) =>{

  try {
        const res = await axi.get(`/todos/${user.id}`)
        setDataTodo(res.data)
        
    } catch (error) {
        console.log(error.message)
    }
}

export const ListTodos = ({dataTodo, setDataTodo, setErr}) =>{
    const {user} = useContext(AuthContext)

    return( 
        <>
        <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      { dataTodo.map((data) =>{
        return(
          <tr key={data.todo_id}>
            <td>{data.todo_desc}</td>
            <td>
                <EditTodo todo={data} setDataTodo={setDataTodo} setErr={setErr}/>
            </td>
            <td>
          <button className="btn btn-danger" onClick={() => DeleteTodo(data.todo_id, dataTodo, setDataTodo, setErr, user)}>Delete</button>
            </td>
        </tr>
        )
      })}
    </tbody>
  </table>
        </>
    )
}

