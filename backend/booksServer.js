const express = require("express");
const booksRouter = express.Router();
const commands = require('./commandLogic');

const BOOKS_DB_TABLE_NAME = "books";

const getQuery = "SELECT * FROM books";
commands.getAllEntries(BOOKS_DB_TABLE_NAME, getQuery, booksRouter);

const addQuery = "INSERT INTO books (title, publisher, year, authorId) VALUES (?)";
commands.addEntry(BOOKS_DB_TABLE_NAME, addQuery, booksRouter);

const deleteQuery = "DELETE FROM books WHERE id = ?";
commands.deleteEntry(BOOKS_DB_TABLE_NAME, deleteQuery, booksRouter);

const updateQuery = "UPDATE books SET title = ?, publisher = ?, year = ?, authorId = ? WHERE id = ?";
commands.updateEntry(BOOKS_DB_TABLE_NAME, updateQuery, booksRouter);
    
module.exports = booksRouter;