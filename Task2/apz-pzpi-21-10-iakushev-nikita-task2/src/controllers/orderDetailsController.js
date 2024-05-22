const OrderDetails = require('../models/OrderDetails');
const Product = require('../models/Product');
const Discount = require('../models/Discount');

exports.getOrderDetailsByOrderId = async (req, res) => {
    const { id } = req.params;

    try {
        const orderDetails = await OrderDetails.findAll({
            where: {
                order_id: id
            }
        });

        res.status(200).json(orderDetails);
    } catch (error) {
        console.error('Error getting order details:', error);
        res.status(500).json({ message: 'Failed to get order details', error: error.message });
    }
};

exports.createOrderDetails = async (req, res) => {
    const { order_id, product_id, quantity } = req.body;

    try {
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient quantity in stock' });
        }

        const orderDetails = await OrderDetails.create({
            order_id,
            product_id,
            quantity
        });

        product.quantity -= quantity;
        await product.save();

        res.status(201).json(orderDetails);
    } catch (error) {
        console.error('Error creating order details:', error);
        res.status(500).json({ message: 'Failed to create order details', error: error.message });
    }
};

exports.getOrderTotalAmount = async (req, res) => {
    const { id } = req.params;
    const acceptLanguage = req.headers['accept-language'];

    try {
        const orderDetails = await OrderDetails.findAll({
            where: {
                order_id: id
            }
        });

        let totalAmount = 0;

        for (const detail of orderDetails) {
            const product = await Product.findByPk(detail.product_id);
            if (product) {
                let price = product.price_usd;
                if (detail.discount_id) {
                    const discount = await Discount.findByPk(detail.discount_id);
                    if (discount) {
                        price *= (1 - discount.percent / 100);
                    }
                }
                totalAmount += detail.quantity * price;
            }
        }

        if (acceptLanguage === 'ua') {
            totalAmount *= 40;
        }

        res.status(200).json({ totalAmount });
    } catch (error) {
        console.error('Error calculating order total amount:', error);
        res.status(500).json({ message: 'Failed to calculate order total amount', error: error.message });
    }
};


exports.applyDiscountToOrderDetails = async (req, res) => {
    const { discount_id, id } = req.params;

    try {
        const discount = await Discount.findByPk(discount_id);
        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        if (discount.is_used) {
            return res.status(400).json({ message: 'Discount has already been used' });
        }

        const orderDetail = await OrderDetails.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ message: 'Order detail not found' });
        }

        orderDetail.discount_id = discount_id;
        await orderDetail.save();

        discount.is_used = true;
        await discount.save();

        res.status(200).json({ message: 'Discount applied to order detail successfully' });
    } catch (error) {
        console.error('Error applying discount to order detail:', error);
        res.status(500).json({ message: 'Failed to apply discount to order detail', error: error.message });
    }
};

