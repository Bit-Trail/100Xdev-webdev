const router = require('express').Router();
const bookingcontroller = require('../controllers/bookingcontroller');

router.get('/', bookingcontroller.getAllBookings);
router.post('/book-car', bookingcontroller.bookCar);
router.put('/update-booking', bookingcontroller.updateBooking);
router.delete('/delete-booking', bookingcontroller.deleteBooking);
module.exports = router;