const express = require('express');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

const authRouter = require('./routes/authrouter');
const bookingRouter = require('./routes/bookingrouter');
app.use(express.json());

app.use('/auth', authRouter);
app.use('/booking', bookingRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});