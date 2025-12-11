const express = require('express');
const router = express.Router();
const giftCtrl = require('../controllers/giftController');

router.get('/', giftCtrl.getAllGifts);
router.post('/request', giftCtrl.createRequest);
router.get('/requests/:userId', giftCtrl.getRequestsByUser);
router.delete('/request/:requestId', giftCtrl.deleteRequest);
router.get('/seed', giftCtrl.seedGifts); // pour remplir la base au début

module.exports = router;
