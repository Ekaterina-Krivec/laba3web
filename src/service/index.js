const mongoose = require("mongoose");
const ToDoSchema = require("../models");

const ToDos = mongoose.model("ToDos", ToDoSchema);

const createTodo = (data) => {
return ToDos.create({ ...data });
};

const getAllTodo = () => {
return ToDos.find({});
};

const getOneTodo = (id) => {
return ToDos.findOne({ _id: id });
};

const updateTodo = (id, data) => {
return ToDos.updateOne(
{ _id: id },
{
...data,
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