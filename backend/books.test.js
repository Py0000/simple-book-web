const mysql = require('mysql');

const HOST_NAME = "localhost";
const USER_NAME = "root";
const PASSWORD = "";
const DB_NAME = "simple-book-web";

describe("Book Database Tests", () => {
    
    let connection;

    beforeAll(async () => {
        let createTable = "CREATE TABLE `simple-book-web`.`testbooks` ( `id` INT NOT NULL AUTO_INCREMENT, `title` VARCHAR(45) NOT NULL, `publisher` VARCHAR(45) NOT NULL, `year` INT NOT NULL, `authorId` VARCHAR(45) NOT NULL, PRIMARY KEY (`id`));";

        connection = mysql.createConnection({
            host: HOST_NAME,
            user: USER_NAME,
            password: PASSWORD,
            database: DB_NAME,
        });

        // Wrap connection in a Promise to wait for it to establish
        await new Promise((resolve, reject) => {
            connection.query(createTable, (error, results) => {
                if (error) reject(error);
                else resolve(results);
              });
        });
    });


    afterAll((done) => {
        let dropTableSQL = "DROP TABLE IF EXISTS `testbooks`";
        connection.query(dropTableSQL, (error, results) => {
            if (error) throw error;
            connection.end(() => {
                done();
            });
        });
    });    
    

    test('Retrieving all books from test books database', async () => {
        const query = 'SELECT * FROM testbooks';

        let results = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        
        const expected = 0;
        expect(results.length).toBe(expected); 
    });


    test("Adding books to testbooks database", async () => {
        let title = "test title";
        let publisher = "test publisher";
        let year = 1000;
        let authorId = "test authorId";

        const bookInfo = [title, publisher, year, authorId];
      
        // add book into database
        const addQuery = "INSERT INTO testbooks (`title`, `publisher`, `year`, `authorId`) VALUES (?, ?, ?, ?)";
        let insertResults = await new Promise((resolve, reject) => {
            connection.query(addQuery, bookInfo, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
    
        // check that the book was successfully added
        const selectQuery = "SELECT * FROM testbooks WHERE title = ? AND publisher = ? AND year = ? AND authorId = ?";
        const selectResult = await new Promise((resolve, reject) => {
            connection.query(selectQuery, bookInfo, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        
        // check that one row was added
        expect(insertResults.affectedRows).toBe(1); 
        expect(selectResult.length).toBe(1); 

        // check that added details are as expected
        expect(selectResult[0].title).toBe(title); 
        expect(selectResult[0].publisher).toBe(publisher);
        expect(selectResult[0].year).toBe(year);
        expect(selectResult[0].authorId).toBe(authorId);
    });
    


    test("Deleting a book from database test", async () => {
        let title = "test title";
        let publisher = "test publisher";
        let year = 1000;
        let authorId = "test authorId";

        const bookInfo = [title, publisher, year, authorId];
    
        // add book to database first
        const addQuery = "INSERT INTO testbooks (`title`, `publisher`, `year`, `authorId`) VALUES (?, ?, ?, ?)";
        const addResult = await new Promise((resolve, reject) => {
            connection.query(addQuery, bookInfo, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

        // get the inserted ID (incase it was added to a value that was unexpected)
        let id = addResult.insertId; 
    
        // delete book from database
        const removeQuery = "DELETE FROM testbooks WHERE id = ?";
        const removeResult = await new Promise((resolve, reject) => {
            connection.query(removeQuery, [id], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
    
        // check that book was deleted from database
        const selectQuery = "SELECT * FROM testbooks WHERE id = ?";
        const selectResult = await new Promise((resolve, reject) => {
            connection.query(selectQuery, [id], (error, results) => {
                if (error) reject(error);
                else resolve(results[0]);
            });
        });
    
        expect(removeResult.affectedRows).toBe(1); // check that one row was deleted
        expect(selectResult).toBeUndefined(); // ensure that book does not exist
    });
        
      

    test("Updating book entry in database test", async () => {
        let title = "test title ";
        let publisher = "test publisher ";
        let year = 1000;
        let authorId = "test authorId";

        const bookInfo = [
            title, 
            publisher,
            year, 
            authorId
        ];
    
        // Add an entry first
        const addQuery = "INSERT INTO testbooks (`title`, `publisher`, `year`, `authorId`) VALUES (?, ?, ?, ?)";
        const addResult = await new Promise((resolve, reject) => {
            connection.query(addQuery, bookInfo, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

        // get the inserted ID (incase it was added to a value that was unexpected)
        let id = addResult.insertId; 
    
        // Update
        let updatedTitle = "updated title";
        let updatedPublisher = "updated publisher";
        let updatedYear = 9999;
        let updatedAuthorId = "updated authorId";

        const updatedData = [
            updatedTitle, 
            updatedPublisher, 
            updatedYear, 
            updatedAuthorId,
        ];
    
        const updateQuery = "UPDATE testbooks SET `title` = ?, `publisher` = ?, `year` = ?, `authorId` = ? WHERE id = ?";
        const updateResults = await new Promise((resolve, reject) => {
            connection.query(updateQuery, [...updatedData, id], (error, results) => {
                if (error) reject(error);
                else resolve(results);
                expect(results.affectedRows).toBe(1);
            });
        });


        const selectQuery = "SELECT * FROM testbooks WHERE id = ?";
        let selectResults = await new Promise((resolve, reject) => {
            connection.query(selectQuery, [id], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        
        // check that one row was updated
        expect(updateResults.affectedRows).toBe(1);

        // check that updated details are as expected
        expect(selectResults[0].title).toBe(updatedTitle);
        expect(selectResults[0].publisher).toBe(updatedPublisher);
        expect(selectResults[0].year).toBe(updatedYear);
        expect(selectResults[0].authorId).toBe(updatedAuthorId);
    });
    
});
