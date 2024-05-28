import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {NavLink, useParams} from 'react-router-dom';
import "../styles/StorePage.css";

const StorePage = () => {
    const { id } = useParams();
    const [mall, setMall] = useState({});
    const [mallChain, setMallChain] = useState({});
    const [stores, setStores] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mallResponse = await axios.get(`${apiUrl}/mall/${id}`);
                setMall(mallResponse.data);

                const mallChainResponse = await axios.get(`${apiUrl}/mallChain/${mall.mall_chain_id}`);
                setMallChain(mallChainResponse.data);

                const storesResponse = await axios.get(`${apiUrl}/store/mall/${id}`);
                setStores(storesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, mall.mall_chain_id]);

    const formatTime = (timeString) => {
        const date = new Date(timeString).toISOString().slice(11, 16);
        return `${date}`;
    };

    return (
        <div className="store-page">
            <h1 className="mall-name">{mallChain.name}, {mall.city}, {mall.address}</h1>
            <div className="stores-list">
                {stores.map(store => (
                    <NavLink key={store.id} className="store-item" to={`/store/${store.id}`}>
                        <h2>{store.name}</h2>
                        <p>Type: {store.type}</p>
                        <p>Floor: {store.floor}</p>
                        <p>Open: {formatTime(store.time_open)}</p>
                        <p>Close: {formatTime(store.time_close)}</p>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default StorePage;
