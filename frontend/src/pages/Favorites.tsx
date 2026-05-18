import React, { useEffect, useState } from 'react'

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/SideBar'
import CustomTextField from '../components/CustomTextField'

type FavoriteRecipe = {
  name: string
  image?: string
  ingredients?: string[]
  steps?: string[]
}

export default function Favorites() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([])

  useEffect(() => {
    const storedFavs: FavoriteRecipe[] =
      JSON.parse(localStorage.getItem('favorites') || '[]')

    setFavorites(storedFavs)
  }, [])

  const handleDelete = (recipeName: string) => {
    const updateFavs=favorites.filter(
      (recipe) => recipe.name !== recipeName
    )
    setFavorites(updateFavs)
    localStorage.setItem('favorites', JSON.stringify(updateFavs))
  } 

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
      <Box sx={{ display: 'flex', mb: 3 ,width:'800px'}}>
        <CustomTextField
          placeholder="Search favorites..."
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase()
            const filteredFavs = favorites.filter((recipe) =>
              recipe.name
                .toLowerCase()
                .includes(searchTerm)
            )
            setFavorites(filteredFavs)
          }}
        />
      </Box>
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
                <Card key={index}
                  sx={{
                  cursor: 'pointer'
                }}
                onClick={() =>
                  navigate(`/favorites/${recipe.name}`)
                }>
                  {recipe.image && (
                  <img
                      src={recipe.image}
                      alt={recipe.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                  )}

                  <CardContent>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                      <Typography variant="h6">
                        {recipe.name}
                      </Typography>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(recipe.name)
                          }}
                          color="error"
                        >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              )
            )}
          </Box>
        )
        }
      </Box>
    </Box>
  )
}
