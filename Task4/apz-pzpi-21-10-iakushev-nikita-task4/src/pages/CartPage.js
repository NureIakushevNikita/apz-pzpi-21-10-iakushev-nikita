import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from '../components/CartItem';
import '../styles/CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState('');
    const [orderType, setOrderType] = useState('Shipping');
    const [discounts, setDiscounts] = useState([]);
    const [applyDiscount, setApplyDiscount] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const cartFromLocalStorage = localStorage.getItem('cart');
        if (cartFromLocalStorage) {
            setCartItems(JSON.parse(cartFromLocalStorage));
        }
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${apiUrl}/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setPhoneNumber(response.data.phone_number);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchUserProfile();
    }, []);

    useEffect(() => {
        const fetchStoreAndMall = async () => {
            if (cartItems.length > 0) {
                const storeId = cartItems[0].store_id;
                try {
                    const storeResponse = await axios.get(`${apiUrl}/store/${storeId}`);
                    const mallId = storeResponse.data.mall_id;
                    const mallResponse = await axios.get(`${apiUrl}/mall/${mallId}`);
                    setStoreAddress(`${mallResponse.data.address}, ${storeResponse.data.name}, floor ${storeResponse.data.floor}`);
                } catch (error) {
                    console.error('Error fetching store or mall:', error);
                }
            }
        };
        fetchStoreAndMall();
    }, [cartItems]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cartItems.reduce((acc, item) => acc + item.price * item.num, 0);
            setTotalPrice(total);
        };
        calculateTotalPrice();
    }, [cartItems]);

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const userId = localStorage.getItem('id');
                const response = await axios.get(`${apiUrl}/discount/${userId}`);
                setDiscounts(response.data);

            } catch (error) {
                console.error('Error fetching discounts:', error);
            }
        };
        fetchDiscounts();
    }, [discounts]);

    const removeFromCart = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const updateQuantity = (id, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, num: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const handleOrderTypeChange = (event) => {
        const orderType = event.target.value;
        setOrderType(orderType);
        if (orderType === 'At store') {
            setAddress(storeAddress);
        } else {
            setAddress('');
        }
    };

    const handleOrder = async () => {
        try {
            const user_id = localStorage.getItem('id');
            const newOrder = await axios.post(`${apiUrl}/order`, {
                user_id,
                address,
                order_type: orderType,
            });

            const order_id = newOrder.data.id;

            const orderDetailsPromises = cartItems.map(async item => {
                return axios.post(`${apiUrl}/orderDetails`, {
                    order_id,
                    product_id: item.id,
                    quantity: item.num,
                });
            });

            const orderDetailResponses = await Promise.all(orderDetailsPromises);
            const mostItemsOrderDetail = orderDetailResponses[0].data.id;

            if (applyDiscount) {
                await axios.post(`${apiUrl}/applyDiscount/${discounts[0].id}/${mostItemsOrderDetail}`);
                alert("Discount applied!");
            }

            alert('Order created successfully!');
            localStorage.removeItem('cart');
            setCartItems([]);

            const generateDiscountResponse = await axios.post(`${apiUrl}/discount/${user_id}`);

            console.log(generateDiscountResponse.status);

            if (generateDiscountResponse.status === 201){
                alert("New discount for you generated!");
            }

        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order');
        }
    };

    return (
        <div className="cart-page">
            <div className="cart-items">
                <h2>Your cart</h2>
                {cartItems.length === 0 ? (
                    <div className="empty-cart-message">
                        <h3>Cart is empty</h3>
                    </div>
                ) : (
                    cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            photo={item.photo}
                            num={item.num}
                            onRemove={removeFromCart}
                            onUpdateQuantity={updateQuantity}
                        />
                    ))
                )}
            </div>
            <div className="order-details">
                <h2>Order Details</h2>
                <div className="order-fields">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={address} onChange={e => setAddress(e.target.value)} />
                    <label htmlFor="order-type">Order type:</label>
                    <select id="order-type" name="order-type" value={orderType} onChange={handleOrderTypeChange}>
                        <option value="Shipping">Shipping</option>
                        <option value="At store">At Store</option>
                    </select>
                    <label htmlFor="phone-number">Phone Number:</label>
                    <input type="tel" id="phone-number" name="phone-number" value={phoneNumber} readOnly />
                </div>
                <div className="order-total">
                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                </div>
                <button className="order-button" onClick={handleOrder}>Order</button>
            </div>
            <div className="order-discounts">
                <h2>Discounts</h2>
                {discounts.length === 0 ? (
                    <p>No discounts available</p>
                ) : (
                    <ul>
                        {discounts.map(discount => (
                            <div key={discount.id} className="discount">
                                <p>Percent: {discount.percent}%</p>
                                <h4>Discount {discount.is_used ? 'used' : 'not used'}</h4>
                            </div>
                        ))}
                        <button
                            className={`discount-button ${applyDiscount ? 'active' : ''}`}
                            onClick={() => setApplyDiscount(!applyDiscount)}
                        >
                            Apply
                        </button>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CartPage;
