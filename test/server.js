const express = require("express");
const router = require("./router/route");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require('body-parser');

const server = express();
const prisma = new PrismaClient();

// Middleware
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Подключение роутера
server.use("/api", router);

// Запуск сервера
server.listen(3001, () => {
    console.log("Server running at port 3000");
});