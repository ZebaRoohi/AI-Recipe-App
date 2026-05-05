import React, { useContext, useState ,useEffect} from 'react'
import {
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Box,
  Avatar,
  IconButton
} from '@mui/material'
import { AuthContext } from '../state/AuthContext'
import Dropdown from '../components/DropDown';
import { getStates, getCategories } from '../api/statescategories'

export default function Dashboard() {
  const auth = useContext(AuthContext)
  const userObj = auth?.user || null
  const userName =userObj?.name || userObj?.username || userObj?.fullName || userObj?.firstName || userObj?.email || 'User'
  const hour = new Date().getHours()
  let greeting = 'Hello'
  if (hour < 12) greeting = 'Good Morning ☀️'
  else if (hour < 18) greeting = 'Good Afternoon 🌤️'
  else greeting = 'Good Evening 🌙'

const [states, setStates] = useState<any[]>([])
const [categories, setCategories] = useState<any[]>([])
const [aiDishes, setAiDishes] = useState<string[]>([])
const [selectedState, setSelectedState] = useState<number | ''>('')
const [selectedCategory, setSelectedCategory] = useState<number | ''>('')

  useEffect(()=>{
    async function fetchMeta(){
      try{
        const statesRes=await getStates()
        const categoriesRes=await getCategories()
        setStates(statesRes.data)
        setCategories(categoriesRes.data)
      }catch(err){
        console.error('Error fetching meta data:', err)
      }
    }
    fetchMeta()
  },[])

const stateOptions = (states || []).map((s: any) => ({
  label: s.name,
  value: s.id
}))

const categoryOptions = (categories || []).map((c: any) => ({
  label: c.name,
  value: c.id
}))
  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: '#4f6f1f',
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ ml: 'auto' }}>
            <Button
              variant="outlined"
              onClick={() => auth?.logout()}
              sx={{
                color: '#FFD54F',
                borderColor: '#FFD54F',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#fff176',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    <Container maxWidth="md" sx={{ mt: 6, textAlign: 'left' }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: '#4f6f1f',
          fontWeight: 500
        }}
      >
        Welcome{' '}
        <Box
          component="span"
          sx={{
            fontWeight: 'bold',
            color: '#2e7d32'
          }}
        >
          {userName}
        </Box>
        ! {greeting}
      </Typography>

    <Box display="flex" gap={2} mt={4} alignItems="center">
      <Dropdown
        label="State"
        value={selectedState}
        onChange={setSelectedState}
        options={stateOptions}
      />

      <Dropdown
        label="Category"
        value={selectedCategory}
        onChange={setSelectedCategory}
        options={categoryOptions}
      />

      <Button
        variant="contained"
        sx={{
          height: '56px',
          minWidth: '120px',
          background: '#4f6f1f',
          '&:hover': { background: '#3e5718' },
          color: '#FFD54F'
        }}
      >
        Search
      </Button>
    </Box>

    {/* <Typography sx={{ mt: 3 }}>
      {recipe && `Recipe for ${dish}`}
    </Typography> */}
        </Container>
    </>
  )
}