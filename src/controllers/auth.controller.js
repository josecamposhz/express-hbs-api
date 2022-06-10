const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../db/users");

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await db.getUser(email);
    if (!user) {
      return res.status(401).send("Credenciales invalidas");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Credenciales invalidas" });
    };

    const { password: p, ...userWithoutPassword } = user;
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY);
    res.status(200).send({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).send(error);
  };
}

module.exports = {
  login
}