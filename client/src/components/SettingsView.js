import React, { useState } from 'react';
import axios from 'axios';

function SettingsView({
    user,
    onLogout
}) {

    const [showPasswordForm, setShowPasswordForm] =
        useState(false);

    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [currentPassword, setCurrentPassword] =
        useState('');

    const [newPassword, setNewPassword] =
        useState('');

    const [confirmPassword, setConfirmPassword] =
        useState('');

    const [message, setMessage] =
        useState('');

    const [error, setError] =
        useState('');


    const handleChangePassword = async (e) => {

        e.preventDefault();

        setMessage('');
        setError('');


        if (
            newPassword !==
            confirmPassword
        ) {
            setError(
                'New passwords do not match.'
            );

            return;
        }


        if (newPassword.length < 6) {

            setError(
                'New password must be at least 6 characters.'
            );

            return;
        }


        try {

            const token =
                localStorage.getItem(
                    'token'
                );


            const response =
                await axios.put(
                    '${API_BASE}/auth/change-password',
                    {
                        currentPassword,
                        newPassword
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            setMessage(
                response.data.message
            );


            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            setShowPasswordForm(false);


        } catch (error) {

            setError(
                error.response?.data?.message ||
                'Failed to change password.'
            );

        }
    };


    const cancelPasswordChange = () => {

        setShowPasswordForm(false);

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        setError('');
        setMessage('');

    };


    return (
        <section className="settings-section">

            <div className="settings-header">

                <div>

                    <span className="settings-eyebrow">
                        ACCOUNT SETTINGS
                    </span>

                    <h1>
                        Settings
                    </h1>

                    <p>
                        Manage your profile and account
                        preferences.
                    </p>

                </div>

            </div>


            {/* PROFILE */}

            <div className="settings-card profile-settings-card">

                <div className="settings-card-title">

                    <div className="settings-title-icon profile-icon">
                        ◯
                    </div>

                    <div>

                        <h2>
                            Profile
                        </h2>

                        <p>
                            Your personal account information
                        </p>

                    </div>

                </div>


                <div className="settings-profile">

                    <div className="settings-profile-avatar">

                        {user?.name
                            ? user.name
                                .charAt(0)
                                .toUpperCase()
                            : 'U'}

                    </div>


                    <div className="settings-profile-info">

                        <h3>
                            {user?.name || 'User'}
                        </h3>

                        <p>
                            {user?.email ||
                                'No email available'}
                        </p>

                    </div>

                </div>


                <div className="settings-info-grid">

                    <div className="settings-info-item">

                        <span>
                            FULL NAME
                        </span>

                        <strong>
                            {user?.name ||
                                'Not available'}
                        </strong>

                    </div>


                    <div className="settings-info-item">

                        <span>
                            EMAIL ADDRESS
                        </span>

                        <strong>
                            {user?.email ||
                                'Not available'}
                        </strong>

                    </div>

                </div>

            </div>


            {/* SECURITY */}

            <div className="settings-card security-settings-card">

                <div className="settings-card-title">

                    <div className="settings-title-icon security-icon">
                        🔒
                    </div>

                    <div>

                        <h2>
                            Security
                        </h2>

                        <p>
                            Keep your account protected
                        </p>

                    </div>

                </div>


                {message && (

                    <div className="settings-message success">

                        <span>✓</span>

                        {message}

                    </div>

                )}


                {error && (

                    <div className="settings-message error">

                        <span>!</span>

                        {error}

                    </div>

                )}


                {!showPasswordForm ? (

                    <div className="password-summary">

                        <div className="password-summary-left">

                            <div className="password-shield">
                                •••
                            </div>

                            <div>

                                <h3>
                                    Password
                                </h3>

                                <p>
                                    Change your password
                                    regularly to keep your
                                    account secure.
                                </p>

                                <span className="password-status">
                                    ● Password protected
                                </span>

                            </div>

                        </div>


                        <button
                            className="change-password-button"
                            onClick={() =>
                                setShowPasswordForm(
                                    true
                                )
                            }
                        >
                            Change Password
                            <span>
                                →
                            </span>
                        </button>

                    </div>

                ) : (

                    <div className="password-editor">

                        <div className="password-editor-heading">

                            <h3>
                                Change your password
                            </h3>

                            <p>
                                Enter your current password
                                and choose a new one.
                            </p>

                        </div>


                        <form
                            onSubmit={
                                handleChangePassword
                            }
                        >

                            <div className="settings-password-field">

                                <label>
                                    Current password
                                </label>

                                <div className="settings-password-input">

                                    <input
                                        type={
                                            showCurrentPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={
                                            currentPassword
                                        }
                                        onChange={(e) =>
                                            setCurrentPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter your current password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCurrentPassword(
                                                !showCurrentPassword
                                            )
                                        }
                                    >
                                        {showCurrentPassword
                                            ? 'Hide'
                                            : 'Show'}
                                    </button>

                                </div>

                            </div>


                            <div className="settings-password-field">

                                <label>
                                    New password
                                </label>

                                <div className="settings-password-input">

                                    <input
                                        type={
                                            showNewPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={
                                            newPassword
                                        }
                                        onChange={(e) =>
                                            setNewPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter a new password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowNewPassword(
                                                !showNewPassword
                                            )
                                        }
                                    >
                                        {showNewPassword
                                            ? 'Hide'
                                            : 'Show'}
                                    </button>

                                </div>

                                <small>
                                    Minimum 6 characters.
                                </small>

                            </div>


                            <div className="settings-password-field">

                                <label>
                                    Confirm new password
                                </label>

                                <div className="settings-password-input">

                                    <input
                                        type={
                                            showConfirmPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={
                                            confirmPassword
                                        }
                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Confirm your new password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                    >
                                        {showConfirmPassword
                                            ? 'Hide'
                                            : 'Show'}
                                    </button>

                                </div>

                            </div>


                            <div className="password-editor-actions">

                                <button
                                    type="button"
                                    className="password-cancel-button"
                                    onClick={
                                        cancelPasswordChange
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="password-save-button"
                                >
                                    Update Password
                                    <span>✓</span>
                                </button>

                            </div>

                        </form>

                    </div>

                )}

            </div>


            {/* ACCOUNT */}

            <div className="settings-card account-settings-card">

                <div className="settings-card-title">

                    <div className="settings-title-icon account-icon">
                        ⇥
                    </div>

                    <div>

                        <h2>
                            Account
                        </h2>

                        <p>
                            Manage your current session
                        </p>

                    </div>

                </div>


                <div className="account-action-row">

                    <div>

                        <strong>
                            Sign out of TaskFlow
                        </strong>

                        <p>
                            You'll need to sign in again
                            to access your tasks.
                        </p>

                    </div>


                    <button
                        className="settings-logout-btn"
                        onClick={onLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </section>
    );
}

export default SettingsView;