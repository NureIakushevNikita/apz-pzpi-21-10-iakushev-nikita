import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/CartItem.css';

const CartItem = ({ id, name, price, photo, num, onRemove, onUpdateQuantity }) => {
    const [itemQuantity, setItemQuantity] = useState(1);

    const storageUrl = process.env.REACT_APP_BLOB_STORAGE_URL;
    const containerName = process.env.REACT_APP_CONTAINER_NAME;

    const handleIncrement = () => {
        setItemQuantity(prevQuantity => Math.max(prevQuantity + 1, 1));
        onUpdateQuantity(id, itemQuantity + 1);
    };

    const handleDecrement = () => {
        setItemQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
        onUpdateQuantity(id, itemQuantity - 1);
    };

    return (
        <div className="cart-item">
            <div className="item-details">
                <img src={`${storageUrl}/${containerName}/${photo}`} alt={name} />
                <div>
                    <h3>{name}</h3>
                    <p>Price: ${price}</p>
                    <p>Quantity: {itemQuantity}</p>
                </div>
            </div>
            <div className="item-actions">
                <button onClick={handleIncrement}>+</button>
                <button onClick={handleDecrement}>-</button>
                <button onClick={() => onRemove(id)}>Remove</button>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
};

export default CartItem;
