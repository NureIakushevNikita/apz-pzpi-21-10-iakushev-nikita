import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import '../styles/MallsPage.css';

const MallsPage = () => {
    const { id } = useParams();
    const [mallChain, setMallChain] = useState({});
    const [malls, setMalls] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchMallChain = async () => {
            try {
                const response = await axios.get(`${apiUrl}/mallChain/${id}`);
                setMallChain(response.data);
            } catch (error) {
                console.error('Error fetching mall chain:', error);
            }
        };

        const fetchMallsByChainId = async () => {
            try {
                const response = await axios.get(`${apiUrl}/mall/mallChain/${id}`);
                setMalls(response.data);
            } catch (error) {
                console.error('Error fetching malls by chain id:', error);
            }
        };

        fetchMallChain();
        fetchMallsByChainId();
    }, [id]);

    return (
        <div className="malls-page">
            <h1>{mallChain.name}</h1>
            {malls.length === 0 ? (
                <div className="mall-item">
                    <h3>No malls found for this mall chain.</h3>
                </div>
            ) : (
                <div className="malls-list">
                    {malls.map(mall => (
                        <NavLink key={mall.id}  to={`/mall/${mall.id}`} className="mall-item">
                            <h2>City: {mall.city}</h2>
                            <p>Address: {mall.address}</p>
                            <p>Contact phone number: {mall.phone_number}</p>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MallsPage;
