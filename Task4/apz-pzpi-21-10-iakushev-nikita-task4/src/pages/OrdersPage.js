import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/OrdersPage.css';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersResponse = await axios.get(`${apiUrl}/order`);
                const ordersData = ordersResponse.data;

                const ordersWithUserDetails = await Promise.all(
                    ordersData.map(async (order) => {
                        const userResponse = await axios.get(`${apiUrl}/user/${order.user_id}`);
                        const userData = userResponse.data;
                        return {
                            ...order,
                            user: userData,
                            newState: order.order_state
                        };
                    })
                );

                setOrders(ordersWithUserDetails);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleStateChange = (id, newState) => {
        setOrders(orders.map(order => order.id === id ? { ...order, newState } : order));
    };

    const handleSaveClick = async (id) => {
        try {
            const order = orders.find(order => order.id === id);
            if (order) {
                await axios.put(`${apiUrl}/order/${id}`, { order_state: order.newState });
                alert(`Order ${id} state updated successfully`);
            }
        } catch (error) {
            console.error('Error updating order state:', error);
            alert('Failed to update order state');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="orders-page">
            <h1>All Orders</h1>
            <table className="orders-table">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>User Name</th>
                    <th>User Lastname</th>
                    <th>Phone Number</th>
                    <th>Date</th>
                    <th>Order Type</th>
                    <th>Address</th>
                    <th>Order State</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.user.name}</td>
                        <td>{order.user.lastname}</td>
                        <td>{order.user.phone_number}</td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>{order.order_type}</td>
                        <td>{order.address}</td>
                        <td>
                            <select
                                value={order.newState}
                                onChange={(e) => handleStateChange(order.id, e.target.value)}
                            >
                                <option value="In process">In process</option>
                                <option value="Done">Done</option>
                            </select>
                        </td>
                        <td>
                            <button onClick={() => handleSaveClick(order.id)}>Save</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;
