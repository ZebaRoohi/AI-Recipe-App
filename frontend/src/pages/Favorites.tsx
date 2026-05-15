import React, { useEffect, useState } from 'react'

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia
} from '@mui/material'

import Sidebar from '../components/SideBar'

type FavoriteRecipe = {
  name: string
  image?: string
  ingredients?: string[]
  steps?: string[]
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([])

  useEffect(() => {
    const storedFavs: FavoriteRecipe[] =
      JSON.parse(localStorage.getItem('favorites') || '[]')

    setFavorites(storedFavs)
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography
          variant="h4"
          mb={4}
          color="#4f6f1f"
        >
          Favorite Recipes ❤️
        </Typography>

        {favorites.length === 0 ? (
          <Typography>
            No favorite recipes added.
          </Typography>
        ) : (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill,minmax(300px,1fr))"
            gap={3}
          >
            {favorites.map(
              (recipe: FavoriteRecipe, index: number) => (
                <Card key={index}>
                  {recipe.image && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={recipe.image}
                      alt={recipe.name}
                    />
                  )}

                  <CardContent>
                    <Typography variant="h6">
                      {recipe.name}
                    </Typography>
                  </CardContent>
                </Card>
              )
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}