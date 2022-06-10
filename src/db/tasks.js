const db = require("./index.js");

const createTask = async ({ title, description }) => {
    const result = await db.query({
        text: `INSERT INTO tasks  (title, description) values ($1, $2) RETURNING *;`,
        values: [title, description]
    });
    return result.rows[0];
}

const updateTask = async ({ title, description, id }) => {
    const result = await db.query({
        text: `UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *;`,
        values: [title, description, id]
    });
    const task = result.rows[0];
    return task;
}

const deleteTask = async (id) => {
    const result = await db.query({
        text: "DELETE FROM tasks WHERE id = $1 RETURNING *",
        values: [id]
    });
    const task = result.rows[0];
    return task;
}

const getTasks = async () => {
    const result = await db.query("SELECT * FROM tasks");
    return result.rows;
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};