const Discount = require('../models/Discount');
const Order = require('../models/Order');
const OrderDetails = require('../models/OrderDetails');
const Product = require('../models/Product');

exports.generateDiscount = async (req, res) => {
    const { userId } = req.params;

    try {
        const existingDiscount = await Discount.findOne({
            where: {
                user_id: userId,
                is_used: 0,
            }
        });

        if (existingDiscount) {
            return res.status(200).json({ message: `User with id ${userId} already has an unused discount` });
        }

        const orders = await Order.findAll({
            where: {
                user_id: userId,
            }
        });

        let totalAmount = 0;

        // Перебираем все заказы пользователя
        for (const order of orders) {
            // Получаем детали заказа
            const orderDetails = await OrderDetails.findAll({
                where: {
                    order_id: order.id,
                }
            });

            // Считаем общую сумму заказа, учитывая цены товаров
            for (const detail of orderDetails) {
                // Получаем цену товара по его айди
                const product = await Product.findByPk(detail.product_id);
                if (product) {
                    totalAmount += product.price_usd * detail.quantity;
                }
            }
        }

        if (totalAmount > 100) {
            await Discount.create({
                user_id: userId,
                percent: 10,
            });
            res.status(201).json({ message: `Discount generated for user with id ${userId}` });
        } else {
            res.status(200).json({ message: `No discount generated for user with id ${userId}` });
        }
    } catch (error) {
        console.error('Error generating discount:', error);
        res.status(500).json({ message: 'Failed to generate discount', error: error.message });
    }
};

exports.getUnusedDiscountsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const unusedDiscounts = await Discount.findAll({
            where: {
                user_id: userId,
                is_used: 0,
            }
        });

        res.status(200).json(unusedDiscounts);
    } catch (error) {
        console.error('Error getting unused discounts:', error);
        res.status(500).json({ message: 'Failed to get unused discounts', error: error.message });
    }
};