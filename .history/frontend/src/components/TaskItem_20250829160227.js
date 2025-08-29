import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, onEdit, onDelete, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleComplete = async () => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/tasks/${task._id}`, {
        completed: !task.completed
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-meta">
          <span className="due-date">Due: {formatDate(task.dueDate)}</span>
          <span className="created-date">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="task-actions">
        <button 
          onClick={handleToggleComplete} 
          disabled={isUpdating}
          className={`btn-complete ${task.completed ? 'completed' : ''}`}
        >
          {task.completed ? 'Mark Active' : 'Complete'}
        </button>
        
        <button 
          onClick={() => onEdit(task)}
          className="btn-edit"
        >
          Edit
        </button>
        
        <button 
          onClick={() => onDelete(task._id)}
          className="btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;