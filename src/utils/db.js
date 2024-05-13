const { Sequelize } = require('sequelize')

const sequelize =
    new Sequelize(
        'mallManagement',
        'Nick',
        'Geometrydash2144', {
            host: 'mall-management.database.windows.net',
            dialect: 'mssql',
        })

sequelize
    .authenticate()
    .then(() => console.log('Successfully connected to the database!'))
    .catch((error) => console.log('Failed to connect the database:', error))

module.exports = sequelize
// const sql = require('mssql')
//
// const dbConfig = {
//     server: 'mall-management.database.windows.net',
//     database: 'mallManagement',
//     user: 'Nick',
//     password: 'Geometrydash2144',
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//     },
// };
//
// async function connectDb() {
//     try {
//         await sql.connect(dbConfig);
//         console.log('Підключення до БД успішне.');
//     }
//     catch (error){
//         console.log('Помилка при підключенні до БД', error);
//     }
// }
//
// async function executeQuery(query){
//     try{
//         const result = await sql.query(query);
//         return result.recordsets[0][0];
//     }
//     catch (error){
//         console.error('Помилка при виконанні запиту', error);
//         throw error;
//     }
// }
//
// module.exports = {
//     connectDb,
//     executeQuery,
// }