import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'changeme'

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ error: 'Missing token' })
  const parts = auth.split(' ')
  if (parts.length !== 2) return res.status(401).json({ error: 'Invalid auth header' })
  const token = parts[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.userId = payload.userId
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
