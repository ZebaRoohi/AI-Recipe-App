import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import { requireAuth } from './middleware/authMiddleware.js'
import metaRoutes from './routes/meta.js'
import dishRoutes from './routes/dish.js'
import pool from './db.js'
import aiRoutes from './routes/ai.js'
import recipeRoutes from './routes/recipeRoutes.js'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)

app.get('/api/me', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, created_at FROM users WHERE id = $1', [req.userId])
    const user = result.rows[0]
    res.json({ user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
app.use('/api/meta', metaRoutes)
app.use('/api/dishes', dishRoutes)
app.use('/api/ai',aiRoutes)
app.use('/api/recipes',recipeRoutes)


const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
