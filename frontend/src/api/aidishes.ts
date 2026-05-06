import client from './client'
import { API_ENDPOINTS } from './endpoints'

export type DishPayload = { state:string, category:string }
export const getDishes = (data:DishPayload) =>
  client.post(API_ENDPOINTS.AI.DISHES, data)