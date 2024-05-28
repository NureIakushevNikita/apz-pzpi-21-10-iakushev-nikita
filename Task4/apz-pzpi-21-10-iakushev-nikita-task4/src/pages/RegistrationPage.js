import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/registration`, {
                email: email,
                password: password,
            });
            alert("Registration successful!");
            navigate('/login/user');
        } catch (error) {
            console.error('Error during registration:', error);
            const message = error.response?.data?.message || "Error during registration";
            alert(message);
        }
    };

    return (
        <div className="login-page">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    id="password"
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <input
                    type="password"
                    id="confirmPassword"
                    required={true}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationPage;
