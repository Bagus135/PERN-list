import axi from "../../../adios";

const DeleteTodo = async (todoID, dataTodo, setDataTodo, setErr, user) =>{
    try {
        await axi.delete(`/todos/${user.id}/${todoID}`);
        setDataTodo(dataTodo.filter(todo => todo.todo_id !== todoID))
        setErr("Berhasil Menghapus Jadwal")
    } catch (err){
        console.log(err.message);
    }
}

export default DeleteTodo;