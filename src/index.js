//Express позволяет настраивать и управлять HTTP-сервером для доступа к ресурсам из того же домена

// подключение зависимостей
const mongoose = require("mongoose"); //библиотека для взаимодействия с базой данных
const express = require("express");
const app = express(); //константа app символизирует приложение, которое является экземпляром фреймворка Express
const bodyParser = require("body-parser"); //Бади-парсер нужен для того, чтобы сервер умел понимать данные, собранные из инпутов/форм и засовывал в req.body(юзаем в контроллере)
const cors = require("cors"); //CORS — это функция безопасности браузера, которая ограничивает перекрестные HTTP-запросы с другими серверами и указывает, какие домены получают доступ к вашим ресурсам

const routes = require("./routes/index"); //подключаем роутеры

app.use(cors({ preflightContinue: true, optionsSuccessStatus: 200 })); //промежуточное ПО для cors, позволяющее совместно использовать ресурсы между источниками
app.use(bodyParser.urlencoded({ extended: true })); //Возвращает промежуточное ПО, которое анализирует только тело, закодированное в urlencode, и просматривает только те запросы, в которых заголовок Content-Type соответствует параметру type
app.use(bodyParser.json()); // промежуточное ПО для преобразования данных нашего запроса в формат JSON

app.use(routes); //юзаем роуты

// подключаемся к бд, передаем строку подключения
//mongodb://localhost:27017/notifications
//  "mongodb+srv://kkk:kkkkkkkk@cluster0.wgj4x.mongodb.net/todoshka",
mongoose.connect(
  "mongodb+srv://kkk:kkkkkkkk@cluster0.wgj4x.mongodb.net/todoshka",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) return console.log(err); //отлавливаем ошибку
    app.listen(3000, () => {
      //подключаем сервер
      console.log(`Плыли мы по морю...`); //в случае успеха
    });
  }
);

// async function start() {
//   try {
//     await mongoose.connect(
//       'mongodb+srv://kkk:kkkkkkkk@cluster0.wgj4x.mongodb.net/todoshka',
//       {
//         useNewUrlParser: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//     useNewUrlParser: true
//       }
//     )
//     app.listen(PORT, () => {
//       console.log('Сервер ожидает подключения...')
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }
// start()
