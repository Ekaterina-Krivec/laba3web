const tasksList = document.querySelector("#tasks");
const tasksInput = document.querySelector("#tasksInput");
const buttonAdd = document.querySelector("#tasksAdd");
const buttonEllipsis = document.querySelector("#buttonEllipsis");
const tasksCount = document.querySelector("#tasksCount");
const tasksTitle = document.querySelector("#tasksTitle");
const tasksDate = document.querySelector("#tasksDate");
const tasksFilters = document.querySelector("#tasksFilters");
const filterButtons = document.querySelectorAll(".filter__button");
const footer = document.querySelector("#tasksNew");
let templateTask = document.querySelector("#tasksTemplate").content;

let tasks = [];

let lastId = 0;
let filter = "all";

// querySelector - назначаем переменным штуки с html по его ид
// .content - возвращает <template>содержимое шаблона элемента

const title = {
// каким образом тут идет присвоение ?????????777
all: "To do list",
inProgress: "In progress list",
completed: "Completed list",
removed: "Removed list",
};

// - - - - - CODE - - - - -

const setCount = (count) => {
tasksCount.textContent = count + " tasks";
};

const toggleNew = () => {
if (filter === "all") {
footer.classList.remove("hidden"); //удаляет указанный элемент
} else {
footer.classList.add("hidden"); //добавляет
}
};

const setTitle = () => {
//?????????????????????????

const newTitle = title[filter];
tasksTitle.textContent = newTitle;
};

const updatePageTasks = async () => {
tasksList.innerHTML = "";
let count = 0;

const response = await fetch("http://localhost:3000/todos/", {
method: "GET",
});

const tasks = await response.json();

switch (filter) {
case "all":
tasks.forEach((task) => {
if (!task.isRemoved) {
addTaskToPage(task.text, task.isComplited, task.isRemoved, task._id);
count++;
}
});
break;
case "inProgress":
tasks.forEach((task) => {
if (!task.isComplited && !task.isRemoved) {
addTaskToPage(task.text, task.isComplited, task.isRemoved, task._id);
count++;
}
});
break;
case "removed":
tasks.forEach((task) => {
if (task.isRemoved) {
addTaskToPage(task.text, task.isComplited, task.isRemoved, task._id);
count++;
}
});
break;
case "completed":
tasks.forEach((task) => {
if (task.isComplited && !task.isRemoved) {
addTaskToPage(task.text, task.isComplited, task.isRemoved, task._id);
count++;
}
});
break;
default:
break;
}

setCount(count);
setTitle();
toggleNew();
};

const setDate = () => {
const date = new Date();

const days = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
];
const dayOfWeek = days[date.getDay()];

const mounths = [
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December",
];
const mounth = mounths[date.getMonth()];

const day = date.getDay();

const year = date.getFullYear();

tasksDate.textContent = dayOfWeek + ", " + mounth + " " + day + ", " + year;
};

updatePageTasks();
setDate();

const setFilter = (newFilter) => {
filter = newFilter;
updatePageTasks();
};

// - - - - - LISTENERS - - - - -

buttonEllipsis.addEventListener("click", () => {
// обрабатываем клики на три точки
tasksFilters.classList.toggle("hidden"); //.toggle - позволяет отобразить или скрыть выбранные элементы.

if (tasksFilters.classList.contains("hidden")) {
// если стиль хайден присвоен, то филтр олл
setFilter("all");
}
});

buttonAdd.addEventListener("click", async () => {
// обрабатывем клики на + (добавление тасков)
await fetch("http://localhost:3000/todo/create/", {
method: "POST",
headers: {
"Content-Type": "application/json;charset=utf-8",
},
body: JSON.stringify({
text: tasksInput.value,
isComplited: false,
isRemoved: false,
}),
});

tasksInput.value = ""; //очищаем строку ввода
updatePageTasks(); //метод обновления странички
});

const getOneTask = async (id) => {
const response = await fetch(`http://localhost:3000/todo/${id}`, {
method: "GET",
});

return response.json();
};

const deleteTask = async (task) => {
const receivedTask = await
getOneTask(task.id);

if (!receivedTask.isRemoved) {
await fetch(`http://localhost:3000/todo/update/${task.id}`, {
method: "PATCH",
headers: {
"Content-Type": "application/json;charset=utf-8",
},
body: JSON.stringify({
isRemoved: true,
}),
});
} else {
await fetch(`http://localhost:3000/todo/delete/${task.id}`, {
method: "DELETE",
});
}

updatePageTasks();
};

const completeTask = async (task) => {
const receivedTask = await getOneTask(task.id);

await fetch(`http://localhost:3000/todo/update/${task.id}`, {
method: "PATCH",
headers: {
"Content-Type": "application/json;charset=utf-8",
},
body: JSON.stringify({
isComplited: !receivedTask.isComplited,
}),
});

updatePageTasks();
};

tasksList.addEventListener("click", (event) => {
// ???????????????????????????????

if (event.target.closest("li")) {
//Метод Element.closest() возвращает ближайший родительский элемент (или сам элемент),
//который соответствует заданному CSS-селектору или null, если таковых элементов вообще нет.
if (event.target.classList.contains("task__remove")) {
deleteTask(event.target.closest("li"));
updatePageTasks();
} else if (event.target.closest("label")) {
completeTask(event.target.closest("li"));
}
}
});

filterButtons.forEach((filterButton) => {
filterButton.addEventListener("click", () => {
filter = filterButton.dataset.filter; //?????????????????????

updatePageTasks();
});
});

// - - - - - FUNCTIONS - - - - -

const addTaskToPage = (text, isComplited, isRemoved, id) => {
let newElement = templateTask.cloneNode(true); //клонирует шаблон (?)
newElement.querySelector(".task__text").append(text);

if (isComplited) {
newElement.querySelector("#taskCheckbox").checked = true;
}

newElement.querySelector("li").setAttribute("id", id);

tasksList.prepend(newElement); //вставляет в начало списка
};
