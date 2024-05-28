// MallChainPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink} from 'react-router-dom';
import '../styles/MallChainPage.css';

const MallChainPage = () => {
    const [mallChains, setMallChains] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchMallChains = async () => {
            try {
                const response = await axios.get(`${apiUrl}/mallChain`);
                setMallChains(response.data);
            } catch (error) {
                console.error('Error fetching mall chains:', error);
            }
        };
        fetchMallChains();
    }, []);

    return (
        <div className="mall-chain-page">
            <h1>Mall Chains</h1>
            <div className="mall-chains">
                {mallChains.map(mallChain => (
                    <NavLink key={mallChain.id} to={`/mallChain/${mallChain.id}`} className="mall-chain">
                        {mallChain.name}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default MallChainPage;
