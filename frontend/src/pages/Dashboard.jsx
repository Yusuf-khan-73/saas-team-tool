import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [time, setTime] = useState(155);
  const [isRunning, setIsRunning] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [completedTasks, setCompletedTasks] = useState({
    interview: false,
    teamMeeting: false,
    projectUpdate: false,
    q3Goals: false,
    hrPolicy: false,
    codeReview: false,
    designSync: false,
    clientCall: false
  });

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

  const toggleTask = (task) => {
    setCompletedTasks(prev => ({
      ...prev,
      [task]: !prev[task]
    }));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const completedCount = Object.values(completedTasks).filter(v => v === true).length;

  const navItems = ['Dashboard', 'Projects', 'Tasks', 'Time Tracker', 'Team', 'Reports', 'Settings'];

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* MAIN CONTENT - Full Width */}
      <div className="main-full">
        
        {/* TOP ROW - Welcome Text + Navigation Bar on Same Line */}
        <div className="top-row">
  <div className="welcome-section">
    <h1 className="welcome">
      Welcome in, <span className="name">Nixtio</span>
    </h1>
    <div className="subtitle">Here's what's happening with your projects today</div>
  </div>
  <div className="nav-bar-wrapper">
    <div className="left-nav-bar">
      {navItems.map((item) => (
        <div 
          key={item} 
          className={`left-nav-item ${activeNav === item ? 'active' : ''}`}
          onClick={() => setActiveNav(item)}
        >
          <span>{item}</span>
        </div>
      ))}
    </div>
    <div className="right-side-controls">
      <div className="theme-toggle-icon" onClick={toggleTheme}>
        {isDarkMode ? '☀️' : '🌙'}
      </div>
      <div className="right-nav-divider"></div>
      <div className="right-nav-user">
        <div className="right-nav-avatar">N</div>
        <div className="right-nav-user-info">
          <div className="right-nav-user-name">Nixtio</div>
          <div className="right-nav-user-role">Admin</div>
        </div>
        <div className="right-nav-dropdown">▼</div>
      </div>
    </div>
  </div>
