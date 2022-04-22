const Todo = require("../service");

const handleGetAllTodos = async (req, res) => {
  try {
    const result = await Todo.getAllTodo();

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const handleCreateTodo = async (req, res) => {
  try {
    const result = await Todo.createTodo(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const handleUpdateTodo = async (req, res) => {
  try {
    const result = await Todo.updateTodo(req.params.id, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const handleGetTodo = async (req, res) => {
  try {
    const result = await Todo.getOneTodo(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const handleDeleteTodo = async (req, res) => {
  try {
    const result = await Todo.deleteTodo(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
  handleGetTodo,
  handleGetAllTodos,
  handleCreateTodo,
  handleUpdateTodo,
  handleDeleteTodo,
};

// req - получает данные с запроса фронта
// res -  юзается для отправки ответа с сервера
