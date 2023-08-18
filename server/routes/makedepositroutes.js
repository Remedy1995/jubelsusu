const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const DepositController = require('../Controllers/DepositController');
const DepositorValidator = require('../middleware/Validators');
router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());


router.post('/deposit', DepositorValidator, DepositController);

module.exports = router;