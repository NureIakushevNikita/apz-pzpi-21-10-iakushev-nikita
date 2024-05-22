const db = require('../utils/db')

exports.getRecord = async (req, res) => {
    try{
        await db.connectDb();

        const records = await db.executeQuery('SELECT * FROM SalesLT.Customer');

        res.json(records);
    }
    catch (error){
        res.status(500).json({message: 'Помилка при отриманні користувачів', error: error.message });
    }
};