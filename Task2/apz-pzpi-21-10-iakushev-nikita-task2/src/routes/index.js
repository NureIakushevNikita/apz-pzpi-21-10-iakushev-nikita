const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexController')
const testController = require('../controllers/testController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const mallChainController = require('../controllers/mallChainController')
const mallController = require('../controllers/mallController')
const storeController = require('../controllers/storeController')
const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')
const orderDetailsController = require('../controllers/orderDetailsController')
const discountController = require('../controllers/discountController')
const attendanceController = require('../controllers/attendanceController')
const workerController = require('../controllers/workerController')
const adminController = require("../controllers/adminController")
const shiftController = require('../controllers/shiftController')

router.get('/', indexController.getUniversities);
router.get('/test', testController.getRecord);

router.get('/profile', userController.getUserFromToken);
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.post('/registration', authController.registerUser);
router.post('/login', authController.loginUser);
router.put('/saveProfile', userController.updateProfile);
router.put('/savePassword', userController.changePassword);
router.get('/users/export', userController.exportAllUsersToExcel);

router.get('/mallChain', mallChainController.getAllMallChains);
router.post('/mallChain', mallChainController.addMallChain);
router.get('/mallChain/:id', mallChainController.getMallChainById);
router.put('/mallChain/:id', mallChainController.updateMallChain);
router.delete('/mallChain/:id', mallChainController.deleteMallChain);

router.post('/mall', mallController.addMall);
router.get('/mall/:id', mallController.getMallById);
router.get('/mall', mallController.getAllMalls);
router.put('/mall/:id', mallController.updateMall);
router.delete('/mall/:id', mallController.deleteMall);
router.get('/mall/mallChain/:mallChainId', mallController.getMallsByChainId);

router.post('/store', storeController.createStore);
router.get('/store', storeController.getAllStores);
router.get('/store/:id', storeController.getStoreById);
router.get('/store/mall/:mallId', storeController.getStoresByMallId);
router.put('/store/:id', storeController.updateStore);
router.delete('/store/:id', storeController.deleteStore);

router.post('/product', productController.addProduct);
router.get('/product', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.get('/product/store/:storeId', productController.getProductsByStoreId);
router.put('/product/:id', productController.editProduct);
router.delete('/product/:id', productController.deleteProduct);

router.post('/order', orderController.createOrder);
router.get('/order', orderController.getAllOrders);
router.get('/order/:id', orderController.getOrderById);
router.get('/order/user/:id', orderController.getOrdersByUserId);
router.put('/order/:id', orderController.updateOrderState);

router.post('/orderDetails', orderDetailsController.createOrderDetails);
router.get('/orderDetails/order/:id', orderDetailsController.getOrderDetailsByOrderId);
router.get('/orderDetails/getSum/:id', orderDetailsController.getOrderTotalAmount);
router.post('/applyDiscount/:discount_id/:id', orderDetailsController.applyDiscountToOrderDetails);

router.post('/discount/:userId', discountController.generateDiscount);
router.get('/discount/:userId', discountController.getUnusedDiscountsByUserId);

router.post('/attendance', attendanceController.createAttendance);
router.get('/attendance/store/:storeId/date/:date', attendanceController.getAttendancesByDateAndStore);
router.get('/attendance/store/:storeId/range/:dateFrom/:dateTo', attendanceController.getAttendancesByDateRangeAndStore);
router.get('/attendanceCount/store/:storeId/date/:date', attendanceController.countVisitsInStoreByDate);
router.get('/attendanceCount/store/:storeId/range/:dateFrom/:dateTo', attendanceController.countVisitsInStoreByRange);
router.get('/attendanceAnalyze/store/:storeId', attendanceController.analyzeAttendance);
router.get('/attendanceDailyCount/store/:storeId/range/:dateFrom/:dateTo', attendanceController.getDailyVisitsByStoreInRange)

router.post('/worker', workerController.createWorker);
router.get('/worker/profile', workerController.getWorkerProfileFromToken);
router.get('/worker/store/:storeId', workerController.getWorkersByStoreId);
router.get('/worker/mall/:mallId', workerController.getWorkersByMallId);
router.get('/worker/count/:storeId', workerController.countWorkersByStoreId);

router.post('/admin', adminController.createAdmin);
router.get('/admin/:adminId', adminController.getMallIdByAdminId);


router.post('/shift', shiftController.createShift);
router.post('/generateShifts/:workerId', shiftController.generateWorkerSchedule);
router.get('/workersBy/store/:storeId/date/:date', shiftController.getWorkersInStoreByDate);
router.get('/countWorkersBy/store/:storeId/date/:date', shiftController.getWorkerCountInStoreByDate);
router.get('/shift/:workerId', shiftController.getShiftsByWorkerId);
router.get('/futureShift/:workerId', shiftController.getFutureShiftsByWorkerId);






module.exports = router