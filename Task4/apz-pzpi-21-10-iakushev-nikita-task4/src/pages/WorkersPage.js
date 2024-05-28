// components/WorkersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/WorkersPage.css';

const WorkersPage = () => {
    const [workers, setWorkers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mallId, setMallId] = useState();
    const [storeNames, setStoreNames] = useState({});
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;
    const storageUrl = process.env.REACT_APP_BLOB_STORAGE_URL;
    const containerName = process.env.REACT_APP_CONTAINER_NAME;
    
    useEffect(() => {
        const fetchMallId = async () => {
            try {
                const adminId = localStorage.getItem('id');
                const response = await axios.get(`${apiUrl}/admin/${adminId}`);
                setMallId(response.data.mall_id);
            } catch (error) {
                console.error('Error fetching mallId:', error);
            }
        };

        const fetchWorkers = async () => {
            if (mallId) {
                try {
                    const response = await axios.get(`${apiUrl}/worker/mall/${mallId}`);
                    setWorkers(response.data);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching workers:', error);
                    setIsLoading(false);
                }
            }
        };

        fetchMallId();
        fetchWorkers();
    }, [mallId]);

    useEffect(() => {
        const fetchStoreNames = async () => {
            const storeIds = [...new Set(workers.map(worker => worker.store_id))];
            const storeNamesTemp = {};

            for (const storeId of storeIds) {
                try {
                    const response = await axios.get(`${apiUrl}/store/${storeId}`);
                    storeNamesTemp[storeId] = response.data.name;
                } catch (error) {
                    console.error(`Error fetching store name for storeId ${storeId}:`, error);
                }
            }

            setStoreNames(storeNamesTemp);
        };

        if (workers.length > 0) {
            fetchStoreNames();
        }
    }, [workers]);

    const handleWorkerClick = (id) => {
        navigate(`/shifts/${id}`);
    };

    const handleAddWorkerClick = () => {
        navigate('/worker/create');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="workers-page">
            <h1>Workers</h1>
            <button className="add-worker-button" onClick={handleAddWorkerClick}>Add Worker</button>
            <div className="workers-list">
                {workers.map(worker => (
                    <div key={worker.id} className="worker-card" onClick={() => handleWorkerClick(worker.id)}>
                        {worker.photo && <img src={`${storageUrl}/${containerName}/${worker.photo}`} alt={`${worker.name} ${worker.lastname}`} className="worker-photo" />}
                        <div className="worker-details">
                            <p><strong>ID:</strong> {worker.id}</p>
                            <p><strong>Name:</strong> {worker.name}</p>
                            <p><strong>Lastname:</strong> {worker.lastname}</p>
                            <p><strong>Email:</strong> {worker.email}</p>
                            <p><strong>Phone Number:</strong> {worker.phone_number}</p>
                            <p><strong>Registration Date:</strong> {new Date(worker.registration_date).toLocaleDateString()}</p>
                            <p><strong>Store:</strong> {storeNames[worker.store_id] || 'Loading...'}</p>
                            <p><strong>Wage per hour (USD):</strong> {worker.wage_per_hour_USD}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkersPage;
