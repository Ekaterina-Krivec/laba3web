const mongoose = require("mongoose");
const ToDoSchema = require("../models");

const ToDos = mongoose.model("ToDos", ToDoSchema);

const createTodo = (data) => {
  return ToDos.create({ ...data }); // сие троеточие, грубо говоря, берет поля с объекта и по схеме их записывает в бд
};

const getAllTodo = () => {
  return ToDos.find({}); //пустой, ибо нужно получить все объекты
};

const getOneTodo = (id) => {
  return ToDos.findOne({ _id: id });
};

const updateTodo = (id, data) => {
  return ToDos.updateOne(
    { _id: id }, //присвоение
    {
      ...data, //обновленныеданные для таска
    }
  );
};

const deleteTodo = (id) => {
  return ToDos.deleteOne({ _id: id });
};

module.exports = {
  createTodo,
  getAllTodo,
  updateTodo,
  getOneTodo,
  deleteTodo,
};
