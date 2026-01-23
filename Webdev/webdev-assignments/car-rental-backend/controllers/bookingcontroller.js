const pool = require("../db/dbconfig");

/**
 * GET all bookings for logged-in user
 */
function getAllBookings(req, res) {
    const userId = req.user.userId;

    pool.query(
        'SELECT * FROM "user".bookings WHERE user_id = $1',
        [userId],
        (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error retrieving bookings');
            }
            res.status(200).json(results.rows);
        }
    );
}

/**
 * CREATE booking
 */
function bookCar(req, res) {
    const userId = req.user.userId; // 🔒 from JWT
    const { id, car_name, rent_er_day, status } = req.body;
    const createdAt = new Date();

    if (!id || !car_name || !rent_er_day || !status) {
        return res.status(400).send('Missing required booking fields');
    }

    const userBooking = [
        id,
        userId,
        car_name,
        rent_er_day,
        status,
        createdAt
    ];

    pool.query(
        'INSERT INTO "user".bookings (id, user_id, car_name, rent_er_day, status, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        userBooking,
        (error) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error booking car');
            }
            res.status(201).send('Car booked successfully');
        }
    );
}

/**
 * UPDATE booking (partial update)
 */
function updateBooking(req, res) {
    const userId = req.user.userId;
    const bookingId = req.body.id;

    if (!bookingId) {
        return res.status(400).send('Booking ID is required');
    }

    const { id, ...fieldsToUpdate } = req.body;

    if (Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).send('No fields provided to update');
    }

    const columns = Object.keys(fieldsToUpdate);
    const values = Object.values(fieldsToUpdate);

    const setClause = columns
        .map((col, index) => `${col} = $${index + 1}`)
        .join(', ');

    values.push(bookingId, userId);

    const query = `
        UPDATE "user".bookings
        SET ${setClause}
        WHERE id = $${values.length - 1}
        AND user_id = $${values.length}
    `;

    pool.query(query, values, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error updating booking');
        }

        if (result.rowCount === 0) {
            return res.status(404).send('Booking not found or unauthorized');
        }

        res.status(200).send('Booking updated successfully');
    });
}

/**
 * DELETE booking
 */
function deleteBooking(req, res) {
    const userId = req.user.userId;
    const bookingId = req.body.id;

    if (!bookingId) {
        return res.status(400).send('Booking ID is required');
    }

    pool.query(
        'DELETE FROM "user".bookings WHERE id = $1 AND user_id = $2',
        [bookingId, userId],
        (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error deleting booking');
            }

            if (result.rowCount === 0) {
                return res.status(404).send('Booking not found or unauthorized');
            }

            res.status(200).send('Booking deleted successfully');
        }
    );
}

module.exports = {
    getAllBookings,
    bookCar,
    updateBooking,
    deleteBooking
};