import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  IconButton,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  CircularProgress,
  AppBar,
  Toolbar,
  Drawer,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Badge,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Assignment as TaskIcon,
  Settings as SettingsIcon,
  Notifications as NotifIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  AccessTime,
  TrendingUp,
  TrendingDown,
  MoreVert,
  PlayArrow,
  Pause,
  CheckCircle,
  Schedule,
  CalendarToday,
  AttachMoney,
  Star,
  StarBorder
} from '@mui/icons-material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Custom colors matching the image
const theme = createTheme({
  palette: {
    primary: {
      main: '#4361ee',
      light: '#e8eeff',
    },
    secondary: {
      main: '#ff6b6b',
    },
    success: {
      main: '#2ecc71',
    },
    warning: {
      main: '#f39c12',
    },
    error: {
      main: '#e74c3c',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  shape: {
    borderRadius: 16,
  },
});

const drawerWidth = 260;

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
  }
}));

const StatCard = ({ title, value, subtitle, icon: Icon, color, progress }) => (
  <StyledCard>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography color="textSecondary" variant="caption" fontWeight={500}>
            {title}
          </Typography>
          <Typography variant="h3" fontWeight="bold" sx={{ fontSize: '2rem', mt: 1 }}>
            {value}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {subtitle}
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: color + '20', color: color, width: 48, height: 48 }}>
          <Icon />
        </Avatar>
      </Box>
      {progress && (
        <Box mt={2}>
          <LinearProgress variant="determinate" value={progress} sx={{ borderRadius: 10, height: 6 }} />
          <Typography variant="caption" color="textSecondary" mt={1}>
            {progress}% Complete
          </Typography>
        </Box>
      )}
    </CardContent>
  </StyledCard>
);

const TimeTracker = () => {
  const [time, setTime] = useState(155); // 2:35 in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <StyledCard sx={{ bgcolor: '#4361ee', color: 'white' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">Time Tracker</Typography>
          <IconButton size="small" sx={{ color: 'white' }}><MoreVert /></IconButton>
        </Box>
        <Box textAlign="center" py={2}>
          <Typography variant="h2" fontWeight="bold" fontFamily="monospace" sx={{ fontSize: '3rem' }}>
            {formatTime(time)}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>Work Time</Typography>
          <Button
            variant="contained"
            sx={{ 
              mt: 2, 
              borderRadius: 50, 
              px: 4, 
              bgcolor: 'white', 
              color: '#4361ee',
              '&:hover': { bgcolor: '#f0f0f0' }
            }}
            startIcon={isRunning ? <Pause /> : <PlayArrow />}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Stop' : 'Start'} Timer
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

const OnboardingProgress = () => {
  const steps = [
    { name: 'Interview', progress: 15 },
    { name: 'Project Time', progress: 15 },
    { name: 'Output', progress: 60 },
  ];

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>Onboarding Progress</Typography>
        {steps.map((step, idx) => (
          <Box key={idx} mb={2}>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
              <Typography variant="body2">{step.name}</Typography>
              <Typography variant="body2" fontWeight="bold">{step.progress}%</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={step.progress} 
              sx={{ borderRadius: 10, height: 6, bgcolor: '#e8eeff' }}
            />
          </Box>
        ))}
      </CardContent>
    </StyledCard>
  );
};

const TaskList = () => {
  const tasks = [
    { id: 1, title: 'Interview', time: 'Sep 13, 08:30', status: 'pending' },
    { id: 2, title: 'Team Meeting', time: 'Sep 13, 10:30', status: 'pending' },
    { id: 3, title: 'Project Update', time: 'Sep 13, 13:00', status: 'completed' },
    { id: 4, title: 'Discuss Q3 Goals', time: 'Sep 13, 14:45', status: 'pending' },
    { id: 5, title: 'HR Policy Review', time: 'Sep 13, 16:30', status: 'pending' },
  ];

  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">Today's Tasks</Typography>
          <Button size="small" sx={{ color: '#4361ee' }}>View All</Button>
        </Box>
        <List sx={{ p: 0 }}>
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <ListItem sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: task.status === 'completed' ? '#2ecc7120' : '#4361ee20', color: task.status === 'completed' ? '#2ecc71' : '#4361ee' }}>
                    {task.status === 'completed' ? <CheckCircle /> : <Schedule />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none', fontWeight: 500 }}>
                      {task.title}
                    </Typography>
                  }
                  secondary={task.time}
                />
                <Chip
                  label={task.status === 'completed' ? 'Done' : 'Pending'}
                  size="small"
                  sx={{ bgcolor: task.status === 'completed' ? '#2ecc7120' : '#f39c1220', color: task.status === 'completed' ? '#2ecc71' : '#f39c12' }}
                />
              </ListItem>
              {index < tasks.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </StyledCard>
  );
};

