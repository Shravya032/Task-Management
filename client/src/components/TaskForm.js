import React, { useState } from 'react';

function TaskForm({ onSubmit }) {
    const [description, setDescription] =
        useState('');

    const [priority, setPriority] =
        useState('Medium');

    const [dueDate, setDueDate] =
        useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description.trim()) {
            return;
        }

        onSubmit({
            description: description.trim(),
            priority: priority,
            dueDate: dueDate || null
        });

        setDescription('');
        setPriority('Medium');
        setDueDate('');
    };

    return (
        <form
            className="task-form"
            onSubmit={handleSubmit}
        >

            <div className="task-input-wrapper">

                <span className="task-input-icon">
                    +
                </span>

                <input
                    type="text"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                    placeholder="What do you need to accomplish?"
                    className="task-input"
                />

            </div>

            <select
                className="task-select"
                value={priority}
                onChange={(e) =>
                    setPriority(e.target.value)
                }
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
                className="task-date"
                value={dueDate}
                onChange={(e) =>
                    setDueDate(e.target.value)
                }
            />

            <button
                type="submit"
                className="add-task-btn"
            >
                <span>+</span>
                Add Task
            </button>

        </form>
    );
}

export default TaskForm;