import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WorkerProfilePage.css';

const WorkerProfilePage = () => {
    const [workerData, setWorkerData] = useState({});
    const [storeData, setStoreData] = useState({});
    const [mallData, setMallData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;
    const storageUrl = process.env.REACT_APP_BLOB_STORAGE_URL;
    const containerName = process.env.REACT_APP_CONTAINER_NAME;

    useEffect(() => {
        const fetchWorkerData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${apiUrl}/worker/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setWorkerData(response.data);

                if (response.data.store_id) {
                    const storeResponse = await axios.get(`${apiUrl}/store/${response.data.store_id}`);
                    setStoreData(storeResponse.data);
                    if (storeResponse.data.mall_id) {
                        const mallResponse = await axios.get(`${apiUrl}/mall/${storeResponse.data.mall_id}`);
                        setMallData(mallResponse.data);
                    }
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching worker data:', error);
                setIsLoading(false);
            }
        };
        fetchWorkerData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="worker-profile-page">
            <h1>Worker Profile</h1>
            <div className="worker-profile-container">
                {workerData.photo && <img src={`${storageUrl}/${containerName}/${workerData.photo}`} alt="Worker Photo" className="worker-photo" />}
                <div className="worker-profile-details">
                    <p><strong>Name:</strong> {workerData.name}</p>
                    <p><strong>Lastname:</strong> {workerData.lastname}</p>
                    <p><strong>Phone number:</strong> {workerData.phone_number}</p>
                    <p><strong>Email:</strong> {workerData.email}</p>
                    <p><strong>Wage per hour (USD):</strong> {workerData.wage_per_hour_USD}</p>
                    {storeData && (
                        <p><strong>Place of employment:</strong> {storeData.name}, ${mallData.address}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkerProfilePage;
