import React, { useState, useEffect } from 'react';
import { getTasks, updateTask, createTask } from '../services/tasks';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TimerWidget from '../components/Timer/TimerWidget';
import Button from '../components/Common/Button';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    in_progress: [],
    completed: []
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    deadline: '',
    project: 1
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      const grouped = {
        todo: data.results?.filter(t => t.status === 'todo') || [],
        in_progress: data.results?.filter(t => t.status === 'in_progress') || [],
        completed: data.results?.filter(t => t.status === 'completed') || []
      };
      setTasks(grouped);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      // Update task status logic here
      const newStatus = over?.data?.current?.status;
      if (newStatus) {
        try {
          await updateTask(active.id, { status: newStatus });
          fetchTasks();
          toast.success('Task moved successfully');
        } catch (error) {
          toast.error('Failed to move task');
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      toast.success('Task created successfully');
      setShowModal(false);
      fetchTasks();
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        deadline: '',
        project: 1
      });
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  if (loading) return <LoadingSpinner />;

  const TaskColumn = ({ title, status, tasks }) => (
    <div className="bg-gray-100 rounded-lg p-4 min-h-[500px]">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-2">{task.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 text-xs rounded-full ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority}
              </span>
              <TimerWidget taskId={task.id} onTimeLogged={fetchTasks} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
        <Button onClick={() => setShowModal(true)}>Create Task</Button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn title="To Do" status="todo" tasks={tasks.todo} />
          <TaskColumn title="In Progress" status="in_progress" tasks={tasks.in_progress} />
          <TaskColumn title="Completed" status="completed" tasks={tasks.completed} />
        </div>
      </DndContext>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Task Title"
                  className="input-field"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
                <textarea
                  placeholder="Description"
                  className="input-field"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
                <select
                  className="input-field"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                <input
                  type="datetime-local"
                  className="input-field"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit">Create</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;