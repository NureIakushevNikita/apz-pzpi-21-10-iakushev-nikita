import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BlobServiceClient } from "@azure/storage-blob";
import '../styles/CreateWorkerPage.css';

const CreateWorkerPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [photo, setPhoto] = useState('');
    const [file, setFile] = useState(null);
    const [storeId, setStoreId] = useState('');
    const [wagePerHour, setWagePerHour] = useState('');
    const [wageCurrency, setWageCurrency] = useState('USD');
    const [stores, setStores] = useState([]);
    const [schedule, setSchedule] = useState('');
    const navigate = useNavigate();

    const STORAGE_ACCOUNT_CONN_STR = process.env.REACT_APP_STORAGE_ACCOUNT_CONN_STR;
    const containerName = process.env.REACT_APP_CONTAINER_NAME;
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const adminId = localStorage.getItem('id');
                const mallResponse = await axios.get(`${apiUrl}/admin/${adminId}`);
                const mallId = mallResponse.data.mall_id;

                const storesResponse = await axios.get(`${apiUrl}/store/mall/${mallId}`);
                setStores(storesResponse.data);
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        };

        fetchStores();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file.name);
            setFile(file);
        }
    };

    async function uploadImage(containerName, file) {
        try{
            const blobServiceClient = new BlobServiceClient(STORAGE_ACCOUNT_CONN_STR);
            const containerClient = blobServiceClient.getContainerClient(containerName);
            const blobClient = containerClient.getBlobClient(file.name);
            const blockBlobClient = blobClient.getBlockBlobClient();
            const result = await blockBlobClient.uploadBrowserData(file, {
                blockSize: 4 * 1024 * 1024,
                concurrency: 20,
                onProgress: ev => console.log(ev)
            });
            console.log(`Upload of file '${file.name}' completed`);
        }
        catch (error){
            console.log("Error uploading image to storage:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newWorker = {
                email,
                password,
                name,
                lastname,
                phone_number: phoneNumber,
                photo,
                store_id: storeId,
                wage_per_hour: wagePerHour,
                wage_currency: wageCurrency,
            };

            const response = await axios.post(`${apiUrl}/worker`, newWorker);
            console.log(response.data);
            await axios.post(`${apiUrl}/shift`, {
                worker_id: response.data.id,
                schedule: schedule
            })

            await uploadImage(containerName, file);

            alert("Worker created successfully!");
            navigate('/workers');
        } catch (error) {
            console.error('Error creating worker:', error);
        }
    };

    return (
        <div className="create-worker-page">
            <h1>Create Worker</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Lastname:</label>
                    <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Photo:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                    <label>Store:</label>
                    <select value={storeId} onChange={(e) => setStoreId(e.target.value)} required>
                        <option value="">Select a store</option>
                        {stores.map((store) => (
                            <option key={store.id} value={store.id}>{store.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Schedule:</label>
                    <input type="number" value={schedule} onChange={(e) => setSchedule(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Wage per Hour:</label>
                    <input type="number" value={wagePerHour} onChange={(e) => setWagePerHour(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Currency:</label>
                    <select value={wageCurrency} onChange={(e) => setWageCurrency(e.target.value)} required>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                    </select>
                </div>
                <button type="submit" className="create-worker-submit" >Create Worker</button>
            </form>
        </div>
    );
};

export default CreateWorkerPage;
