import React, { useState, useEffect } from 'react';
import { FaPlay, FaStop, FaClock } from 'react-icons/fa';
import { startTimer, stopTimer, getActiveTimer } from '../../services/timelog';
import toast from 'react-hot-toast';

const TimerWidget = ({ taskId, onTimeLogged }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkActiveTimer();
  }, [taskId]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const checkActiveTimer = async () => {
    try {
      const activeTimer = await getActiveTimer();
      if (activeTimer && activeTimer.task === taskId) {
        setIsRunning(true);
        setStartTime(new Date(activeTimer.start_time).getTime());
        setElapsedTime(Math.floor((Date.now() - new Date(activeTimer.start_time).getTime()) / 1000));
      }
    } catch (error) {
      console.error('Error checking active timer:', error);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      await startTimer(taskId);
      setIsRunning(true);
      setStartTime(Date.now());
      setElapsedTime(0);
      toast.success('Timer started');
    } catch (error) {
      toast.error('Failed to start timer');
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    setLoading(true);
    try {
      await stopTimer(taskId);
      setIsRunning(false);
      setElapsedTime(0);
      toast.success('Time logged successfully');
      if (onTimeLogged) onTimeLogged();
    } catch (error) {
      toast.error('Failed to stop timer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-2">
      <FaClock className="text-gray-600" />
      <div className="font-mono text-lg font-semibold">
        {formatTime(elapsedTime)}
      </div>
      {!isRunning ? (
        <button
          onClick={handleStart}
          disabled={loading}
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition disabled:opacity-50"
        >
          <FaPlay size={12} />
        </button>
      ) : (
        <button
          onClick={handleStop}
          disabled={loading}
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition disabled:opacity-50"
        >
          <FaStop size={12} />
        </button>
      )}
    </div>
  );
};

export default TimerWidget;