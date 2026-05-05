import jwt from 'jsonwebtoken'
import * as authService from '../services/authService.js'

const JWT_SECRET = process.env.JWT_SECRET || 'changeme'

export async function register(req, res) {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })
  try {
    const user = await authService.registerUser(email, password)
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ user, token })
  } catch (err) {
    if (err.code === 'ALREADY_EXISTS') return res.status(409).json({ error: 'Email already registered' })
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

export async function login(req, res) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  try {
    const user = await authService.authenticate(email, password)
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ user, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

export default { register, login }
