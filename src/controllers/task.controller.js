const db = require("../db/tasks");

async function getTasks(req, res) {
  try {
    const tasks = await db.getTasks();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error)
  };
}

async function createTask(req, res) {
  try {
    const task = req.body;
    const newTask = await db.createTask(task);
    res.status(200).send(newTask);
  } catch (error) {
    res.status(500).send(error);
  };
}

async function updateTask(req, res) {
  try {
    const task = await db.updateTask(req.body);
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  };
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params
    await db.deleteTask(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error);
  };
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
}