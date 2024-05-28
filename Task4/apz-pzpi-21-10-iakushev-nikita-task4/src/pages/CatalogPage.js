import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {NavLink, useParams} from 'react-router-dom';
import '../styles/CatalogPage.css';

const CatalogPage = () => {
    const { id } = useParams();
    const [store, setStore] = useState({});
    const [products, setProducts] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;
    const storageUrl = process.env.REACT_APP_BLOB_STORAGE_URL;
    const containerName = process.env.REACT_APP_CONTAINER_NAME;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storeResponse = await axios.get(`${apiUrl}/store/${id}`);
                setStore(storeResponse.data);

                const productsResponse = await axios.get(`${apiUrl}/product/store/${id}`);
                setProducts(productsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="catalog-page">
            <h1 className="store-name">{store.name}</h1>
            <div className="products-grid">
                {products.map(product => (
                    <NavLink key={product.id} className="product-item" to={`/product/${product.id}`}>
                        <img src={`${storageUrl}/${containerName}/${product.photo}`} alt={product.name} className="product-photo" />
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-price">${product.price}</p>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default CatalogPage;
