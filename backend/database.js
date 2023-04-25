const mysql = require("mysql");

const HOST_NAME = "localhost";
const USER_NAME = "root";
const PASSWORD = "";
const DB_NAME = "simple-book-web";

// Set up the database needed for the application
const db = mysql.createConnection({
    host: HOST_NAME,
    user: USER_NAME,
    password: PASSWORD,
    database: DB_NAME,
});

db.connect((error) => {
    if (error) {
        const connectionErrMsg = `Error occured when attempting to connect to ${DB_NAME} database. \n`;
        console.log(connectionErrMsg + error);
    } else {
        const connectionSuccessMsg = `Successfully establish connection to ${DB_NAME} database.`;
        console.log(connectionSuccessMsg);
    }
});


module.exports = db;
