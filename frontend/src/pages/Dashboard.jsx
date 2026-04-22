import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [time, setTime] = useState(155);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">✨</span>
          <span className="logo-text">TeamCollab</span>
        </div>
        
        <div className="sidebar-nav">
          <div className="nav-link active">Dashboard</div>
          <div className="nav-link">Projects</div>
          <div className="nav-link">Tasks</div>
          <div className="nav-link">Time Tracker</div>
          <div className="nav-link">Team</div>
          <div className="nav-link">Reports</div>
          <div className="nav-link">Settings</div>
        </div>
        
        <div className="sidebar-footer">
          <div className="nav-link">Logout</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main">
        {/* HEADER */}
        <div className="header">
          <h1 className="welcome">Welcome in, <span className="name">Nixtio</span></h1>
          <div className="header-actions">
            <div className="search">🔍</div>
            <div className="notif">🔔</div>
            <div className="avatar">N</div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="stats">
          <div className="stat-card">
            <div className="stat-title">Interviews</div>
            <div className="stat-value">15%</div>
            <div className="stat-small">15%</div>
            <div className="stat-percent">60%</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Project time</div>
            <div className="stat-value">Output</div>
            <div className="stat-small">10%</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Progress</div>
            <div className="stat-value">6.1h</div>
            <div className="stat-small">Work Time this week</div>
            <div className="stat-time">5h 23m</div>
          </div>
        </div>

        {/* TWO COLUMNS */}
        <div className="columns">
          {/* LEFT COLUMN */}
          <div className="left">
            {/* ONBOARDING */}
            <div className="card">
              <h3 className="card-title">Onboarding</h3>
              <div className="progress-item">
                <div className="progress-label">Interview</div>
                <div className="progress-bar"><div className="progress-fill" style={{width: '30%'}}></div></div>
                <div className="progress-percent">30%</div>
              </div>
              <div className="progress-item">
                <div className="progress-label">Project Time</div>
                <div className="progress-bar"><div className="progress-fill" style={{width: '25%'}}></div></div>
                <div className="progress-percent">25%</div>
              </div>
              <div className="progress-item">
                <div className="progress-label">Output</div>
                <div className="progress-bar"><div className="progress-fill" style={{width: '0%'}}></div></div>
                <div className="progress-percent">0%</div>
              </div>
            </div>

            {/* ONBOARDING TASK */}
            <div className="card">
              <h3 className="card-title">Onboarding Task</h3>
              <div className="task-item">
                <span>Interview</span>
                <span>Sep 13, 08:30</span>
              </div>
              <div className="task-item">
                <span>Team Meeting</span>
                <span>Sep 13, 10:30</span>
              </div>
              <div className="task-item">
                <span>Project Update</span>
                <span>Sep 13, 13:00</span>
              </div>
              <div className="task-item">
                <span>Discuss Q3 Goals</span>
                <span>Sep 13, 14:45</span>
              </div>
              <div className="task-item">
                <span>HR Policy Review</span>
                <span>Sep 13, 16:30</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right">
            {/* PROFILE CARD */}
            <div className="profile-card">
              <div className="profile-avatar">👤</div>
              <div className="profile-name">Lora Piterson</div>
              <div className="profile-role">UX/UI Designer</div>
              <div className="profile-price">$1,200</div>
            </div>

            {/* TIME TRACKER */}
            <div className="timer-card">
              <div className="timer-time">{formatTime(time)}</div>
              <div className="timer-label">Work Time</div>
              <button className="timer-btn" onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? 'Stop' : 'Start'}
              </button>
            </div>

            {/* DEVICES */}
            <div className="card">
              <h3 className="card-title">Devices</h3>
              <div className="device-item">
                <div className="device-name">MacBook Air</div>
                <div className="device-version">Version M1</div>
              </div>
            </div>

            {/* SCHEDULE */}
            <div className="card">
              <h3 className="card-title">Schedule</h3>
              <div className="schedule-item">
                <span>8:00 am</span>
                <span>Morning Briefing</span>
              </div>
              <div className="schedule-item">
                <span>9:00 am</span>
                <span>Team Standup</span>
              </div>
              <div className="schedule-item">
                <span>10:00 am</span>
                <span>Client Meeting</span>
              </div>
              <div className="schedule-item">
                <span>11:00 am</span>
                <span>Development Work</span>
              </div>
            </div>

            {/* CALENDAR */}
            <div className="card">
              <div className="month">August</div>
              <div className="weekdays">Mon Tue Wed Thu Fri Sat Sun</div>
              <div className="month">September 2024</div>
              <div className="event">Weekly Team Sync</div>
              <div className="event-desc">Discuss progress on projects</div>
              <div className="month">October</div>
              <div className="event">Onboarding Session</div>
              <div className="event-desc">Introduction for new hires</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;