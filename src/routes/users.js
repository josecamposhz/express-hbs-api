const { Router } = require("express");
const bcrypt = require('bcrypt');
const fs = require('fs/promises');
const db = require("../db/users");
const requiresAuth = require('../middlewares/requiresAuth');

const router = Router();

router.get("/", async (req, res) => {
    try {
        const users = await db.getUsers()
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    };
});

router.put("/", requiresAuth, async (req, res) => {
    const user = req.body;
    try {
        user.password = await bcrypt.hash(user.password, 10);
        await db.updateUser(user);
        res.status(200).send("Datos actualizados con éxito");
    } catch (error) {
        res.status(500).send(error);
    };
});

router.delete("/:id", requiresAuth, async (req, res) => {
    try {
        const { id } = req.params
        const user = await db.deleteUser(id);
        await fs.unlink(`public/${user.foto}`);
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    };
});

module.exports = router;