import React, { useEffect, useRef, useState } from 'react'

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { useParams } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import DownloadIcon from '@mui/icons-material/Download'
import IconButton from '@mui/material/IconButton'

type FavoriteRecipe = {
  name: string
  image?: string
  ingredients?: string[]
  steps?: string[]
}

export default function RecipeDetails() {
  const { name } = useParams()

  const [recipe, setRecipe] =
    useState<FavoriteRecipe | null>(null)
const recipeRef=useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedFavs: FavoriteRecipe[] =
      JSON.parse(localStorage.getItem('favorites') || '[]')

    const foundRecipe = storedFavs.find(
      (item) => item.name === name
    )

    if (foundRecipe) {
      setRecipe(foundRecipe)
    }
  }, [name])

  if (!recipe) {
    return <Typography>Recipe not found</Typography>
  }
  const handleDownloadPDF = async () => {
  if (!recipeRef.current) return

  const canvas = await html2canvas(
    recipeRef.current,
    {
      useCORS: true
    }
  )

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const imgProps =
    pdf.getImageProperties(imgData)
  const pdfHeight =
    (imgProps.height * pdfWidth) /
    imgProps.width

  pdf.addImage(
    imgData,
    'PNG',
    0,
    0,
    pdfWidth,
    pdfHeight
  )

  pdf.save(`${recipe.name}.pdf`)
}

  return (
    <Box p={4} ref={recipeRef}>
      <Typography
        variant="h4"
        mb={3}
        color="#4f6f1f"
      >
        {recipe.name}
      </Typography>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          crossOrigin='anonymous'
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
      )}
        <Box
        display="flex"
        justifyContent="flex-end"
        mb={2}
        >
        <IconButton
            onClick={handleDownloadPDF}
            sx={{
            backgroundColor: '#4f6f1f',
            color: '#fff',
            '&:hover': {
                backgroundColor: '#3e5718'
            }
            }}
        >
            <DownloadIcon />
        </IconButton>
        </Box>
      <Typography
        variant="h6"
        mt={4}
      >
        Ingredients
      </Typography>

      <List>
        {recipe.ingredients?.map(
          (ingredient, index) => (
            <ListItem key={index}>
              <ListItemText primary={ingredient} />
            </ListItem>
          )
        )}
      </List>

      <Typography
        variant="h6"
        mt={3}
      >
        Steps
      </Typography>

      <List>
        {recipe.steps?.map((step, index) => (
          <ListItem key={index}>
            <ListItemText primary={step} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}