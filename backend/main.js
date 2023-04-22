
const BACKEND_PORT_NUM = 9000;

const MAIN_BACKEND_TAG = "/";
const LIST_TAG = "/books";


// Creates the main app
const express = require("express");
const app = express();

// Set up the app
app.use(express.json());

const cors = require("cors");
app.use(cors());

// Listen to a port number
app.listen(BACKEND_PORT_NUM, () => {
    // Confirmation log message
    const listenPortSuccessMsg = `Backend setup, running on port ${BACKEND_PORT_NUM}`;
    console.log(listenPortSuccessMsg);
});


// Create and setup database
const db = require("./database");


// Reaching the backend server via API request (using express)
app.get(MAIN_BACKEND_TAG, (request, response) => {
    response.json("Backend Server reached");
});


// Retrieving all books from database
app.get(LIST_TAG, (request, response) => {
    const query = "SELECT * FROM books";

    db.query(query, (error, data) => {
        if (error) {
            const retrieveBooksErrMsg = "Error retrieving all books. \n";
            return response.json(retrieveBooksErrMsg + error);
        } 

        return response.json(data);
    });
});


// Adding new book to database
app.post("/books", (request, response) => {
    const query = "INSERT INTO books (`title`, `publisher`, `year`, `authorId`) VALUES (?)";

    const bookInfo = [
        request.body.title, 
        request.body.publisher, 
        request.body.year, 
        request.body.authorId
    ];

    db.query(query, [bookInfo], (error, data) => {
        if (error) {
            const addBooksErrMsg = "Error adding book data. \n";
            return response.json(addBooksErrMsg + error)
        } 

        const addBooksSuccessMsg = "Successfully added book.";
        return response.json(addBooksSuccessMsg);
    })
});
