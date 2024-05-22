const Product = require('../models/Product');

const dollarRate = 40;

exports.addProduct = async (req, res) => {
    const { name, store_id, price_usd, quantity, photo, description_ua, description_en } = req.body;

    try {
        const newProduct = await Product.create({
            name,
            store_id,
            price_usd,
            quantity,
            photo,
            description_ua,
            description_en
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Failed to add product', error: error.message });
    }
};

exports.editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, store_id, price_usd, quantity, photo, description_ua, description_en } = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name || product.name;
        product.store_id = store_id || product.store_id;
        product.price_usd = price_usd || product.price_usd;
        product.quantity = quantity || product.quantity;
        product.photo = photo || product.photo;
        product.description_ua = description_ua || product.description_ua;
        product.description_en = description_en || product.description_en;

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        console.error('Error editing product:', error);
        res.status(500).json({ message: 'Failed to edit product', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();

        res.status(204).end();
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        let language = req.headers['accept-language'] || 'en';
        const products = await Product.findAll();

        const formattedProducts = products.map(product => {
            let price = language === 'ua' ? product.price_usd * dollarRate : product.price_usd;
            const description = language === 'ua' ? product.description_ua : product.description_en;
            return {
                id: product.id,
                name: product.name,
                price,
                quantity: product.quantity,
                photo: product.photo,
                description
            };
        });

        res.status(200).json(formattedProducts);
    } catch (error) {
        console.error('Error getting all products:', error);
        res.status(500).json({ message: 'Failed to get all products', error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        let language = req.headers['accept-language'] || 'en';
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let price = language === 'ua' ? product.price_usd * dollarRate : product.price_usd;
        const description = language === 'ua' ? product.description_ua : product.description_en;
        const formattedProduct = {
            id: product.id,
            name: product.name,
            price,
            quantity: product.quantity,
            photo: product.photo,
            description
        };

        res.status(200).json(formattedProduct);
    } catch (error) {
        console.error('Error getting product by id:', error);
        res.status(500).json({ message: 'Failed to get product by id', error: error.message });
    }
};

exports.getProductsByStoreId = async (req, res) => {
    const { storeId } = req.params;

    try {
        let language = req.headers['accept-language'] || 'en';
        const products = await Product.findAll({
            where: {
                store_id: storeId
            }
        });

        const formattedProducts = products.map(product => {
            let price = language === 'ua' ? product.price_usd * dollarRate : product.price_usd;
            const description = language === 'ua' ? product.description_ua : product.description_en;
            return {
                id: product.id,
                name: product.name,
                price,
                quantity: product.quantity,
                photo: product.photo,
                description
            };
        });

        res.status(200).json(formattedProducts);
    } catch (error) {
        console.error('Error getting products by store id:', error);
        res.status(500).json({ message: 'Failed to get products by store id', error: error.message });
    }
};

// function fetchDollarInfo() {
//     setGlobalDispatcher(new Agent({ connect: { timeout: 60_000 } }) )
//
//     try {
//         const response = fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/dollar_info?json');
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

