const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');

// Demandes de cadeaux (avec filtres pays / ville)
router.get('/requests', adminCtrl.getFilteredRequests);

// Enfants (avec filtres pays / ville)
router.get('/children', adminCtrl.getFilteredChildren);

// Changer le statut d'une demande
router.put('/request-status/:id', adminCtrl.updateRequestStatus);

module.exports = router;
