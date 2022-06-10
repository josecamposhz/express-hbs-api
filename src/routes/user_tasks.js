const { Router } = require("express");
const db = require("../db/user_tasks");
const requiresAuth = require("../middlewares/requiresAuth");

const router = Router();

router.use(requiresAuth);

router.get("/", async (req, res) => {
    try {
        const user_id = req.user.id;
        const tasks = await db.getUserTasks(user_id);
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error)
    };
});

router.post("/", async (req, res) => {
    try {
        const task = req.body;
        const user_id = req.user.id;
        const newTask = await db.createTask(task, user_id);
        res.status(200).send(newTask);
    } catch (error) {
        res.status(500).send(error);
    };
});

router.put("/", async (req, res) => {
    try {
        const task = await db.updateTask(req.body);
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    };
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        await db.deleteTask(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error);
    };
});

module.exports = router;
