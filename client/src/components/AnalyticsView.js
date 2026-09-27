import React from 'react';

function AnalyticsView({ tasks }) {
    const total = tasks.length;

    const completed = tasks.filter(
        (task) => task.completed
    ).length;

    const active = tasks.filter(
        (task) => !task.completed
    ).length;

    const high = tasks.filter(
        (task) => task.priority === 'High'
    ).length;

    const medium = tasks.filter(
        (task) => task.priority === 'Medium'
    ).length;

    const low = tasks.filter(
        (task) => task.priority === 'Low'
    ).length;

    const overdue = tasks.filter((task) => {
        if (task.completed || !task.dueDate) {
            return false;
        }

        const due = new Date(task.dueDate);
        const today = new Date();

        due.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        return due < today;
    }).length;

    const completionRate =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    return (
        <section className="analytics-section">

            <div className="analytics-header">
                <div>
                    <h1>Analytics</h1>
                    <p>
                        Track your productivity and task
                        completion.
                    </p>
                </div>
            </div>

            {/* OVERVIEW */}
            <div className="analytics-stats">

                <div className="analytics-card">
                    <span>Total Tasks</span>
                    <strong>{total}</strong>
                    <small>All tasks</small>
                </div>

                <div className="analytics-card">
                    <span>Completed</span>
                    <strong>{completed}</strong>
                    <small>{completionRate}% completion rate</small>
                </div>

                <div className="analytics-card">
                    <span>In Progress</span>
                    <strong>{active}</strong>
                    <small>Tasks remaining</small>
                </div>

                <div className="analytics-card">
                    <span>Overdue</span>
                    <strong className="analytics-danger">
                        {overdue}
                    </strong>
                    <small>Need attention</small>
                </div>

            </div>

            {/* COMPLETION */}
            <div className="analytics-grid">

                <div className="analytics-panel">

                    <div className="panel-title">
                        <h2>Completion Rate</h2>
                        <span>{completionRate}%</span>
                    </div>

                    <div className="progress-track">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${completionRate}%`
                            }}
                        />
                    </div>

                    <div className="progress-labels">
                        <span>
                            {completed} completed
                        </span>

                        <span>
                            {active} remaining
                        </span>
                    </div>

                </div>

                {/* PRIORITY */}
                <div className="analytics-panel">

                    <h2>Priority Breakdown</h2>

                    <div className="priority-row">

                        <span>
                            <i className="priority-dot high" />
                            High
                        </span>

                        <strong>{high}</strong>

                    </div>

                    <div className="priority-row">

                        <span>
                            <i className="priority-dot medium" />
                            Medium
                        </span>

                        <strong>{medium}</strong>

                    </div>

                    <div className="priority-row">

                        <span>
                            <i className="priority-dot low" />
                            Low
                        </span>

                        <strong>{low}</strong>

                    </div>

                </div>

            </div>

            {/* PRODUCTIVITY */}
            <div className="analytics-panel productivity-panel">

                <h2>Productivity Summary</h2>

                <div className="productivity-grid">

                    <div>
                        <span>Completed Tasks</span>
                        <strong>{completed}</strong>
                    </div>

                    <div>
                        <span>Active Tasks</span>
                        <strong>{active}</strong>
                    </div>

                    <div>
                        <span>High Priority</span>
                        <strong>{high}</strong>
                    </div>

                    <div>
                        <span>Overdue</span>
                        <strong className="analytics-danger">
                            {overdue}
                        </strong>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default AnalyticsView;