const router = require('express').Router();
const bookingcontroller = require('../controllers/bookingcontroller');
const authenticateToken = require('../middelwares/middleware');


router.get('/', authenticateToken, bookingcontroller.getAllBookings);
router.post('/book-car', authenticateToken, bookingcontroller.bookCar);
router.put('/update-booking', authenticateToken, bookingcontroller.updateBooking);
router.delete('/delete-booking', authenticateToken, bookingcontroller.deleteBooking);
module.exports = router;