const TeamMembers = () => {
  const members = [
    { name: 'Lora Piterson', role: 'UX/UI Designer', amount: '$1,200', avatar: 'LP', rating: 4.5 },
    { name: 'John Smith', role: 'Frontend Dev', amount: '$980', avatar: 'JS', rating: 4.8 },
    { name: 'Emma Wilson', role: 'Backend Dev', amount: '$1,100', avatar: 'EW', rating: 4.7 },
  ];

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>Team Members</Typography>
        {members.map((member, idx) => (
          <Box key={idx} display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: '#4361ee', width: 48, height: 48 }}>{member.avatar}</Avatar>
              <Box>
                <Typography variant="body1" fontWeight="bold">{member.name}</Typography>
                <Typography variant="caption" color="textSecondary">{member.role}</Typography>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Star sx={{ fontSize: 12, color: '#f39c12' }} />
                  <Star sx={{ fontSize: 12, color: '#f39c12' }} />
                  <Star sx={{ fontSize: 12, color: '#f39c12' }} />
                  <Star sx={{ fontSize: 12, color: '#f39c12' }} />
                  <StarBorder sx={{ fontSize: 12, color: '#f39c12' }} />
                </Box>
              </Box>
            </Box>
            <Typography variant="body2" fontWeight="bold" color="primary">{member.amount}</Typography>
          </Box>
        ))}
      </CardContent>
    </StyledCard>
  );
};

const CalendarWidget = () => {
  const events = [
    { time: '8:00 am', event: 'Morning Briefing' },
    { time: '9:00 am', event: 'Team Standup' },
    { time: '10:00 am', event: 'Client Meeting' },
    { time: '11:00 am', event: 'Development Work' },
  ];

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>Today's Schedule</Typography>
        {events.map((item, idx) => (
          <Box key={idx} display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="body2" fontWeight="bold" sx={{ minWidth: 70, color: '#4361ee' }}>
              {item.time}
            </Typography>
            <Box flex={1}>
              <Typography variant="body2">{item.event}</Typography>
              <LinearProgress variant="determinate" value={60} sx={{ borderRadius: 10, height: 3, mt: 0.5 }} />
            </Box>
          </Box>
        ))}
      </CardContent>
    </StyledCard>
  );
};

const Sidebar = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, active: true },
    { text: 'Projects', icon: <WorkIcon />, active: false },
    { text: 'Tasks', icon: <TaskIcon />, active: false },
    { text: 'Team', icon: <PeopleIcon />, active: false },
    { text: 'Settings', icon: <SettingsIcon />, active: false },
  ];

  return (
    <Box sx={{ width: drawerWidth, flexShrink: 0 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#4361ee' }}>
          TeamCollab
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            selected={item.active}
            sx={{
              mx: 2,
              borderRadius: 3,
              mb: 1,
              '&.Mui-selected': {
                bgcolor: '#4361ee20',
                color: '#4361ee',
                '&:hover': { bgcolor: '#4361ee30' }
              }
            }}
          >
            <ListItemIcon sx={{ color: item.active ? '#4361ee' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <Typography variant="body2">{item.text}</Typography>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default function AdminDashboard() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', bgcolor: '#f5f7fa', minHeight: '100vh' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4" fontWeight="bold" sx={{ fontSize: '1.8rem' }}>
              Welcome in, Nixtio
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                placeholder="Search..."
                size="small"
                sx={{ bgcolor: 'white', borderRadius: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton>
                <Badge badgeContent={3} color="error">
                  <NotifIcon />
                </Badge>
              </IconButton>
              <Avatar sx={{ bgcolor: '#4361ee' }}>N</Avatar>
            </Box>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Interviews" value="15%" subtitle="+5% from last week" icon={PeopleIcon} color="#e74c3c" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Project Time" value="15%" subtitle="+2% from last week" icon={AccessTime} color="#f39c12" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Output" value="60%" subtitle="+12% from last week" icon={TrendingUp} color="#2ecc71" progress={60} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Work Time" value="6.1h" subtitle="5h 23m avg" icon={WorkIcon} color="#4361ee" />
            </Grid>
          </Grid>

          {/* Main Content */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <OnboardingProgress />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimeTracker />
                </Grid>
                <Grid item xs={12}>
                  <TaskList />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TeamMembers />
                </Grid>
                <Grid item xs={12}>
                  <CalendarWidget />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}