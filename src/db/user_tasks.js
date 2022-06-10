const db = require("./index.js");

const createTask = async ({ title, description }, user_id) => {
    const result = await db.query({
        text: `INSERT INTO user_tasks (title, description, user_id) values ($1, $2, $3) RETURNING *`,
        values: [title, description, user_id]
    });
    return result.rows[0];
}

const updateTask = async ({ title, description, id }) => {
    const result = await db.query({
        text: `UPDATE user_tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *`,
        values: [title, description, id]
    });
    const task = result.rows[0];
    return task;
}

const deleteTask = async (id) => {
    const result = await db.query({
        text: "DELETE FROM user_tasks WHERE id = $1 RETURNING *",
        values: [id]
    });
    const task = result.rows[0];
    return task;
}

const getUserTasks = async (user_id) => {
    const result = await db.query("SELECT * FROM user_tasks WHERE user_id = $1", [user_id]);
    return result.rows;
}

module.exports = {
    createTask,
    getUserTasks,
    updateTask,
    deleteTask
};