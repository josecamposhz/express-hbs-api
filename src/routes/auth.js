const { Router } = require("express");
const bcrypt = require('bcrypt');
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const db = require("../db/users");
const authController = require("../controllers/auth.controller");
const { requiresAuth } = require("../middlewares/requiresAuth");

const router = Router();

router.post("/login", authController.login);

router.post("/register", async (req, res) => {
    if (!req.files || !req.files.foto) {
        return res.status(400).send("No se encontro ningun archivo en la consulta");
    }

    const user = req.body;
    if (!user.name || !user.email || !user.password) {
        return res.status(400).send("Todos los datos son requeridos");
    }

    if (user.password !== user.repeat_password) {
        return res.status(400).send("Las contraseñas no coinciden");
    }

    const { foto } = req.files;
    const { name } = foto;

    const randomName = uuidv4();
    const fileExtension = path.extname(name);
    const pathPhoto = `/uploads/${randomName}${fileExtension}`;
    foto.mv(path.join(__dirname, "../..", "/public", pathPhoto), async (err) => {
        try {
            if (err) throw err
            user.foto = pathPhoto;
            user.password = await bcrypt.hash(user.password, 10);
            await db.newUser(user);
            res.status(201).send("Usuario creado con éxito");
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        };
    });
})

router.post("/verify", requiresAuth, async (req, res) => {
    res.send(req.user);
});


module.exports = router;