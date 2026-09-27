import React, { useState } from 'react';

function CalendarView({ tasks }) {
    const [currentDate, setCurrentDate] = useState(
        new Date()
    );

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = currentDate.toLocaleString(
        'default',
        {
            month: 'long'
        }
    );

    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    const firstDay = new Date(
        year,
        month,
        1
    ).getDay();

    const calendarDays = [];

    // Empty spaces before first day
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }

    // Days
    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {
        calendarDays.push(day);
    }

    const getTasksForDay = (day) => {
        if (!day) {
            return [];
        }

        return tasks.filter((task) => {
            if (!task.dueDate) {
                return false;
            }

            const date = new Date(task.dueDate);

            return (
                date.getFullYear() === year &&
                date.getMonth() === month &&
                date.getDate() === day
            );
        });
    };

    const goToPreviousMonth = () => {
        setCurrentDate(
            new Date(year, month - 1, 1)
        );
    };

    const goToNextMonth = () => {
        setCurrentDate(
            new Date(year, month + 1, 1)
        );
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const isToday = (day) => {
        if (!day) {
            return false;
        }

        const today = new Date();

        return (
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day
        );
    };

    return (
        <section className="calendar-section">

            {/* HEADER */}
            <div className="calendar-header">

                <div>
                    <h2>
                        {monthName} {year}
                    </h2>

                    <p>
                        View your tasks by due date.
                    </p>
                </div>

                <div className="calendar-controls">

                    <button
                        className="today-btn"
                        onClick={goToToday}
                    >
                        Today
                    </button>

                    <button
                        className="calendar-nav-btn"
                        onClick={goToPreviousMonth}
                    >
                        ‹
                    </button>

                    <button
                        className="calendar-nav-btn"
                        onClick={goToNextMonth}
                    >
                        ›
                    </button>

                </div>

            </div>

            {/* CALENDAR */}
            <div className="calendar-card">

                {/* WEEKDAYS */}
                <div className="calendar-weekdays">

                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>

                </div>

                {/* DAYS */}
                <div className="calendar-grid">

                    {calendarDays.map(
                        (day, index) => {

                            const dayTasks =
                                getTasksForDay(day);

                            return (
                                <div
                                    key={index}
                                    className={
                                        isToday(day)
                                            ? 'calendar-day today'
                                            : 'calendar-day'
                                    }
                                >

                                    {day && (
                                        <>
                                            <div className="calendar-day-number">
                                                {day}
                                            </div>

                                            <div className="calendar-tasks">

                                                {dayTasks.map(
                                                    (task) => (
                                                        <div
                                                            key={
                                                                task._id
                                                            }
                                                            className={
                                                                task.completed
                                                                    ? 'calendar-task completed'
                                                                    : 'calendar-task'
                                                            }
                                                            title={
                                                                task.description
                                                            }
                                                        >
                                                            {
                                                                task.description
                                                            }
                                                        </div>
                                                    )
                                                )}

                                            </div>
                                        </>
                                    )}

                                </div>
                            );
                        }
                    )}

                </div>

            </div>

        </section>
    );
}

export default CalendarView;