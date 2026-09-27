import React, { useState } from 'react';

const getDueDateStatus = (
    dueDate,
    completed
) => {
    if (!dueDate || completed) {
        return null;
    }

    const due = new Date(dueDate);

    const dueYear = due.getFullYear();

    const dueMonth = String(
        due.getMonth() + 1
    ).padStart(2, '0');

    const dueDay = String(
        due.getDate()
    ).padStart(2, '0');

    const today = new Date();

    const todayYear =
        today.getFullYear();

    const todayMonth = String(
        today.getMonth() + 1
    ).padStart(2, '0');

    const todayDay = String(
        today.getDate()
    ).padStart(2, '0');

    const dueDateOnly =
        `${dueYear}-${dueMonth}-${dueDay}`;

    const todayOnly =
        `${todayYear}-${todayMonth}-${todayDay}`;

    if (dueDateOnly < todayOnly) {
        return {
            label: 'Overdue',
            className: 'overdue'
        };
    }

    if (dueDateOnly === todayOnly) {
        return {
            label: 'Due Today',
            className: 'due-today'
        };
    }

    return {
        label: 'Upcoming',
        className: 'upcoming'
    };
};

function TaskItem({
    task,
    onToggle,
    onDelete,
    onEdit
}) {
    const [isEditing, setIsEditing] =
        useState(false);

    const [editText, setEditText] =
        useState(task.description);

    const [editPriority, setEditPriority] =
        useState(task.priority || 'Medium');

    const [editDueDate, setEditDueDate] =
        useState(
            task.dueDate
                ? task.dueDate.substring(0, 10)
                : ''
        );

    const dueDateStatus =
        getDueDateStatus(
            task.dueDate,
            task.completed
        );

    const handleEdit = () => {
        if (!editText.trim()) {
            return;
        }

        onEdit(task._id, {
            description: editText.trim(),
            priority: editPriority,
            dueDate: editDueDate || null
        });

        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(task.description);

        setEditPriority(
            task.priority || 'Medium'
        );

        setEditDueDate(
            task.dueDate
                ? task.dueDate.substring(0, 10)
                : ''
        );

        setIsEditing(false);
    };

    return (
        <div
            className={
                task.completed
                    ? 'task-card completed'
                    : 'task-card'
            }
        >

            {isEditing ? (

                <div className="edit-task-container">

                    <div className="edit-fields">

                        <input
                            type="text"
                            value={editText}
                            onChange={(e) =>
                                setEditText(
                                    e.target.value
                                )
                            }
                            className="edit-task-input"
                            placeholder="Task description"
                            autoFocus
                            onKeyDown={(e) => {
                                if (
                                    e.key ===
                                    'Enter'
                                ) {
                                    handleEdit();
                                }

                                if (
                                    e.key ===
                                    'Escape'
                                ) {
                                    handleCancel();
                                }
                            }}
                        />

                        <select
                            value={editPriority}
                            onChange={(e) =>
                                setEditPriority(
                                    e.target.value
                                )
                            }
                            className="edit-select"
                        >
                            <option value="Low">
                                Low
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="High">
                                High
                            </option>

                        </select>

                        <input
                            type="date"
                            value={editDueDate}
                            onChange={(e) =>
                                setEditDueDate(
                                    e.target.value
                                )
                            }
                            className="edit-date"
                        />

                    </div>

                    <div className="edit-actions">

                        <button
                            className="save-btn"
                            onClick={handleEdit}
                        >
                            Save
                        </button>

                        <button
                            className="cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            ) : (

                <>

                    <div className="task-left">

                        <button
                            className={
                                task.completed
                                    ? 'task-checkbox checked'
                                    : 'task-checkbox'
                            }
                            onClick={() =>
                                onToggle(
                                    task._id,
                                    task.completed
                                )
                            }
                        >
                            {task.completed
                                ? '✓'
                                : ''}
                        </button>

                        <div className="task-info">

                            <span
                                className={
                                    task.completed
                                        ? 'task-title completed-title'
                                        : 'task-title'
                                }
                            >
                                {task.description}
                            </span>

                            <div className="task-meta">

                                <span
                                    className={`priority-badge priority-${
                                        task.priority?.toLowerCase() ||
                                        'medium'
                                    }`}
                                >
                                    {task.priority ||
                                        'Medium'}{' '}
                                    Priority
                                </span>

                                <span
                                    className={
                                        task.completed
                                            ? 'status-badge completed-status'
                                            : 'status-badge active-status'
                                    }
                                >
                                    {task.completed
                                        ? 'Completed'
                                        : 'In Progress'}
                                </span>

                                {task.dueDate && (
                                    <>
                                        <span
                                            className={`due-date ${
                                                dueDateStatus
                                                    ? dueDateStatus.className
                                                    : ''
                                            }`}
                                        >
                                            📅{' '}
                                            {new Date(
                                                task.dueDate
                                            ).toLocaleDateString()}
                                        </span>

                                        {dueDateStatus && (
                                            <span
                                                className={`due-status ${dueDateStatus.className}`}
                                            >
                                                {
                                                    dueDateStatus.label
                                                }
                                            </span>
                                        )}
                                    </>
                                )}

                            </div>

                        </div>

                    </div>

                    <div className="task-actions">

                        <button
                            className="edit-btn"
                            onClick={() =>
                                setIsEditing(true)
                            }
                        >
                            ✎ Edit
                        </button>

                        <button
                            className="complete-btn"
                            onClick={() =>
                                onToggle(
                                    task._id,
                                    task.completed
                                )
                            }
                        >
                            {task.completed
                                ? 'Undo'
                                : 'Complete'}
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() =>
                                onDelete(
                                    task._id
                                )
                            }
                        >
                            Delete
                        </button>

                    </div>

                </>

            )}

        </div>
    );
}

export default TaskItem;