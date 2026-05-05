import client from './client'
import { API_ENDPOINTS } from './endpoints'

export type StatesPayload = { name: string }
export type CategoryPayload = { name: string }

export const getStates = () =>
  client.get(API_ENDPOINTS.META.STATES)

export const getCategories = () =>
  client.get(API_ENDPOINTS.META.CATEGORIES)