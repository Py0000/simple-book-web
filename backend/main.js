const BACKEND_PORT_NUM = 9000;
const MAIN_SERVER = "/";
const BOOKS_DB_TABLE = "/books";
const AUTHORS_DB_TABLE = "/authors";

// Main backend server
const express = require("express");
const app = express();

// Setup backend server
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Connect to backend server
app.get(MAIN_SERVER, (request, response) => {
    const backendConnectedMsg = "Backend Server reached";
    response.json(backendConnectedMsg);
});

// Listen on port number 9000
app.listen(BACKEND_PORT_NUM, () => {
    const listenPortSuccessMsg = `Backend setup, running on port ${BACKEND_PORT_NUM}`;
    console.log(listenPortSuccessMsg);
});

// Handles interaction with books database table
const booksServer = require("./booksServer");
app.use(BOOKS_DB_TABLE, booksServer);

// Handles interaction with authors database table
const authorsServer = require("./authorsServer");
app.use(AUTHORS_DB_TABLE, authorsServer);