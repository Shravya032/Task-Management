import React from 'react';
import TaskItem from './TaskItem';

function TaskList({
    tasks,
    onToggle,
    onDelete,
    onEdit
}) {
    return (
        <div className="task-list">

            {tasks.length === 0 ? (

                <div className="empty-state">

                    <div className="empty-icon">
                        ✓
                    </div>

                    <h3>
                        No tasks found
                    </h3>

                    <p>
                        Create a new task to get
                        started with your productivity.
                    </p>

                </div>

            ) : (

                <div className="tasks-container">

                    {tasks.map((task) => (

                        <TaskItem
                            key={task._id}
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}

export default TaskList;