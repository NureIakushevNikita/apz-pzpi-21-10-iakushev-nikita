import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserPage.css';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${apiUrl}/user`);
                setUsers(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleExport = () => {
        window.location.href = `${apiUrl}/users/export`;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-users-page">
            <h1>All Users</h1>
            <button className="export-button" onClick={handleExport}>
                <img src='/resources/excel.png' alt="Excel Icon" />
                Export
            </button>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Registration Date</th>
                        <th>Phone Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.lastname}</td>
                            <td>{new Date(user.registration_date).toLocaleDateString()}</td>
                            <td>{user.phone_number}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserPage;
