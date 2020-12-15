/**
 * Create an Express application server and connect to MongoDB Atlas remote database (DB-as-a-Service). Use middleware layer to route to paths.
 */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import routes
const usersRoute = require('./routes/users');

dotenv.config();

//DB Connect
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to Database")
);

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Route middlewares
app.use('/api/users', usersRoute);

const port = process.env.PORT
app.listen(port, () => {
    console.log("Server running");
});