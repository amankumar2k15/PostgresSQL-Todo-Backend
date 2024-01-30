const pool = require('./connection/db');
const express = require('express');
const cors = require('cors');
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())


//POST TODO
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body
        //VALUES($1) ==>  means => it is placeholder that works like a vari will increment ,, its basically a "id"
        //RETURNING * ==>  means => whenever you are adding, deleting or editing in todo then you will get the data field too in which you creating data will be stored in row[0]
        //Second argument is query  i.e. [description]  ==> means ==> ye vo description ki value ayegi jo me ..frontend ya postman se bhejunga 
        const newTodo = await pool.query(
            "INSERT INTO todo(description) VALUES($1) RETURNING *",
            [description]
        )
        // console.log("Adding new Todo ==> ", newTodo.rows[0])

        return res.status(201).json({
            message: "Todo created successfully",
            code: 201,
            result: newTodo.rows[0]
        })
    } catch (err) {
        return res.status(500).json({ message: err.message, code: 500 })
    }
})


//GET TODO
app.get("/todos", async (req, res) => {
    try {
        const todoResult = await pool.query("SELECT * FROM todo ")    // SELECT * FROM todo ORDER BY todo_id ==> if i write this then it will give me line-wise todo bcoz i added ORDER BY todo_id
        return res.status(200).json({
            message: "Fetched todo successfully",
            code: 200,
            result: todoResult.rows
        })
    } catch (error) {
        return res.status(500).json({ message: err.message, code: 500 })
    }
})

// GET TODO BY ID
app.get("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id
        const getTodoByID = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        )
        // console.log("getTODO By ID", getTodoByID)

        return res.status(200).json({
            result: getTodoByID.rows[0]
        })
    } catch (error) {
        return res.status(500).json({ message: error.message, code: 500 })
    }
})

// UPDATE TODO
app.patch("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body

        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        )

        return res.status(200).json({
            message: "Todo updated successfully",
            code: 200,
            result: updateTodo.rows[0]
        })

    } catch (error) {
        return res.status(500).json({ message: error.message, code: 500 })
    }
})

// DELETE TODO
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params

        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        )

        return res.status(200).json({
            message: "Todo deleted successfully",
        })

    } catch (error) {
        return res.status(500).json({ message: error.message, code: 500 })
    }
})

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})


