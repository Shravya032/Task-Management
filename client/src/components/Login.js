import React, { useState } from 'react';
import axios from 'axios';

const API_BASE =
    process.env.REACT_APP_API_BASE_URL ||
    'http://localhost:5000/api';

function Login({
    onLogin,
    onShowRegister,
    onShowForgotPassword
}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] =
        useState(false);

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        try {
            const response = await axios.post(
                `${API_BASE}/auth/login`,
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                'token',
                response.data.token
            );

            localStorage.setItem(
                'user',
                JSON.stringify(
                    response.data.user
                )
            );

            onLogin(response.data.user);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Invalid email or password'
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
                            Organize your work.
                            <br />
                            Achieve more.
                        </h2>

                        <p>
                            Manage your tasks, track your
                            progress and stay productive
                            with TaskFlow.
                        </p>

                        <div className="auth-features">

                            <div className="auth-feature">
                                <span>✓</span>
                                <p>
                                    Keep all your tasks organized
                                </p>
                            </div>

                            <div className="auth-feature">
                                <span>✓</span>
                                <p>
                                    Track deadlines and priorities
                                </p>
                            </div>

                            <div className="auth-feature">
                                <span>✓</span>
                                <p>
                                    Monitor your productivity
                                </p>
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
                            Welcome back
                        </h1>

                        <p className="auth-form-subtitle">
                            Sign in to continue to your
                            TaskFlow workspace.
                        </p>


                        {error && (
                            <div className="auth-error">
                                <span>!</span>
                                {error}
                            </div>
                        )}


                        <form
                            onSubmit={handleSubmit}
                            className="modern-auth-form"
                        >

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

                                <div className="field-label-row">

                                    <label>
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="forgot-link"
                                        onClick={
                                            onShowForgotPassword
                                        }
                                    >
                                        Forgot password?
                                    </button>

                                </div>


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
                                        placeholder="Enter your password"
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

                            </div>


                            <button
                                type="submit"
                                className="modern-auth-button"
                            >
                                Sign In
                                <span>→</span>
                            </button>

                        </form>


                        <div className="auth-divider">
                            <span>
                                New to TaskFlow?
                            </span>
                        </div>


                        <button
                            className="create-account-button"
                            onClick={
                                onShowRegister
                            }
                        >
                            Create an account
                        </button>


                        <p className="auth-bottom-text">
                            By continuing, you agree to
                            use TaskFlow responsibly.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;