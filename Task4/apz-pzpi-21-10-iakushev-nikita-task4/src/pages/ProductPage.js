import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const productWithNum = { ...product, num: 1 };

        cart.push(productWithNum);

        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Product added to cart!');
    };

    return (
        <div className="product-page">
            <div className="product-photo">
                <img src={`https://mallmanagementstorageacc.blob.core.windows.net/images/${product.photo}`} alt={product.name} />
            </div>
            <div className="product-details">
                <h1>{product.name}</h1>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Description: {product.description}</p>
                <button onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    );
};

export default ProductPage;
