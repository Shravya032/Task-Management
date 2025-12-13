import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css'; // Assuming default styling

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
    const [tasks, setTasks] = useState([]);

    // READ: Fetch all tasks on load
    useEffect(() => {
        axios.get(API_URL)
            .then(response => setTasks(response.data))
            .catch(error => console.error('Fetch error:', error));
    }, []);

    // CREATE: Add a new task
    const addTask = async (description) => {
        try {
            const response = await axios.post(API_URL, { description });
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Create error:', error);
        }
    };

    // UPDATE: Toggle completion status
    const toggleComplete = async (id, currentCompleted) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, { completed: !currentCompleted });
            setTasks(tasks.map(task => 
                task._id === id ? response.data : task
            ));
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    // DELETE: Remove a task
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <div className="App" style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h1>MongoDB Task App</h1>
            <TaskForm onSubmit={addTask} />
            <TaskList 
                tasks={tasks} 
                onToggle={toggleComplete} 
                onDelete={deleteTask} 
            />
        </div>
    );
}

export default App;