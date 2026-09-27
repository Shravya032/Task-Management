const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


// REGISTER
exports.register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message:
                    'Name, email and password are required'
            });
        }

        const existingUser =
            await User.findOne({
                email
            });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message:
                'Registration successful'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// LOGIN
exports.login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message:
                    'Email and password are required'
            });
        }

        const user =
            await User.findOne({
                email
            });

        if (!user) {
            return res.status(401).json({
                message:
                    'Invalid email or password'
            });
        }

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatch) {
            return res.status(401).json({
                message:
                    'Invalid email or password'
            });
        }

        const token =
            jwt.sign(
                {
                    userId: user._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '7d'
                }
            );

        res.status(200).json({
            message:
                'Login successful',

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// CHANGE PASSWORD
exports.changePassword = async (
    req,
    res
) => {

    try {

        const {
            currentPassword,
            newPassword
        } = req.body;


        if (
            !currentPassword ||
            !newPassword
        ) {
            return res.status(400).json({
                message:
                    'Current password and new password are required'
            });
        }


        if (newPassword.length < 6) {
            return res.status(400).json({
                message:
                    'New password must be at least 6 characters'
            });
        }


        const user =
            await User.findById(
                req.userId
            );


        if (!user) {
            return res.status(404).json({
                message:
                    'User not found'
            });
        }


        const passwordMatch =
            await bcrypt.compare(
                currentPassword,
                user.password
            );


        if (!passwordMatch) {
            return res.status(401).json({
                message:
                    'Current password is incorrect'
            });
        }


        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );


        user.password =
            hashedPassword;


        await user.save();


        res.status(200).json({
            message:
                'Password changed successfully'
        });


    } catch (error) {

        console.error(
            'Change password error:',
            error
        );

        res.status(500).json({
            message:
                error.message
        });
    }
};
// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: 'Email is required'
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        // Don't reveal whether an account exists
        if (!user) {
            return res.status(200).json({
                message:
                    'If an account exists with this email, a password reset link will be sent.'
            });
        }

        const resetToken =
            crypto.randomBytes(32).toString('hex');

        const hashedToken =
            crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');

        user.resetPasswordToken =
            hashedToken;

        user.resetPasswordExpires =
            Date.now() + 15 * 60 * 1000;

        await user.save();

        /*
         * TEMPORARY DEVELOPMENT MODE
         *
         * Later we will send this token
         * through email.
         */

        res.status(200).json({
            message:
                'Password reset token generated.',
            resetToken
        });

    } catch (error) {
        console.error(
            'Forgot password error:',
            error
        );

        res.status(500).json({
            message: error.message
        });
    }
};
// RESET PASSWORD
exports.resetPassword = async (req, res) => {
    try {
        const {
            token,
            newPassword
        } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                message:
                    'Token and new password are required'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message:
                    'New password must be at least 6 characters'
            });
        }

        const hashedToken =
            crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');

        const user =
            await User.findOne({
                resetPasswordToken:
                    hashedToken,

                resetPasswordExpires: {
                    $gt: Date.now()
                }
            });

        if (!user) {
            return res.status(400).json({
                message:
                    'Invalid or expired reset token'
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        user.password =
            hashedPassword;

        user.resetPasswordToken =
            null;

        user.resetPasswordExpires =
            null;

        await user.save();

        res.status(200).json({
            message:
                'Password reset successfully'
        });

    } catch (error) {
        console.error(
            'Reset password error:',
            error
        );

        res.status(500).json({
            message: error.message
        });
    }
};