import React, { useContext } from 'react';

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { sidebarItems } from '../data/Sidebarlist';
import { AuthContext } from '../state/AuthContext';
const drawerWidth = 240;
export default function Sidebar() {
  const navigate = useNavigate();
  const auth=useContext(AuthContext)

  const handleLogout = (item: any) => {
    if(item.name==='Logout'){
      auth?.logout()
      return 
    }
    navigate(item.path)
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          color: '#FFD54F',
          borderRight: 'none',
          background: '#4f6f1f'
        }
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          🍲 Recipe App
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: 'auto' }}>

        <List>

          {sidebarItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handleLogout(item)}
              >
                <ListItemIcon
               sx={{
                  color: '#FFD54F'
}}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}