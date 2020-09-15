const express = require('express');
const router = express.Router();

router.use('/staticData', require('./staticData.js'))
router.use('/users', require('./users.js'))
router.use('/postBlood', require('./postBlood.js'))

module.exports = router;