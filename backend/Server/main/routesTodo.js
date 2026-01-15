const pool = require('../db');
const router = require('express').Router();


const createTodoHandler = async ( req, res) =>{
    try {
        const {uid} = req.params
        const {description} = req.body;
        const newTodo = await pool.query(
            `INSERT INTO table_${uid} (todo_desc) VALUES($1) RETURNING *`,
            [description]
        )
        res.json(newTodo.rows[0]);

    }catch (err){
        console.log(err.message)
    }
};

const getAllTodoHandler = async (req,res) => {
    try {
        const {uid} = req.params
        const allTodos = await pool.query(
            `SELECT * FROM table_${uid} ORDER BY todo_id ASC`
        );
        res.json(allTodos.rows)
        
    } catch (error) {
        console.log(error)
    }
}

const getTodoHandler = async (req,res) => {
    try {
        const {uid, id} = req.params;
        const Todo = await pool.query(
            `SELECT * FROM table_${uid} WHERE todo_id = $1`, [id]
        );
        res.json(Todo.rows[0])
        
    } catch (error) {
        console.log(error)
    }
}

const updateTodoHandler = async (req,res) =>{
    try {
        const {uid, id} = req.params;
        const {description} = req.body;
        const updateTodo =  await pool.query(
            `UPDATE table_${uid} SET todo_desc = $1 WHERE todo_id = $2`, [description, id]
        )
        res.json("Todo was updated!!")
    } catch (err) {
        console.log(err.message)
        
    }
}

const deleteTodoHandler = async (req,res) =>{
    try {
        const {uid, id} = req.params;
        const deleteTodo =  await pool.query(
            `DELETE FROM table_${uid} WHERE todo_id = $1`, [id]
        )
        res.json("Todo was deleted!!")
    } catch (err) {
        console.log(err.message)
        
    }
}

router.post("/:uid", createTodoHandler);
router.get('/:uid', getAllTodoHandler);
router.get('/:uid/:id', getTodoHandler);
router.put("/:uid/:id", updateTodoHandler);
router.delete("/:uid/:id", deleteTodoHandler);

module.exports = router