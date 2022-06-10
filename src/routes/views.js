const { Router } = require('express');
const { getUsers } = require("../db/users");
const { getTasks } = require("../db/tasks");

const router = Router();

// public routes
router.get("/", async (req, res) => {
    const users = await getUsers();
    res.render("Home", { users });
});

router.get("/login", (req, res) => {
    res.render("Login");
});

router.get("/registro", (req, res) => {
    res.render("Registro");
});

router.get("/tareas", async (req, res) => {
    const tasks = await getTasks();
    res.render("Tareas", { tasks });
});

// private routes
router.get("/perfil", (req, res) => {
    res.render("Perfil", { requiresAuth: true });
});

router.get("/user/tareas", async (req, res) => {
    res.render("UserTasks", { requiresAuth: true });
});

router.get("/admin", async (req, res) => {
    const users = await getUsers();
    res.render("Admin", { users, requiresAuth: true });
});

module.exports = router;