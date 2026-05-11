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

export const getDishImage = async (
  dishName: string
) => {
  try {
    const query = encodeURIComponent(`${dishName} indian food`)
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=1`
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      }
    })

    if (!response.ok) {
      console.error('Unsplash API error', response.status, response.statusText)
      return `https://source.unsplash.com/featured/?${query}`
    }

    const data = await response.json()

    const imageUrl = data.results?.[0]?.urls?.regular
    if (imageUrl) return imageUrl

    // fallback to source.unsplash (no API key required)
    return `https://source.unsplash.com/featured/?${query}`
  } catch (err) {
    console.error('Error fetching dish image from Unsplash:', err)
    const fallback = `https://source.unsplash.com/featured/?${encodeURIComponent(
      dishName + ' indian food'
    )}`
    return fallback
  }
}