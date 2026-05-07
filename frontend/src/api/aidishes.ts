import client from './client'
import { API_ENDPOINTS } from './endpoints'

export type DishPayload = {
  state: string
  category: string
}

export type DishResponse = {
  dishes: string[]
}

export const getDishes = (
  data: DishPayload
) =>
  client.post(
    API_ENDPOINTS.AI.DISHES,
    data
  )

// Recipe Details API

export type RecipeResponse = {
  name: string
  ingredients: string[]
  steps: string[]
}

export const getRecipeDetails = (
  dishName: string
) =>
  client.get(
    `${API_ENDPOINTS.RECIPE.DETAILS}/${dishName}`
  )