import express from "express";
import mysql from "mysql";
import cors from "cors";


// Creates the main app
const app = express();

// Set up the app
app.use(express.json());
app.use(cors());

// Listen to a port number
app.listen(9000, () => {
    // Confirmation log message
    console.log("Backend setup")
})

// Set up the database needed for the application
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "mysqlRoot2103",
    database:"simple-book-web"
});


// Reaching the backend server via API request (using express)
const main_backend_server_tag = "/";
app.get(main_backend_server_tag, (request, response) => {
    response.json("Backend Server reached");
});


