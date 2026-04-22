import React from 'react';
import { Box, AppBar, Toolbar, Typography, Avatar, IconButton, Badge, TextField, InputAdornment } from '@mui/material';
import { Notifications, Search } from '@mui/icons-material';
import Sidebar from './Sidebar';

const AppLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" sx={{ bgcolor: 'white', boxShadow: 'none', borderBottom: '1px solid #eef2f6' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ color: '#2c3e50' }}>Welcome back, Admin</Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                placeholder="Search..."
                size="small"
                sx={{ bgcolor: '#f5f7fa', borderRadius: 3, width: 250 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search sx={{ color: '#7f8c8d', fontSize: 20 }} /></InputAdornment>,
                }}
              />
              <IconButton><Badge badgeContent={3} color="error"><Notifications /></Badge></IconButton>
              <Avatar sx={{ bgcolor: '#4361ee' }}>A</Avatar>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AppLayout;