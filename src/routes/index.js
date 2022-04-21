const express = require("express");
const {
handleCreateTodo,
handleGetAllTodos,
handleUpdateTodo,
handleGetTodo,
handleDeleteTodo,
} = require("../controllers");

const router = express();

//params

// to get all the todos
router.get("/todos/", handleGetAllTodos);

// to get a single todo
router.get("/todo/:id", handleGetTodo);

// to create a todo
router.post("/todo/create/", handleCreateTodo);

// to update the todo
router.patch("/todo/update/:id", handleUpdateTodo); // :id this is the todo id

router.delete("/todo/delete/:id", handleDeleteTodo);

module.exports = router;
