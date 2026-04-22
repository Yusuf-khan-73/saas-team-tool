import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4361ee',
      light: '#e8eeff',
      dark: '#2b4cd4',
    },
    secondary: {
      main: '#ff6b6b',
      light: '#ffe8e8',
    },
    success: {
      main: '#2ecc71',
      light: '#e8f8f0',
    },
    warning: {
      main: '#f39c12',
      light: '#fff3e0',
    },
    error: {
      main: '#e74c3c',
      light: '#fde8e8',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    h4: {
      fontWeight: 700,
      fontSize: '1.8rem',
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});