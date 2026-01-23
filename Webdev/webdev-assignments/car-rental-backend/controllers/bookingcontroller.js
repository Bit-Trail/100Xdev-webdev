const pool = require("../db/dbconfig");

function getAllBookings(req, res) {
    pool.query('SELECT * FROM "user".bookings', (error, results) => {
        if (error) {
            res.status(500).send('Error retrieving bookings');
        } else {
            res.status(200).send(results.rows);
        }
    });
}

function bookCar(req, res) {
    req = { id : req.id, user_id: req.user_id, car_name: req.car_name, rent_er_day: req.rent_er_day, status: req.status, created_at: req.created_at };
    pool.query('INSERT INTO "user".bookings (id, user_id, car_name, rent_er_day, status, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
    [req.id, req.user_id, req.car_name, req.rent_er_day, req.status, req.created_at], (error, results) => {
        if (error) {
            res.status(500).send('Error booking the car');
        } else {
            res.status(201).send('Car booked successfully');
        }
    });
}

function updateBooking(req, res) {
  res.send('Booking updated successfully');
}

function deleteBooking(req, res) {
  res.send('Booking deleted successfully');
}

module.exports = {
  getAllBookings,
  bookCar,
  updateBooking,
  deleteBooking
};