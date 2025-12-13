import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
    return (
        <li style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '10px', 
            borderBottom: '1px solid #eee',
            backgroundColor: task.completed ? '#f0f0f0' : 'white'
        }}>
            <span 
                style={{ 
                    textDecoration: task.completed ? 'line-through' : 'none', 
                    cursor: 'pointer' 
                }}
                onClick={() => onToggle(task._id, task.completed)}
            >
                {task.description}
            </span>
            <div>
                <button 
                    onClick={() => onToggle(task._id, task.completed)}
                    style={{ 
                        marginRight: '10px', 
                        padding: '5px 10px', 
                        backgroundColor: task.completed ? '#28a745' : '#ffc107',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button 
                    onClick={() => onDelete(task._id)}
                    style={{ 
                        padding: '5px 10px', 
                        backgroundColor: '#dc3545', 
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TaskItem;