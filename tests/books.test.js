const mysql = require('mysql');

describe("Database Tests", () => {

    let connection;

    beforeEach(() => {
        let createTable = "CREATE TABLE `simple-book-web`.`testbooks` ( `id` INT NOT NULL AUTO_INCREMENT, `title` VARCHAR(45) NOT NULL, `publisher` VARCHAR(45) NOT NULL, `year` INT NOT NULL, `authorId` VARCHAR(45) NOT NULL, PRIMARY KEY (`id`))";
        
        connection = mysql.createConnection({
            host: HOST_NAME,
            user: USER_NAME,
            password: PASSWORD,
            database: DB_NAME,
            port: DB_PORT
        });

        console.log("Connected to database");

        connection.query(createTable);
    });
});