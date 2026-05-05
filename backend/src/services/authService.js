import * as userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'

export async function registerUser(email, password) {
  const existing = await userModel.getUserByEmail(email)
  if (existing) {
    const err = new Error('Email already registered')
    err.code = 'ALREADY_EXISTS'
    throw err
  }
  const hash = await bcrypt.hash(password, 10)
  return userModel.createUser(email, hash)
}

export async function authenticate(email, password) {
  const user = await userModel.getUserByEmail(email)
  if (!user) return null
  const ok = await bcrypt.compare(password, user.password_hash)
  if (!ok) return null
  return { id: user.id, email: user.email }
}

export default { registerUser, authenticate }
