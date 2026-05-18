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
  image?: string
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
    const query = encodeURIComponent(
      `${dishName} indian food`
    )

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${
            import.meta.env.VITE_UNSPLASH_ACCESS_KEY
          }`
        }
      }
    )

    const data = await response.json()

    console.log('Unsplash Data:', data)

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular
    }

    // static fallback image
    return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop'
  } catch (err) {
    console.error('Image fetch error:', err)

    return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop'
  }
}