const { ObjectId } = require('mongodb');
const {client} = require('../config/db')

const db = client.db("todo-db");
const collection = db.collection("todo");

const getTodoModel = async () => {
  const result = await collection.find().toArray();
  console.log('getTodoModel: result ', result)
  if (result) return result
}

// post all properties
const createTodoModel = async (title, notes, dueDate, priority, isChecked) => {
  // console.log('createTodoModel : >>>>>>>>', title, notes, dueDate, priority, isChecked)
  const todo = {title, notes, dueDate, priority, isChecked}
  console.log('createTodoModel: todo ', todo)
  const result = await collection.insertOne(todo)

  console.log('createTodoModel: result ', result)
  if (!result.acknowledged) throw new Error('Failed to create todo') 
  return result
}

// change for update
const updateTodoModel = async (id, title, notes, dueDate, priority, isChecked) => {
  console.log('updateTodoModel:  id ', id)
  const filter = {"_id" : new ObjectId(id)}

  const result = await collection.updateOne(filter, 
    {$set:{title:title, notes:notes, due_date:dueDate, priority:priority, is_checked:isChecked}}
);
console.log('updateTodoModel:  result', result)
  if(result.modifiedCount === 0) throw new Error('Failed to update todo') //
  return result
}

const deleteTodoModel = async (id) => {

  const filter = {"_id" : new ObjectId(id)}
  
    const result = await collection.deleteOne( filter );
    console.log('deleteTodoModel:  result', result)
    
    console.log('deleteTodoModel:  result', result)
    if(result.deletedCount === 0) throw new Error("Failed to delete todo")
    return result
}

const getTodoByIdTodo = async (id) => {
  
  const filter = {"_id" : new ObjectId(id)}

  const result = await collection.find(filter).toArray
  console.log('getTodoByIdTodo: result ', result)
  if (result) return result
  
}

const showDoneModel = async () => {
  const showDoneQuery = `SELECT * FROM todoschema.todo
  WHERE is_checked = true ORDER BY todo_id;`
  const result = await client.query(showDoneQuery)
  if (result.rows) return result.rows
  throw new Error('Failed to get todos')
}

const deleteDoneModel = async () => {
  console.log('deleteDoneModel')
  const deleteDoneQuery = `DELETE FROM todoschema.todo
  WHERE is_checked = true;`
  const result = await client.query(deleteDoneQuery)
  // return result.rowCount
  if (result.rowCount >= 0) return result.rowCount
  // return result.rowCount // throw error
  throw new Error('Failed to delete done todos') //
}

const deleteAllModel = async () => {
  const deleteAllQuery = 'DELETE FROM todoschema.todo;'
  const result = await client.query(deleteAllQuery)
  // return result.rowCount
  if (result.rowCount >= 0) return result.rowCount
  // return result.rowCount // throw error
  throw new Error('Failed to delete all todos') //
}

module.exports = { createTodoModel, getTodoModel, updateTodoModel, deleteTodoModel, getTodoByIdTodo, showDoneModel, deleteDoneModel, deleteAllModel }
