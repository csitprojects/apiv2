
const express = require("express");
const router = express.Router();
const purchaseList = require('../controllers/payments/purchasesController');
const buyTest = require('../controllers/payments/buyTestController');

router.get('/students/:studentId/purchases', purchaseList);
router.post('/students/:studentId/purchases/:mockTestId/buy', buyTest);


module.exports = router;