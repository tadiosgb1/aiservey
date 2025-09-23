const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create user
router.post('/', userController.createUser);

// Get user + referrals + allocated months
router.get('/:id', userController.getUserWithReferralsAndMonths);

// Generic PATCH to update any field
router.patch('/:id', userController.updateUser);

module.exports = router;
