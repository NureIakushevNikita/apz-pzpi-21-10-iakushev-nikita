import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';

const LoginPageWorker = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/login`, {
                email: email,
                password: password,
                role: 'worker'
            });
            const { token, id, role } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
            localStorage.setItem('role', role);
            alert("Login successful!");
            navigate('/');
        } catch (error) {
            console.error('Error during login:', error);
            const message = error.response?.data?.message || "Error during login";
            alert(message);
        }
    };

    return (
        <div className="login-page">
            <h2>Log in</h2>
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
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

export default LoginPageWorker;
