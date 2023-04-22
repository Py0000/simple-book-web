const mysql = require("mysql");

const hostName = "127.0.0.1";
const userName = "root";
const password = "";
const databaseName = "simple-book-web";
const databasePort = 3306

const connectionErrorMessage = `Error occured when attempting to connect to ${databaseName} database.`;
const connectionSuccessMessage = `Successfully establish connection to ${databaseName} database.`;

// Set up the database needed for the application
const db = mysql.createConnection({
    host: hostName,
    user: userName,
    password: password,
    database: databaseName,
    port: databasePort
});

db.connect((error) => {
    if (error) {
        console.log(connectionErrorMessage + error);
    } else {
        console.log(connectionSuccessMessage);
    }
});


module.exports = db;
