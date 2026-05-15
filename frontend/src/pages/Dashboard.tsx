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
import { getDishes, getDishImage, getRecipeDetails } from '../api/aidishes';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  CardMedia,
  Fade
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import Sidebar from '../components/SideBar';
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

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
const [loadingDishes, setLoadingDishes] = useState(false)
const [loadingRecipe, setLoadingRecipe] = useState(false)
const[error,setError]=useState('')
const [selectedRecipe, setSelectedRecipe] =useState<any>(null)
const [activeDish, setActiveDish] = useState('')
const [recipeImage, setRecipeImage] = useState('')
const[favorites,setFavorites]=useState<any[]>([])

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
    setLoadingDishes(true)
    setError('')
    const stateName=stateOptions.find(s=>s.value===selectedState)?.label
    const categoryName=categoryOptions.find(c=>c.value===selectedCategory)?.label
    if(!stateName || !categoryName){
      alert('Please select both state and category')
      return
    }
    const res=await getDishes({ state: stateName, category: categoryName })
    setAiDishes(res.data.dishes || [])
    if (!res.data.dishes || res.data.dishes.length === 0){
      setError('No dishes found for the selected state and category.')
    }
  } catch (err) {
    console.error('Error fetching AI dishes:', err)
    setError('Failed to fetch dishes. Please try again later.')
  }
  finally {
    setLoadingDishes(false)
  }
}

const handleDishClick = async (dishName: string) => {
  try{
    setLoadingRecipe(true)
    const res=await getRecipeDetails(dishName)
    setSelectedRecipe(res.data)
    setActiveDish(dishName) 
    const dishImage = await getDishImage(dishName)
    setRecipeImage(dishImage)
  }catch(err){
    console.error('Error fetching recipe details:', err)
    setError('Failed to fetch recipe details. Please try again later.')
  }finally {
    setLoadingRecipe(false) 
  }
}
useEffect(() => {
  const storedFavs =
    JSON.parse(localStorage.getItem('favorites') || '[]')

  setFavorites(storedFavs)
}, [])
const handleFavorite = () => {
  if (!selectedRecipe) return

  const alreadyExists = favorites.find(
    (item) => item.name === selectedRecipe.name
  )

  if (alreadyExists) {
    const updatedFavs = favorites.filter(
      (item) => item.name !== selectedRecipe.name
    )

    setFavorites(updatedFavs)

    localStorage.setItem(
      'favorites',
      JSON.stringify(updatedFavs)
    )
  } else {
    const newFavs = [
      ...favorites,
      {
        ...selectedRecipe,
        image: recipeImage
      }
    ]

    setFavorites(newFavs)

    localStorage.setItem(
      'favorites',
      JSON.stringify(newFavs)
    )
  }
}
return (
  <>
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
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
            {loadingDishes && (
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Typography textAlign="center" color="error">
                {error}
              </Typography>
            )}
            {!error && aiDishes.length > 0 && (
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
                            backgroundColor:
                              activeDish === dish
                                ? '#3e5718'
                                : 'transparent',
                            '&:hover': {
                              backgroundColor: '#3e5718',
                              color: '#fff176'
                            }
                          }}
                        >
                          <ListItemText primary={dish} />
                        </ListItemButton>
                      </ListItem>
                      {index !== aiDishes.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            )}
            <Box mt={6}>
              {loadingRecipe && (
                <Box display="flex" justifyContent="center" mt={4}>
                  <CircularProgress />
                </Box>
              )}
              {!loadingRecipe && selectedRecipe && (
                <Fade in={!!selectedRecipe} timeout={500}>
                  <Box
                    p={3}
                    bgcolor="#FFD54F"
                    borderRadius={2}
                    boxShadow={2}
                    color="#4f6f1f"
                  >
                    {recipeImage && (
                      <CardMedia
                        component="img"
                        height="300"
                        image={recipeImage}
                        alt={selectedRecipe.name}
                        sx={{
                          borderRadius: 2,
                          mb: 2,
                          objectFit: 'cover'
                        }}
                      />
                    )}
                 
                 <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                  >
                    {selectedRecipe.name}
                  </Typography>
                <IconButton onClick={handleFavorite}>
                  {favorites.find(
                    (item) => item.name === selectedRecipe.name
                  ) ? (
                    <FavoriteIcon sx={{ color: 'red' }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                </Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Ingredients:
                    </Typography> 
                      <List>
                      {selectedRecipe.ingredients.map(
                        (ingredient: string, index: number) => (
                          <ListItem key={index}>
                            <ListItemText primary={ingredient} />
                          </ListItem>
                        )
                      )}
                    </List>
                    <Typography variant="subtitle1" gutterBottom>
                      Steps:
                    </Typography>
                    <List>
                      {selectedRecipe.steps.map(
                        (step: string, index: number) => (
                          <ListItem key={index}>
                            <ListItemText primary={step} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </Box>
                </Fade>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  </>
)
}

