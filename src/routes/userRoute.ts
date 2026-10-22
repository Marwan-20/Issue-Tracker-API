import { Router } from "express";
import pool from '../db/db'

const route = Router();

route.get('/users', async (req, res) => {
  try {
    const [users] = await pool.query('select * from users')

    res.status(201).json(users)
  } catch(e) {
    console.error(`failed fetching the users ${e}`)
    res.status(404).json({
      message: "failed while getting the users information"
    })
  }
  
})


route.post('/users', async (req, res) => {
  try {
    const {name, email, password} = req.body // the password without hashing 
    
    if(!name || !email || !password)  return res.status(400).json({message: "some information are messing"});

    const [result] = await pool.query('INSERT INTO users (name, email, password, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())', [name, email, password])

    console.log(`the result of the inserting is ${JSON.stringify(result)}`);

    res.status(201).json({message: 'created users secsesfully'})
  } catch (e) {
    console.error("Error while creating the new user:", e);

    return res.status(500).json({
        message: "Internal server error"
    });
  }
})



route.get('/users/:id', async (req, res) => {
  try {
    const id  = req.params.id;

    if(!id || !Number.isInteger(Number(id) || Number(id) < 1)) {
      return res.status(400).json({message: "you must provide a valid id"});
    }

    const [rows] = await pool.query("SELECT * from users WHERE id = ?", [Number(id)]);

    if((rows as any[]).length === 0) {
      return res.status(404).json({message: 'the user not found'}) 
    }

    res.status(200).json({rows})
  } catch (e) {
    console.error(`there is an error whene trying to get the user with the id ${e}`);

    res.status(500).json({message: "internal server error"})
  }
})


route.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if(!id || !Number.isInteger(Number(id)) || Number(id) < 1) {
      return res.status(400).json({message: "you must provide a valid input"}) 
    }

    await pool.query("DELETE FROM issues WHERE project_id IN (SELECT id FROM projects WHERE user_id = ?)", [Number(id)])
    await pool.query('DELETE FROM projects where user_id = ?', [Number(id)]);

    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [Number(id)]);

    res.status(200).json({message: `the user with the id ${id} is deleted secsesfully`})


  } catch(e) {
    console.error(`there is an error whene deleting the user ${e}`)

    res.status(500).json({message: "there is an internal server error"})
  }
})

route.patch('/users/:id', async (req, res) => {
  try{
    const {name, email, password} = req.body;
    const id = req.params.id;

    if(!name || !email || !password) {
      return res.status(200).json({message: "missing information"})
    }

    const [result] = await pool.query("UPDATE users SET name = ?, email = ?, password = ?, updatedAt = NOW() WHERE id = ?", [name, email, password, id])

    res.status(200).json({message: "the user updated secsesfully"})
  } catch (e) {
    console.error(`there is an internal server error ${e}`)
  }
})

export default route;