import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MyOrdersPage.css';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = localStorage.getItem('id');
                const response = await axios.get(`${apiUrl}/order/user/${userId}`);
                const ordersData = response.data;

                const ordersWithTotal = await Promise.all(
                    ordersData.map(async (order) => {
                        const totalResponse = await axios.get(`${apiUrl}/orderDetails/getSum/${order.id}`);
                        return {
                            ...order,
                            totalAmount: totalResponse.data.totalAmount,
                        };
                    })
                );

                setOrders(ordersWithTotal);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="my-orders-page">
            <h1>My Orders</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Order Type</th>
                        <th>Address</th>
                        <th>State</th>
                        <th>Total Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{new Date(order.date).toLocaleDateString('')}</td>
                            <td>{order.order_type}</td>
                            <td>{order.address}</td>
                            <td>{order.order_state}</td>
                            <td>${order.totalAmount.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyOrdersPage;
