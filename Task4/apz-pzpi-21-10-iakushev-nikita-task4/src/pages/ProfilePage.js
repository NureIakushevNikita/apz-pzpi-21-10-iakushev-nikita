import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProfilePage.css';
import { useNavigate, NavLink } from 'react-router-dom';

const ProfilePage = () => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        phone_number: ''
    });

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${apiUrl}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
                setFormData({
                    name: response.data.name,
                    lastname: response.data.lastname,
                    phone_number: response.data.phone_number
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${apiUrl}/saveProfile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserData(response.data);
            setIsEditing(false);
            alert("Profile saved succesfully!");
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData({
            name: userData.name,
            lastname: userData.lastname,
            phone_number: userData.phone_number
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-details">
                    <h1>Your profile</h1>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <p>Email: {userData.email}</p>
                            {isEditing ? (
                                <>
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="lastname">Lastname:</label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="phone_number">Phone number:</label>
                                    <input
                                        type="text"
                                        id="phone_number"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                    />
                                </>
                            ) : (
                                <>
                                    <p>Name: {userData.name}</p>
                                    <p>Lastname: {userData.lastname}</p>
                                    <p>Phone number: {userData.phone_number}</p>
                                </>
                            )}
                            <div className="button-container">
                                {isEditing ? (
                                    <>
                                        <button onClick={handleSaveClick}>Save</button>
                                        <button onClick={handleCancelClick}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={handleEditClick}>Edit</button>
                                        <button onClick={() => navigate('/changePassword')}>Change password</button>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <div className="profile-actions">
                    <NavLink to="/myOrders" className="action-button">My Orders</NavLink>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
