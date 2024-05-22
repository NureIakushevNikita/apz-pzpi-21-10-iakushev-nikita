const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error getting all orders:', error);
        res.status(500).json({ message: 'Failed to get all orders', error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error getting order by id:', error);
        res.status(500).json({ message: 'Failed to get order by id', error: error.message });
    }
};

exports.getOrdersByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const orders = await Order.findAll({
            where: {
                user_id: id
            }
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error getting orders by user id:', error);
        res.status(500).json({ message: 'Failed to get orders by user id', error: error.message });
    }
};


exports.createOrder = async (req, res) => {
    const { user_id, address, order_type } = req.body;
    try {
        const newOrder = await Order.create({ user_id, address, order_type });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};

exports.updateOrderState = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.order_state = 'Done';
        await order.save();

        res.status(200).json({ message: 'Order state updated successfully' });
    } catch (error) {
        console.error('Error updating order state:', error);
        res.status(500).json({ message: 'Failed to update order state', error: error.message });
    }
};

