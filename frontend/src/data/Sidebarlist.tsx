import { LogoutOutlined } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const sidebarItems = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard'
  },

  {
    name: 'Favorites',
    icon: <FavoriteIcon />,
    path: '/favorites'
  },
  {
    name:'Logout',
    icon:<LogoutOutlined />,  
    path:'/logout'
  }
]