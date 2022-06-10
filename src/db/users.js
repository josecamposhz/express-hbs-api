const db = require("./index.js");

const newUser = async ({ email, name, password, foto }) => {
  const result = await db.query({
    text: `INSERT INTO users  (email, name, password, foto) values ($1,$2, $3, $4) RETURNING *`,
    values: [email, name, password, foto]
  });
  return result.rows[0];
}

const updateUser = async ({ name, password, email }, id) => {
  const result = await db.query({
    text: `UPDATE users SET name = $1, password = $2, email = $3 WHERE id = $4 RETURNING *`,
    values: [name, password, email, id]
  });
  return result.rows[0];
}

const getUsers = async () => {
  const result = await db.query("SELECT id, name, email, foto FROM users");
  return result.rows;
}

const getUser = async (email) => {
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
}

const deleteUser = async (id) => {
  const result = await db.query({
    text: "DELETE FROM users WHERE id = $1 RETURNING *",
    values: [id]
  });
  const skater = result.rows[0];
  return skater;
}


module.exports = {
  newUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
