
const portNumber = 9000;
const setupPortMessage = `Backend setup, running on port ${portNumber}`;

const main_backend_server_tag = "/";


// Creates the main app
const express = require("express");
const app = express();

// Set up the app
app.use(express.json());

const cors = require("cors");
app.use(cors());

// Listen to a port number
app.listen(portNumber, () => {
    // Confirmation log message
    console.log(setupPortMessage);
})


// Create and setup database
const database = require("./database");


// Reaching the backend server via API request (using express)
app.get(main_backend_server_tag, (request, response) => {
    response.json("Backend Server reached");
});


