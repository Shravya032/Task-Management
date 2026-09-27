import React, { useState } from 'react';
import axios from 'axios';

function Register({ onShowLogin }) {

    const [name, setName] =
        useState('');

    const [email, setEmail] =
        useState('');

    const [password, setPassword] =
        useState('');

    const [showPassword, setShowPassword] =
        useState(false);

    const [error, setError] =
        useState('');

    const [success, setSuccess] =
        useState('');


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError('');
        setSuccess('');


        if (password.length < 6) {

            setError(
                'Password must be at least 6 characters'
            );

            return;
        }


        try {

            await axios.post(
                'http://localhost:5000/api/auth/register',
                {
                    name,
                    email,
                    password
                }
            );


            setSuccess(
                'Account created successfully!'
            );


            setName('');
            setEmail('');
            setPassword('');


        } catch (error) {

            setError(
                error.response?.data?.message ||
                'Registration failed'
            );

        }

    };


    return (
        <div className="auth-page">

            <div className="auth-container">

                {/* LEFT SIDE */}

                <div className="auth-brand-panel">

                    <div className="auth-brand">

                        <div className="auth-brand-icon">
                            ✓
                        </div>

                        <span>
                            TaskFlow
                        </span>

                    </div>


                    <div className="auth-brand-content">

                        <h2>
                            Start getting things
                            <br />
                            done.
                        </h2>

                        <p>
                            Create your personal workspace
                            and take control of your tasks
                            and productivity.
                        </p>


                        <div className="auth-stat-card">

                            <div className="auth-stat-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    Your productivity,
                                    your way.
                                </strong>

                                <span>
                                    Plan, prioritize and
                                    complete.
                                </span>
                            </div>

                        </div>

                    </div>


                    <div className="auth-brand-footer">
                        Simple. Focused. Productive.
                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="auth-form-panel">

                    <div className="auth-form-content">

                        <div className="mobile-auth-logo">
                            ✓
                        </div>


                        <h1>
                            Create your account
                        </h1>

                        <p className="auth-form-subtitle">
                            Set up your TaskFlow workspace
                            in a few seconds.
                        </p>


                        {error && (

                            <div className="auth-error">

                                <span>!</span>

                                {error}

                            </div>

                        )}


                        {success && (

                            <div className="auth-success">

                                <span>✓</span>

                                {success}

                            </div>

                        )}


                        <form
                            onSubmit={handleSubmit}
                            className="modern-auth-form"
                        >

                            <div className="modern-field">

                                <label>
                                    Full name
                                </label>

                                <div className="input-with-icon">

                                    <span>
                                        ◯
                                    </span>

                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                            </div>


                            <div className="modern-field">

                                <label>
                                    Email address
                                </label>

                                <div className="input-with-icon">

                                    <span>
                                        @
                                    </span>

                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                            </div>


                            <div className="modern-field">

                                <label>
                                    Password
                                </label>

                                <div className="input-with-icon">

                                    <span>
                                        •••
                                    </span>

                                    <input
                                        type={
                                            showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        placeholder="At least 6 characters"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >
                                        {showPassword
                                            ? 'Hide'
                                            : 'Show'}
                                    </button>

                                </div>

                                <small className="field-help">
                                    Use at least 6 characters.
                                </small>

                            </div>


                            <button
                                type="submit"
                                className="modern-auth-button"
                            >
                                Create Account
                                <span>→</span>
                            </button>

                        </form>


                        <div className="auth-divider">
                            <span>
                                Already have an account?
                            </span>
                        </div>


                        <button
                            className="create-account-button"
                            onClick={onShowLogin}
                        >
                            Sign in instead
                        </button>


                        <p className="auth-bottom-text">
                            Your password is securely
                            encrypted before being stored.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;