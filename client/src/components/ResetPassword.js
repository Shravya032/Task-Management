import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword({
    token,
    onShowLogin
}) {
    const [newPassword, setNewPassword] =
        useState('');

    const [confirmPassword, setConfirmPassword] =
        useState('');

    const [error, setError] =
        useState('');

    const [success, setSuccess] =
        useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        if (
            newPassword !==
            confirmPassword
        ) {
            setError(
                'Passwords do not match'
            );

            return;
        }

        if (newPassword.length < 6) {
            setError(
                'Password must be at least 6 characters'
            );

            return;
        }

        try {
            const response =
                await axios.post(
                    'https://task-management-eta-pied.vercel.app/api/auth/reset-password',
                    {
                        token,
                        newPassword
                    }
                );

            setSuccess(
                response.data.message
            );

            setNewPassword('');
            setConfirmPassword('');

        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Password reset failed'
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    ✓
                </div>

                <h1>
                    Reset Password
                </h1>

                <p className="auth-subtitle">
                    Create a new password for your account.
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
                        New Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(
                                e.target.value
                            )
                        }
                        required
                    />

                    <label>
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                        required
                    />

                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Reset Password
                    </button>

                </form>

                {success && (
                    <button
                        className="reset-login-button"
                        onClick={onShowLogin}
                    >
                        Go to Login
                    </button>
                )}

            </div>

        </div>
    );
}

export default ResetPassword;