</div>

        {/* STATS CARDS */}
        <div className="stats">
          <div className="stat-card">
            <div className="stat-title">Interviews</div>
            <div className="stat-value-group">
              <div className="stat-value">15%</div>
              <div className="stat-value-secondary">15%</div>
              <div className="stat-percent">60%</div>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{width: '60%'}}></div>
            </div>
            <div className="stat-trend">+12% vs last month</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Project time</div>
            <div className="stat-value">Output</div>
            <div className="stat-percent" style={{marginTop: '8px'}}>10%</div>
            <div className="stat-small">Efficiency rate</div>
            <div className="progress-bar-bg" style={{marginTop: '12px'}}>
              <div className="progress-bar-fill" style={{width: '10%', background: '#10b981'}}></div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Progress</div>
            <div className="stat-value">6.1h</div>
            <div className="stat-small">Work Time this week</div>
            <div className="stat-time">5h 23m</div>
            <div className="stat-trend">↑ 2h from last week</div>
          </div>
        </div>

        {/* TWO COLUMNS */}
        <div className="columns">
          {/* LEFT COLUMN */}
          <div>
            {/* ONBOARDING SECTION */}
            <div className="card">
              <h3 className="card-title">Onboarding</h3>
              <div className="progress-item">
                <div className="progress-header">
                  <span className="progress-label">Interview</span>
                  <span className="progress-percentage">30%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill amber" style={{width: '30%'}}></div>
                </div>
              </div>
              <div className="progress-item">
                <div className="progress-header">
                  <span className="progress-label">Project Time</span>
                  <span className="progress-percentage">25%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill blue" style={{width: '25%'}}></div>
                </div>
              </div>
              <div className="progress-item">
                <div className="progress-header">
                  <span className="progress-label">Documentation</span>
                  <span className="progress-percentage">0%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill gray" style={{width: '0%'}}></div>
                </div>
              </div>
              <div className="milestone-note">
                🎯 Next milestone: Complete Interview phase
              </div>
            </div>

            {/* ONBOARDING TASK LIST */}
            <div className="card">
              <div className="card-title">
                <span>Onboarding Task</span>
                <span className="card-title-badge">{completedCount}/8 Completed</span>
              </div>
              <div>
                {[
                  { id: 'interview', task: 'Interview', time: 'Sep 13, 08:30', icon: '🎯' },
                  { id: 'teamMeeting', task: 'Team Meeting', time: 'Sep 13, 10:30', icon: '👥' },
                  { id: 'projectUpdate', task: 'Project Update', time: 'Sep 13, 13:00', icon: '📊' },
                  { id: 'q3Goals', task: 'Discuss Q3 Goals', time: 'Sep 13, 14:45', icon: '🎯' },
                  { id: 'hrPolicy', task: 'HR Policy Review', time: 'Sep 13, 16:30', icon: '📋' },
                  { id: 'codeReview', task: 'Code Review', time: 'Sep 14, 11:00', icon: '💻' },
                  { id: 'designSync', task: 'Design Sync', time: 'Sep 14, 15:00', icon: '🎨' },
                  { id: 'clientCall', task: 'Client Call', time: 'Sep 15, 09:30', icon: '📞' }
                ].map((item) => (
                  <div key={item.id} className="task-item" onClick={() => toggleTask(item.id)}>
                    <div className="task-item-left">
                      <div className={`task-checkbox ${completedTasks[item.id] ? 'completed' : ''}`}>
                        {completedTasks[item.id] && <span>✓</span>}
                      </div>
                      <span className={`task-text ${completedTasks[item.id] ? 'completed' : ''}`}>
                        {item.icon} {item.task}
                      </span>
                    </div>
                    <span className="task-time">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COMPENSATION SUMMARY */}
            <div className="card">
              <h3 className="card-title">Compensation Summary</h3>
              <div className="compensation-item">
                <div className="compensation-label">Base Salary</div>
                <div className="compensation-value">$85,000</div>
              </div>
              <div className="compensation-item">
                <div className="compensation-label">Benefits</div>
                <div className="compensation-value">$12,000</div>
              </div>
              <div className="compensation-item">
                <div className="compensation-label">Bonus</div>
                <div className="compensation-value">$5,000</div>
              </div>
              <div className="compensation-item highlight">
                <div className="compensation-label"><strong>Total Compensation</strong></div>
                <div className="compensation-total">$102,000</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {/* PROFILE CARD */}
            <div className="profile-card">
              <div className="profile-avatar">👤</div>
              <div className="profile-name">Lora Peterson</div>
              <div className="profile-role">UX/UI Designer</div>
              <div className="profile-price">$1,200</div>
              <div className="profile-price-label">/per day</div>
              <button className="profile-btn">Message</button>
            </div>

            {/* TIME TRACKER */}
            <div className="timer-card">
              <div className="timer-label">Time Tracker</div>
              <div className="timer-time">{formatTime(time)}</div>
              <div className="timer-sub-label">Work Time</div>
              <div className="timer-buttons">
                <button className="timer-btn" onClick={() => setIsRunning(!isRunning)}>
                  {isRunning ? '⏸️ Stop' : '▶️ Start'}
                </button>
                <button className="timer-btn reset" onClick={() => { setIsRunning(false); setTime(0); }}>
                  🔄 Reset
                </button>
              </div>
              <div className="timer-target">
                <div className="target-text">Today's target: <span className="target-value">8h</span></div>
                <div className="target-bar">
                  <div className="target-bar-fill" style={{width: `${(time / 28800) * 100}%`}}></div>
                </div>
              </div>
            </div>

            {/* DEVICES */}
            <div className="card">
              <h3 className="card-title">Devices</h3>
              <div className="device-item">
                <div className="device-info">
                  <div className="device-icon">💻</div>
                  <div>
                    <div className="device-name">MacBook Air</div>
                    <div className="device-version">Version M1</div>
                  </div>
                </div>
                <div className="device-status">Active</div>
              </div>
            </div>

            {/* WEEKLY SCHEDULE */}
            <div className="card">
              <h3 className="card-title">📅 Weekly Schedule</h3>
              <div className="schedule-item amber">
                <div className="schedule-header">
                  <div className="schedule-title">Weekly Team Sync</div>
                  <div className="schedule-time">9:00 am</div>
                </div>
                <div className="schedule-desc">Discuss progress on projects</div>
              </div>
              <div className="schedule-item blue">
                <div className="schedule-header">
                  <div className="schedule-title">Onboarding Session</div>
                  <div className="schedule-time">10:00 am</div>
                </div>
                <div className="schedule-desc">Introduction for new hires</div>
              </div>
              <div className="schedule-item purple">
                <div className="schedule-header">
                  <div className="schedule-title">HR Policy Review</div>
                  <div className="schedule-time">4:30 pm</div>
                </div>
                <div className="schedule-desc">Sep 13, 16:30</div>
              </div>
              <div className="schedule-item green">
                <div className="schedule-header">
                  <div className="schedule-title">Project Update</div>
                  <div className="schedule-time">1:00 pm</div>
                </div>
                <div className="schedule-desc">Sprint review & planning</div>
              </div>
            </div>

            {/* UPCOMING EVENTS */}
            <div className="card">
              <h3 className="card-title">🗓️ Upcoming Events</h3>
              <div className="event-item">
                <div className="event-date">
                  <div className="event-month">SEP</div>
                  <div className="event-day">13</div>
                </div>
                <div className="event-details">
                  <div className="event-title">Interview</div>
                  <div className="event-time">08:30 - 09:30</div>
                </div>
              </div>
              <div className="event-item">
                <div className="event-date">
                  <div className="event-month">SEP</div>
                  <div className="event-day">14</div>
                </div>
                <div className="event-details">
                  <div className="event-title">Design Review</div>
                  <div className="event-time">14:00 - 15:30</div>
                </div>
              </div>
              <div className="event-item">
                <div className="event-date">
                  <div className="event-month">SEP</div>
                  <div className="event-day">15</div>
                </div>
                <div className="event-details">
                  <div className="event-title">Client Presentation</div>
                  <div className="event-time">11:00 - 12:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;