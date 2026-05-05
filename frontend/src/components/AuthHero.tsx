import React from 'react'
import { Box, Typography } from '@mui/material'

type Props = {
  title?: string
  description?: string
  imageSrc?: string
}

export default function AuthHero({
  title = 'Discover Delicious Recipes 🍲',
  description =
    'Explore a world of flavors with easy-to-follow recipes, smart cooking tips, and personalized recommendations just for you.',
  imageSrc = '/chef.png'
}: Props) {
  return (
    <Box
      sx={{
        flex: 1,
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 3,
        px: 4,
        height: '100%'
      }}
    >
      <img
        src={imageSrc}
        alt="hero"
        style={{
          width: '80%',
          maxWidth: 500,
          height: 'auto'
        }}
      />

      <Box sx={{ maxWidth: 400 }}>
        <Typography
          variant="h4"
          sx={{
            color: '#FFD54F',
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}
        >
          {title}
        </Typography>

        <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.85)', fontSize: '16px' }}>
          {description}
        </Typography>
      </Box>
    </Box>
  )
}
