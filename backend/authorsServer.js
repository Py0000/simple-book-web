const express = require("express");
const authorRouter = express.Router();
const commands = require('./commandLogic');

const AUTHORS_DB_TABLE_NAME = "authors";

const getQuery = "SELECT * FROM authors";
commands.getAllEntries(AUTHORS_DB_TABLE_NAME, getQuery, authorRouter);

const addQuery = "INSERT INTO authors (name, biography) VALUES (?)";
commands.addEntry(AUTHORS_DB_TABLE_NAME, addQuery, authorRouter);

const deleteQuery = "DELETE FROM authors WHERE id = ?";
commands.deleteEntry(AUTHORS_DB_TABLE_NAME, deleteQuery, authorRouter);

const updateQuery = "UPDATE authors SET name = ?, biography = ? WHERE id = ?";
commands.updateEntry(AUTHORS_DB_TABLE_NAME, updateQuery, authorRouter);
    
module.exports = authorRouter;