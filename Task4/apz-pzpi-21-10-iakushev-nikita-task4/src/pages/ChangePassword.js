import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ChangePassword.css';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleSave = async () => {
        if (!newPassword || !confirmPassword) {
            alert('Fill in all the blanks');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${apiUrl}/savePassword`, {
                password: newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(response.data.message);
            navigate('/profile');
        } catch (error) {
            console.error('Error changing password:', error);
            const message = error.response?.data?.message || 'Error during password change';
            alert(message);
        }
    };

    return (
        <div className="change-password-page">
            <h1>Change Password</h1>
            <label htmlFor="newPassword">New Password:</label>
            <input
                type="password"
                id="newPassword"
                required={true}
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
            />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
                type="password"
                id="confirmPassword"
                required={true}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
            />
            <div className="button-container">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => navigate('/profile')}>Back</button>
            </div>
        </div>
    );
};

export default ChangePassword;
