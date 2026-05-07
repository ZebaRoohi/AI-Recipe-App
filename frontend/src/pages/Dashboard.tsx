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
import { getDishes, getRecipeDetails } from '../api/aidishes';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

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
const[loading,setLoading]=useState(false)
const[error,setError]=useState('')
const [selectedRecipe, setSelectedRecipe] =useState<any>(null)

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

const handleSearch = async () => {
  try{
    setLoading(true)
    setError('')
    const stateName=stateOptions.find(s=>s.value===selectedState)?.label
    const categoryName=categoryOptions.find(c=>c.value===selectedCategory)?.label
    if(!stateName || !categoryName){
      alert('Please select both state and category')
      return
    }
    const res=await getDishes({ state: stateName, category: categoryName })
    setAiDishes(res.data.dishes || [])
    if(res.data.dishes.length===0||!res.data.dishes){
      setError('No dishes found for the selected state and category.')
    }
  } catch (err) {
    console.error('Error fetching AI dishes:', err)
    setError('Failed to fetch dishes. Please try again later.')
  }
  finally {
    setLoading(false)
  }
}

const handleDishClick = async (dishName: string) => {
  try{
    setLoading(true)
    const res=await getRecipeDetails(dishName)
    setSelectedRecipe(res.data)
  }catch(err){
    console.error('Error fetching recipe details:', err)
    setError('Failed to fetch recipe details. Please try again later.')
  }finally {
    setLoading(false) 
  }
}
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
        onClick={handleSearch}
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

  <Box mt={6}>
    {loading && (
    <Box display="flex" justifyContent="center" mt={4}>
    <CircularProgress />
  </Box>
    )}

    {error && (
      <Typography textAlign="center" color="error">
        {error}
      </Typography>
    )}
{!loading && !error && aiDishes.length > 0 && (
  <Box mt={4}>
    <List
      sx={{
        bgcolor: '#4f6f1f',
        borderRadius: 2,
        boxShadow: 2
      }}
    >
      {aiDishes.map((dish, index) => (
        <React.Fragment key={index}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleDishClick(dish)}
              sx={{
                '&:hover': {
                  backgroundColor: '#3e5718',
                  cursor: 'pointer',
                  color: '#fff176'
                }
              }}
            >
              <ListItemText
                primary={dish}
              />
            </ListItemButton>
          </ListItem>

          {index !== aiDishes.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </Box>
)}
{
  selectedRecipe && (
    <Box mt={6} p={3} bgcolor="#e8f5e9" borderRadius={2} boxShadow={2}>
      <Typography variant="h6" gutterBottom>{selectedRecipe.name}</Typography>
      <Typography variant="subtitle1" gutterBottom>Ingredients:</Typography>
      <List>
        {selectedRecipe.ingredients.map((ingredient: string, index: number) => (
          <ListItem key={index}>
            <ListItemText primary={ingredient} />
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1" gutterBottom>Steps:</Typography>
      <List>
        {selectedRecipe.steps.map((step: string, index: number) => (
          <ListItem key={index}>
            <ListItemText primary={step} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
</Box>
 </Container>
    </>
  )
}