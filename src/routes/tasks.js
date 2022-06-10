const { Router } = require("express");
const taskController = require("../controllers/task.controller");

const router = Router();

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;