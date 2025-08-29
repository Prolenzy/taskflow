import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    completed: '',
    priority: ''
  });

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.completed) params.append('completed', filters.completed);
      if (filters.priority) params.append('priority', filters.priority);
      
      const res = await axios.get(`/api/tasks?${params}`);
      setTasks(res.data.tasks);
    } catch (error) {
      setError('Failed to fetch tasks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleTaskUpdate = () => {
    fetchTasks();
    handleFormClose();
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        setError('Failed to delete task');
        console.error(error);
      }
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="task-list-container">
      <div className="task-header">
        <h2>My Tasks</h2>
        <button onClick={handleCreate} className="btn-primary">
          Add New Task
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <select 
          value={filters.completed} 
          onChange={(e) => handleFilterChange('completed', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="false">Active</option>
          <option value="true">Completed</option>
        </select>
        
        <select 
          value={filters.priority} 
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Task List */}
      <div className="tasks">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks found. Create your first task!</p>
        ) : (
          tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onEdit={handleEdit}
              onDelete={handleDelete}
              onUpdate={fetchTasks}
            />
          ))
        )}
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <TaskForm 
              task={editingTask}
              onClose={handleFormClose}
              onSuccess={handleTaskUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;