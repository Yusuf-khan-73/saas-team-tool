import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { Dashboard, Work, Assignment, People, Settings, Logout, Assessment, Timer } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Projects', icon: <Work />, path: '/projects' },
  { text: 'Tasks', icon: <Assignment />, path: '/tasks' },
  { text: 'Time Tracker', icon: <Timer />, path: '/timer' },
  { text: 'Team', icon: <People />, path: '/team' },
  { text: 'Reports', icon: <Assessment />, path: '/reports' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #eef2f6', height: '100vh', position: 'sticky', top: 0 }}>
      <Box sx={{ p: 3, borderBottom: '1px solid #eef2f6' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#4361ee' }}>TeamCollab</Typography>
      </Box>
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 3,
              mb: 0.5,
              '&.Mui-selected': {
                bgcolor: '#4361ee20',
                color: '#4361ee',
                '&:hover': { bgcolor: '#4361ee30' }
              }
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? '#4361ee' : '#7f8c8d', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 20, left: 0, right: 0, px: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <ListItemButton sx={{ borderRadius: 3 }}>
          <ListItemIcon sx={{ minWidth: 40 }}><Logout sx={{ color: '#e74c3c' }} /></ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ sx: { color: '#e74c3c' } }} />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default Sidebar;