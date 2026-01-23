const router = require('express').Router();
const authcontroller = require('../controllers/authcontroller');

router.post('/login', authcontroller.login);
router.post('/signup', authcontroller.signup);
module.exports = router;