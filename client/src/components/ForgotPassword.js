import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword({
    onShowLogin,
    onResetPassword
}) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [resetToken, setResetToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        try {
            const response = await axios.post(
                '${API_BASE}/auth/forgot-password',
                {
                    email
                }
            );

            setSuccess(response.data.message);

            // Temporary development mode.
            // Later this token will come through email.
            if (response.data.resetToken) {
                setResetToken(
                    response.data.resetToken
                );
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Something went wrong'
            );
        }
    };

    const handleContinue = () => {
        if (!resetToken) {
            return;
        }

        onResetPassword(
            resetToken
        );
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    ✓
                </div>

                <h1>
                    Forgot Password?
                </h1>

                <p className="auth-subtitle">
                    Enter your email to reset your password.
                </p>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="auth-success">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Send Reset Request
                    </button>

                </form>

                {resetToken && (
                    <div className="reset-token-box">

                        <strong>
                            Development Reset Token
                        </strong>

                        <p>
                            This is temporary. In production,
                            this token will be sent by email.
                        </p>

                        <textarea
                            value={resetToken}
                            readOnly
                        />

                        <button
                            className="auth-button"
                            onClick={handleContinue}
                        >
                            Continue to Reset Password
                        </button>

                    </div>
                )}

                <p className="auth-switch">

                    Remember your password?

                    <button
                        onClick={onShowLogin}
                    >
                        Login
                    </button>

                </p>

            </div>

        </div>
    );
}

export default ForgotPassword;