const express = require('express');
const router = express.Router();
const { register, login , registerParent } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/register-parent', registerParent);

module.exports = router;
