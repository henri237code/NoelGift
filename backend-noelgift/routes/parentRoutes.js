const express = require('express');
const router = express.Router();
const parentCtrl = require('../controllers/parentController');


router.post('/add-child', parentCtrl.addChild);

router.get('/children/:parentId', parentCtrl.getChildren);

router.get('/requests/:parentId', parentCtrl.getRequestsForChildren);

module.exports = router;
