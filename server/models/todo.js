const { client } = require('../config/db')

const getTodoModel = async () => {
  const text = 'SELECT * FROM todoSchema.todo ORDER BY todo_id;'
  const result = await client.query(text)
  if (result.rows) return result.rows
  throw new Error('Failed to get todos')
}

// post all properties
const createTodoModel = async (todoText, notes, dueDate, priority, isChecked) => {
  // console.log('createTodoModel : >>>>>>>>', todoText, notes, dueDate, priority, isChecked)
  const text = 'INSERT INTO todoSchema.todo(title, notes, due_date, priority, is_checked ) VALUES($1, $2, $3, $4, $5) RETURNING *'
  const values = [todoText, notes, dueDate, priority, isChecked]
  const result = await client.query(text, values)
  // console.log('createTodoModel: result ', result)
  if (result.rowCount === 1) return [result.rows[0], null]
  return [null]
  // throw new Error('Failed to create todo')
}

const updateTodoModel = async (id, todoText, todoNote, dueDate, priority, isChecked) => {
  const values = [id, todoText, todoNote, dueDate, priority, isChecked]
  const text = 'UPDATE todoSchema.todo SET  title = $2, notes = $3, due_date = $4, priority = $5, is_checked = $6 WHERE todo_id = $1 RETURNING *'

  // const updateQuery = `UPDATE todoSchema.todo
  //   SET title = '${todoText}', notes = '${todoNote}', due_date = '${dueDate}', priority = '${priority}', is_checked = '${isChecked}'
  //   WHERE todo_id = ${id} RETURNING todo_id, title, notes, due_date, priority, is_checked;`
  const result = await client.query(text, values)
  if (result.rowCount === 1) if (result.rowCount === 1) return [result.rows[0], null]
  return [null]
}

const deleteTodoModel = async (id) => {
  const deleteQuery = `DELETE FROM todoSchema.todo
    WHERE todo_id = ${id};`
  const result = await client.query(deleteQuery)
  return result.rowCount
}

const getTodoByIdTodo = async (id) => {
  const getByIdQuery = `SELECT FROM todoSchema.todo
    WHERE todo_id = ${id};`
  const result = await client.query(getByIdQuery)
  return result.rowCount
}

module.exports = { createTodoModel, getTodoModel, updateTodoModel, deleteTodoModel, getTodoByIdTodo }