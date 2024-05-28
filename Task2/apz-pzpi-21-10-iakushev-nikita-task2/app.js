const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes/index')

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);
app.use('/test', routes);
app.use('/registration', routes);
app.use('/login', routes);
app.use('/profile', routes);
app.use('/user', routes);
app.use('/user/:id', routes);
app.use('/users/export', routes);
app.use('/saveProfile', routes);
app.use('/savePassword', routes);
app.use('/mallChain', routes);
app.use('/mallChain/:id', routes);
app.use('/mall', routes);
app.use('/mall/:id', routes);
app.use('/mall/mallChain/:mallChainId', routes);
app.use('/store', routes);
app.use('/store/:id', routes);
app.use('/store/mall/:mallId', routes);
app.use('/product', routes);
app.use('/product/:id', routes);
app.use('/product/store/:storeId', routes);
app.use('/order', routes);
app.use('/order/:id', routes);
app.use('/order/user/:id', routes);
app.use('/orderDetails', routes);
app.use('/orderDetails/order/:id', routes);
app.use('/discount/:userId', routes);
app.use('/orderDetails/getSum/:id', routes);
app.use('/applyDiscount/:discount_id/:id', routes);
app.use('/attendance', routes);
app.use('/attendance/store/:storeId/date/:date', routes)
app.use('/attendance/store/:storeId/range/:dateFrom/:dateTo', routes);
app.use('/attendanceCount/store/:storeId/date/:date', routes)
app.use('/attendanceCount/store/:storeId/range/:dateFrom/:dateTo', routes);
app.use('/attendanceAnalyze/store/:storeId', routes);
app.use('/attendanceDailyCount/store/:storeId/range/:dateFrom/:dateTo', routes)
app.use('/worker', routes);
app.use('/worker/profile', routes);
app.use('/worker/store/:storeId', routes);
app.use('/worker/count/:storeId', routes);
app.use('/worker/mall/:mallId', routes);
app.use('/admin', routes);
app.use('/admin/:adminId', routes);
app.use('/shift', routes);
app.use('/generateShifts/:workerId', routes);
app.use('/workersBy/store/:storeId/date/:date', routes);
app.use('/countWorkersBy/store/:storeId/date/:date', routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
