import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import CalendarView from './components/CalendarView';
import AnalyticsView from './components/AnalyticsView';
import Login from './components/Login';
import Register from './components/Register';
import SettingsView from './components/SettingsView';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

import './App.css';


const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE}/tasks`;


function App() {

    const [user, setUser] = useState(null);

    const [authPage, setAuthPage] =
        useState('login');

    const [resetToken, setResetToken] =
        useState('');

    const [tasks, setTasks] = useState([]);

    const [searchTerm, setSearchTerm] =
        useState('');

    const [filter, setFilter] =
        useState('all');

    const [activePage, setActivePage] =
        useState('dashboard');


    // Check existing login
    useEffect(() => {

        const savedUser =
            localStorage.getItem('user');

        const token =
            localStorage.getItem('token');

        if (savedUser && token) {
            setUser(
                JSON.parse(savedUser)
            );
        }

    }, []);


    // Fetch tasks
    useEffect(() => {

        if (!user) {
            return;
        }

        const token =
            localStorage.getItem('token');

        axios
            .get(API_URL, {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            })
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {

                console.error(
                    'Fetch error:',
                    error
                );

                if (
                    error.response?.status ===
                    401
                ) {
                    handleLogout();
                }

            });

    }, [user]);


    const handleLogin = (
        loggedInUser
    ) => {

        setUser(loggedInUser);
        setAuthPage('login');
        setActivePage('dashboard');

    };


    const handleLogout = () => {

        localStorage.removeItem(
            'token'
        );

        localStorage.removeItem(
            'user'
        );

        setUser(null);
        setTasks([]);

        setAuthPage('login');
        setActivePage('dashboard');

        setSearchTerm('');
        setFilter('all');

    };


    const addTask = async (
        taskData
    ) => {

        try {

            const token =
                localStorage.getItem(
                    'token'
                );

            const response =
                await axios.post(
                    API_URL,
                    taskData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setTasks(
                (prevTasks) => [
                    ...prevTasks,
                    response.data
                ]
            );

        } catch (error) {

            console.error(
                'Create error:',
                error
            );

        }

    };


    const toggleComplete = async (
        id,
        currentCompleted
    ) => {

        try {

            const token =
                localStorage.getItem(
                    'token'
                );

            const response =
                await axios.put(
                    `${API_URL}/${id}`,
                    {
                        completed:
                            !currentCompleted
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setTasks(
                (prevTasks) =>
                    prevTasks.map(
                        (task) =>
                            task._id === id
                                ? response.data
                                : task
                    )
            );

        } catch (error) {

            console.error(
                'Update error:',
                error
            );

        }

    };


    const deleteTask = async (
        id
    ) => {

        try {

            const token =
                localStorage.getItem(
                    'token'
                );

            await axios.delete(
                `${API_URL}/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setTasks(
                (prevTasks) =>
                    prevTasks.filter(
                        (task) =>
                            task._id !== id
                    )
            );

        } catch (error) {

            console.error(
                'Delete error:',
                error
            );

        }

    };


    const editTask = async (
        id,
        taskData
    ) => {

        try {

            const token =
                localStorage.getItem(
                    'token'
                );

            const response =
                await axios.put(
                    `${API_URL}/${id}`,
                    taskData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setTasks(
                (prevTasks) =>
                    prevTasks.map(
                        (task) =>
                            task._id === id
                                ? response.data
                                : task
                    )
            );

        } catch (error) {

            console.error(
                'Edit error:',
                error
            );

        }

    };


    const totalTasks =
        tasks.length;

    const completedTasks =
        tasks.filter(
            (task) =>
                task.completed
        ).length;

    const activeTasks =
        tasks.filter(
            (task) =>
                !task.completed
        ).length;

    const overdueTasks =
        tasks.filter((task) => {

            if (
                task.completed ||
                !task.dueDate
            ) {
                return false;
            }

            const dueDate =
                new Date(
                    task.dueDate
                );

            const today =
                new Date();

            dueDate.setHours(
                0,
                0,
                0,
                0
            );

            today.setHours(
                0,
                0,
                0,
                0
            );

            return dueDate < today;

        }).length;


    const filteredTasks =
        tasks.filter((task) => {

            const matchesSearch =
                task.description
                    .toLowerCase()
                    .includes(
                        searchTerm
                            .toLowerCase()
                    );

            const matchesFilter =
                filter === 'all' ||

                (
                    filter === 'active' &&
                    !task.completed
                ) ||

                (
                    filter === 'completed' &&
                    task.completed
                );

            return (
                matchesSearch &&
                matchesFilter
            );

        });


    // Authentication pages
    if (!user) {

        if (authPage === 'register') {

            return (
                <Register
                    onShowLogin={() =>
                        setAuthPage(
                            'login'
                        )
                    }
                />
            );

        }


        if (
            authPage ===
            'forgot-password'
        ) {

            return (
                <ForgotPassword
                    onShowLogin={() =>
                        setAuthPage(
                            'login'
                        )
                    }
                    onResetPassword={(
                        token
                    ) => {

                        setResetToken(
                            token
                        );

                        setAuthPage(
                            'reset-password'
                        );

                    }}
                />
            );

        }


        if (
            authPage ===
            'reset-password'
        ) {

            return (
                <ResetPassword
                    token={
                        resetToken
                    }
                    onShowLogin={() => {

                        setResetToken('');

                        setAuthPage(
                            'login'
                        );

                    }}
                />
            );

        }


        return (
            <Login
                onLogin={
                    handleLogin
                }
                onShowRegister={() =>
                    setAuthPage(
                        'register'
                    )
                }
                onShowForgotPassword={() =>
                    setAuthPage(
                        'forgot-password'
                    )
                }
            />
        );

    }


    // Main dashboard
    return (

        <div className="app-layout">

            <aside className="sidebar">

                <div className="brand">

                    <div className="brand-icon">
                        ✓
                    </div>

                    <span>
                        TaskFlow
                    </span>

                </div>


                <nav className="sidebar-nav">

                    <button
                        className={
                            activePage ===
                                'dashboard'
                                ? 'nav-item active'
                                : 'nav-item'
                        }
                        onClick={() =>
                            setActivePage(
                                'dashboard'
                            )
                        }
                    >
                        <span>⌂</span>
                        Dashboard
                    </button>


                    <button
                        className={
                            activePage ===
                                'tasks'
                                ? 'nav-item active'
                                : 'nav-item'
                        }
                        onClick={() => {

                            setActivePage(
                                'tasks'
                            );

                            setFilter(
                                'all'
                            );

                            setSearchTerm(
                                ''
                            );

                        }}
                    >
                        <span>☑</span>

                        My Tasks

                        <span className="nav-count">
                            {totalTasks}
                        </span>

                    </button>


                    <button
                        className={
                            activePage ===
                                'calendar'
                                ? 'nav-item active'
                                : 'nav-item'
                        }
                        onClick={() =>
                            setActivePage(
                                'calendar'
                            )
                        }
                    >
                        <span>▣</span>
                        Calendar
                    </button>


                    <button
                        className={
                            activePage ===
                                'analytics'
                                ? 'nav-item active'
                                : 'nav-item'
                        }
                        onClick={() =>
                            setActivePage(
                                'analytics'
                            )
                        }
                    >
                        <span>▥</span>
                        Analytics
                    </button>

                </nav>


                <div className="sidebar-bottom">

                    <button
                        className={
                            activePage ===
                                'settings'
                                ? 'nav-item active'
                                : 'nav-item'
                        }
                        onClick={() =>
                            setActivePage(
                                'settings'
                            )
                        }
                    >
                        <span>⚙</span>
                        Settings
                    </button>


                    <div className="profile">

                        <div className="profile-avatar">

                            {user.name
                                ? user.name
                                    .charAt(0)
                                    .toUpperCase()
                                : 'U'}

                        </div>

                        <div>

                            <strong>
                                {user.name}
                            </strong>

                            <small>
                                My Workspace
                            </small>

                        </div>

                    </div>


                    <button
                        className="logout-button"
                        onClick={
                            handleLogout
                        }
                    >
                        ⇥ Logout
                    </button>

                </div>

            </aside>


            <main className="main-content">

                <header className="topbar">

                    <div className="mobile-brand">

                        <div className="brand-icon">
                            ✓
                        </div>

                        <span>
                            TaskFlow
                        </span>

                    </div>


                    <div className="topbar-right">

                        <button className="icon-button">
                            🔔
                        </button>

                        <div className="top-avatar">

                            {user.name
                                ? user.name
                                    .charAt(0)
                                    .toUpperCase()
                                : 'U'}

                        </div>

                    </div>

                </header>


                <section className="dashboard">

                    {activePage ===
                        'settings' && (

                            <SettingsView
                                user={user}
                                onLogout={
                                    handleLogout
                                }
                            />

                        )}


                    {activePage ===
                        'calendar' && (

                            <CalendarView
                                tasks={tasks}
                            />

                        )}


                    {activePage ===
                        'analytics' && (

                            <AnalyticsView
                                tasks={tasks}
                            />

                        )}


                    {activePage !==
                        'calendar' &&
                        activePage !==
                        'analytics' &&
                        activePage !==
                        'settings' && (

                            <>

                                <div className="welcome-section">

                                    <div>

                                        <h1>
                                            Hellooo!!,{' '}
                                            {user.name} 👋
                                        </h1>

                                        <p>
                                            Here's an
                                            overview of
                                            your tasks
                                            for today.
                                        </p>

                                    </div>

                                </div>


                                <div className="stats-grid">

                                    <div className="stat-card">

                                        <div className="stat-icon blue">
                                            📋
                                        </div>

                                        <div>

                                            <span>
                                                Total Tasks
                                            </span>

                                            <h2>
                                                {totalTasks}
                                            </h2>

                                        </div>

                                    </div>


                                    <div className="stat-card">

                                        <div className="stat-icon orange">
                                            ◷
                                        </div>

                                        <div>

                                            <span>
                                                In Progress
                                            </span>

                                            <h2>
                                                {activeTasks}
                                            </h2>

                                        </div>

                                    </div>


                                    <div className="stat-card">

                                        <div className="stat-icon green">
                                            ✓
                                        </div>

                                        <div>

                                            <span>
                                                Completed
                                            </span>

                                            <h2>
                                                {completedTasks}
                                            </h2>

                                        </div>

                                    </div>


                                    <div className="stat-card">

                                        <div className="stat-icon red">
                                            !
                                        </div>

                                        <div>

                                            <span>
                                                Overdue
                                            </span>

                                            <h2>
                                                {overdueTasks}
                                            </h2>

                                        </div>

                                    </div>

                                </div>


                                <section className="tasks-section">

                                    <div className="section-header">

                                        <div>

                                            <h2>
                                                My Tasks
                                            </h2>

                                            <p>
                                                Manage your
                                                tasks and
                                                stay
                                                productive.
                                            </p>

                                        </div>

                                    </div>


                                    <div className="add-task-card">

                                        <TaskForm
                                            onSubmit={
                                                addTask
                                            }
                                        />

                                    </div>


                                    <div className="task-toolbar">

                                        <div className="search-box">

                                            <span>
                                                ⌕
                                            </span>

                                            <input
                                                type="text"
                                                placeholder="Search tasks..."
                                                value={
                                                    searchTerm
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    setSearchTerm(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>


                                        <div className="filter-buttons">

                                            <button
                                                className={
                                                    filter ===
                                                        'all'
                                                        ? 'filter-btn active'
                                                        : 'filter-btn'
                                                }
                                                onClick={() =>
                                                    setFilter(
                                                        'all'
                                                    )
                                                }
                                            >
                                                All
                                            </button>


                                            <button
                                                className={
                                                    filter ===
                                                        'active'
                                                        ? 'filter-btn active'
                                                        : 'filter-btn'
                                                }
                                                onClick={() =>
                                                    setFilter(
                                                        'active'
                                                    )
                                                }
                                            >
                                                Active
                                            </button>


                                            <button
                                                className={
                                                    filter ===
                                                        'completed'
                                                        ? 'filter-btn active'
                                                        : 'filter-btn'
                                                }
                                                onClick={() =>
                                                    setFilter(
                                                        'completed'
                                                    )
                                                }
                                            >
                                                Completed
                                            </button>

                                        </div>

                                    </div>


                                    <TaskList
                                        tasks={
                                            filteredTasks
                                        }
                                        onToggle={
                                            toggleComplete
                                        }
                                        onDelete={
                                            deleteTask
                                        }
                                        onEdit={
                                            editTask
                                        }
                                    />

                                </section>

                            </>

                        )}

                </section>

            </main>

        </div>
    );
}

export default App;