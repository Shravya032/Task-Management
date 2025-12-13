import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete }) {
    return (
        <div className="task-list">
            <h2>Your Tasks</h2>
            {tasks.length === 0 && <p>No tasks yet! Add one above.</p>}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {tasks.map(task => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TaskList;