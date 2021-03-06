/**
 * Create an Express application server and connect to MongoDB Atlas remote database (DB-as-a-Service). Use middleware layer to route to paths.
 */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import routes
const usersRoute = require('./controllers/userApi');
const modulesRoute = require('./controllers/modulesApi');

dotenv.config({path: __dirname + `/config/.env`});

//DB Connect
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => console.log("Connected to Database")
);

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Route middleware urls
app.use('/api/users', usersRoute);
app.use('/api/modules', modulesRoute);

const port = process.env.PORT
app.listen(port, () => {
    console.log("Server running...attempting to connect to database");
});