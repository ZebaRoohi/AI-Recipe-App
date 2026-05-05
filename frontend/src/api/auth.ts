import client from './client'
import { API_ENDPOINTS } from './endpoints'

export type LoginPayload = { email: string; password: string }
export type RegisterPayload = { name: string; email: string; password: string }

export const login = (data: LoginPayload) =>
  client.post(API_ENDPOINTS.AUTH.LOGIN, data)

export const register = (data: RegisterPayload) =>
  client.post(API_ENDPOINTS.AUTH.REGISTER, data)