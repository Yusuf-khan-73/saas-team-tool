import React from 'react';
import { Card, CardContent, Box, Typography, Avatar, LinearProgress } from '@mui/material';

const StatsCard = ({ title, value, subtitle, icon: Icon, color, progress }) => {
  return (
    <Card sx={{ borderRadius: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="textSecondary" variant="caption" fontWeight={500}>{title}</Typography>
            <Typography variant="h3" fontWeight="bold" sx={{ fontSize: '2rem', mt: 1 }}>{value}</Typography>
            <Typography variant="caption" color="textSecondary">{subtitle}</Typography>
          </Box>
          <Avatar sx={{ bgcolor: `${color}20`, color: color, width: 48, height: 48 }}><Icon /></Avatar>
        </Box>
        {progress && (<Box mt={2}><LinearProgress variant="determinate" value={progress} sx={{ borderRadius: 10, height: 6, bgcolor: `${color}20` }} /><Typography variant="caption" color="textSecondary" mt={1}>{progress}% Complete</Typography></Box>)}
      </CardContent>
    </Card>
  );
};

export default StatsCard;