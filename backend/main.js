
const BACKEND_PORT_NUM = 9000;
const BOOKS_DB_TABLE = "/books";
const AUTHORS_DB_TABLE = "/authors";
const TABLE_ELEMENT_INDICATOR = "/:id";


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
app.get("/", (request, response) => {
    const backendConnectedMsg = "Backend Server reached";
    response.json(backendConnectedMsg);
});


// Retrieving all books from database
app.get(BOOKS_DB_TABLE, (request, response) => {
    const query = "SELECT * FROM books";

    db.query(query, (error, data) => {
        if (error) {
            const retrieveBooksErrMsg = "Error retrieving all books. \n";
            return response.json(retrieveBooksErrMsg);
        } 

        return response.json(data);
    });
});


// Adding new book to database
app.post(BOOKS_DB_TABLE, (request, response) => {
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
            return response.json(addBooksErrMsg)
        } 

        const addBooksSuccessMsg = "Successfully added book.";
        return response.json(addBooksSuccessMsg);
    });
});


// Deleting books from database
app.delete(BOOKS_DB_TABLE + TABLE_ELEMENT_INDICATOR, (request, response) => {
    const id = request.params.id;
    const query = "DELETE FROM books WHERE id = ?";
    
    db.query(query, [id], (error, data) => {
        if (error) {
            const deleteBooksErrMsg = "Error deleting book data. \n";
            return response.json(deleteBooksErrMsg);
        } 

        const deleteBooksSuccessMsg = "Successfully deleted book.";
        return response.json(deleteBooksSuccessMsg);
    });
});


// Updating book data in database
app.put(BOOKS_DB_TABLE + TABLE_ELEMENT_INDICATOR, (request, response) => {
    const id = request.params.id;
    const query = "UPDATE books SET `title` = ?, `publisher` = ?, `year` = ?, `authorId` = ? WHERE id = ?";

    const updatedData = [
        request.body.title, 
        request.body.publisher, 
        request.body.year, 
        request.body.authorId
    ];

    db.query(query, [...updatedData, id], (error, data) => {
        if (error) {
            const updateBooksErrMsg = "Error updating book data. \n";
            return response.json(updateBooksErrMsg);
        } 

        const updateBooksSuccessMsg = "Successfully updated book.";
        return response.json(updateBooksSuccessMsg);
    })
});


// Retrieving all authors from database
app.get(AUTHORS_DB_TABLE, (request, response) => {
    const query = "SELECT * FROM authors";

    db.query(query, (error, data) => {
        if (error) {
            const retrieveAuthorsErrMsg = "Error retrieving all authors. \n";
            return response.json(retrieveAuthorsErrMsg);
        } 

        return response.json(data);
    });
});


// Adding new author to database
// Configuration of database: Cannot add author with exact same names.
// Hence, names of authors should be unique.
// If user tries to add another author with names that already exist in table, no changes will be shown.
app.post(AUTHORS_DB_TABLE, (request, response) => {
    const query = "INSERT INTO authors (`name`, `biography`) VALUES (?)";

    const authorInfo = [
        request.body.name, 
        request.body.biography
    ];

    db.query(query, [authorInfo], (error, data) => {
        if (error) {
            const addAuthorsErrMsg = "Error adding author data. \n";
            return response.json(addAuthorsErrMsg)
        } 

        const addAuthorsSuccessMsg = "Successfully added author.";
        return response.json(addAuthorsSuccessMsg);
    })
});

// Deleting authors from database
app.delete(AUTHORS_DB_TABLE + TABLE_ELEMENT_INDICATOR, (request, response) => {
    const id = request.params.id;
    const query = "DELETE FROM authors WHERE id = ?";
    
    db.query(query, [id], (error, data) => {
        if (error) {
            const deleteAuthorsErrMsg = "Error deleting author data. \n";
            return response.json(deleteAuthorsErrMsg);
        } 

        const deleteAuthorsSuccessMsg = "Successfully deleted author.";
        return response.json(deleteAuthorsSuccessMsg);
    });
});


// Updating author data in database
app.put(AUTHORS_DB_TABLE + TABLE_ELEMENT_INDICATOR, (request, response) => {
    const id = request.params.id;
    const query = "UPDATE authors SET `name` = ?, `biography` = ? WHERE id = ?";

    const updatedData = [
        request.body.name, 
        request.body.biography
    ];

    db.query(query, [...updatedData, id], (error, data) => {
        if (error) {
            const updateAuthorsErrMsg = "Error updating author data. \n";
            return response.json(updateAuthorsErrMsg);
        } 

        const updateAuthorsSuccessMsg = "Successfully updated author.";
        return response.json(updateAuthorsSuccessMsg);
    })
});