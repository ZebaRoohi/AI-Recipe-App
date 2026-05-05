import pool from "../db.js";

export async function createState(name) {
  const result = await pool.query(
    'INSERT INTO states (name) VALUES ($1) RETURNING *',
    [name]
  )
  return result.rows[0]
}

export async function getStates(){
    const result=await pool.query('SELECT * FROM states')
    return result.rows
}

export default { createState, getStates }