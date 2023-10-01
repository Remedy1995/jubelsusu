const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const DepositController = require('../Controllers/DepositController');
const Validator = require('../middleware/Validators');
const MomoController = require('../Controllers/MomoController');

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());


router.post('/deposit', Validator.DepositValidator, DepositController);
router.post('/momo',MomoController.PayWithMomo);
router.post('/otp',Validator.OtpValidator,MomoController.SubmitOtp);
router.post('/verification',Validator.VerificationValidator,MomoController.Verification);

module.exports = router;