const express = require('express');
const router = express.Router();
const cde = require('../app/controller/cde_controller');

/**
 * cde采集
 */
router.route('/cde').get(cde.start);

module.exports = router;
