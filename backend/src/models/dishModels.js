import pool from '../db.js'

export async function createDish(name,stateId,categoryId){
    const result=await pool.query(
        'INSERT INTO dishes (name,state_id,category_id) VALUES ($1,$2,$3) RETURNING *',
        [name,stateId,categoryId]
    )
    return result.rows[0]
}

export async function getDishes(stateId, categoryId) {
  const result = await pool.query(
    `SELECT d.id, d.name 
     FROM dishes d
     WHERE d.state_id = $1 AND d.category_id = $2`,
    [stateId, categoryId]
  )
  return result.rows
}

export default { createDish, getDishes }

