const mysql = require('mysql');

const HOST_NAME = "127.0.0.1";
const USER_NAME = "root";
const PASSWORD = "";
const DB_NAME = "simple-book-web";
const DB_PORT = 3306



describe("Database Tests", () => {
    let connection;
    
    // Create the database table for testing books CRUD operations
    beforeEach(async () => {
        let createTable = "CREATE TABLE `simple-book-web`.`testbooks` ( `id` INT NOT NULL AUTO_INCREMENT, `title` VARCHAR(45) NOT NULL, `publisher` VARCHAR(45) NOT NULL, `year` INT NOT NULL, `authorId` VARCHAR(45) NOT NULL, PRIMARY KEY (`id`))";

        connection = await mysql.createPool({
            host: HOST_NAME,
            user: USER_NAME,
            password: PASSWORD,
            database: DB_NAME,
            port: DB_PORT
    });

        await connection.query(createTable);
        console.log("Connected to database");
    });
    

    // Test adding books to database
    it("Adding books to database test", async () => {
        try {
            let id = 1;
            let title = "test title " + id;
            let publisher = "test publisher " + id;
            let year = id * 1000;
            let authorId = "test authorId " + id;
        
            const query = "INSERT INTO testbooks (`title`, `publisher`, `year`, `authorId`) VALUES (?)";
        
            const bookInfo = [
                title, 
                publisher,
                year, 
                authorId
            ];
        
            await connection.query(query, [bookInfo]);
        
            const [rows, fields] = await connection.query("SELECT * FROM testbooks");
        
            expect(rows.length === 1);
        } catch (error) {
            console.log(error);
        }
        
    });

    // Destroy table after each test, so that test not affected by previous / next test
    // Prevent affecting / influencing test results.
    afterEach(async () => {
        let dropTableSQL = "DROP TABLE IF EXISTS `testbooks`";
        await connection.query(dropTableSQL);
        await connection.end();
    });
});