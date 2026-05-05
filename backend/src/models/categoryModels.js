import pool from '../db.js'

export async function createCategory(name){
    const result=await pool.query(
        'INSERT INTO categories (name) VALUES ($1) RETURNING *',
        [name]
    )
    return result.rows[0]
}

export async function getCategories(){
    const result=await pool.query('SELECT * FROM categories')
    return result.rows
}

export default { createCategory, getCategories }