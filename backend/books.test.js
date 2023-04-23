const mysql = require('mysql');

const HOST_NAME = "localhost";
const USER_NAME = "root";
const PASSWORD = "";
const DB_NAME = "simple-book-web";

describe("Database Tests", () => {
    
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
        let id = 1;
        let title = "test title " + id;
        let publisher = "test publisher " + id;
        let year = id * 1000;
        let authorId = "test authorId " + id;
      
        const query = "INSERT INTO testbooks (`title`, `publisher`, `year`, `authorId`) VALUES (?, ?, ?, ?)";
      
        const bookInfo = [title, publisher, year, authorId];
      
        let results = await new Promise((resolve, reject) => {
            connection.query(query, bookInfo, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
      
        const expected = 1;
        expect(results.affectedRows).toBe(expected);
    });


    it("Deleting a book from database test", async () => {
        let id = 0;
        let title = "test title 1" ;
        let publisher = "test publisher 1";
        let year = 1000;
        let authorId = "test authorId 1";
    
        const addQuery = "INSERT INTO testbooks (`title`, `publisher`, `year`, `authorId`) VALUES (?, ?, ?, ?)";
    
        const bookInfo = [
            title, 
            publisher,
            year, 
            authorId
        ];
        
        // Add any entry first
        await new Promise((resolve, reject) => {
            connection.query(addQuery, bookInfo, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        

        // Delete
        const removeQuery = "DELETE FROM testbooks WHERE id = ?";
        const results = await new Promise((resolve, reject) => {
            connection.query(removeQuery, [id], (error, results) => {
                if (error) reject(error);
                else resolve(results);
                
            });
        });
        
        const expected = 0;
        expect(results.affectedRows).toBe(expected);
    });    
      

    it("Updating book entry in database test", async () => {
        let id = 1;
        let title = "test title " + id;
        let publisher = "test publisher " + id;
        let year = id * 1000;
        let authorId = "test authorId " + id;
    
        const addQuery = "INSERT INTO testbooks (`title`, `publisher`, `year`, `authorId`) VALUES (?, ?, ?, ?)";
    
        const bookInfo = [
            title, 
            publisher,
            year, 
            authorId
        ];
    
        // Add an entry first
        await new Promise((resolve, reject) => {
            connection.query(addQuery, bookInfo, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
    
        // Update
        let updatedTitle = "updated title";
        let updatedPublisher = "updated publisher";
        let updatedYear = 9999;
        let updatedAuthorId = "updated authorId";
    
        const updateQuery = "UPDATE testbooks SET `title` = ?, `publisher` = ?, `year` = ?, `authorId` = ? WHERE id = ?";
    
        const updatedData = [
            updatedTitle, 
            updatedPublisher, 
            updatedYear, 
            updatedAuthorId,
            id
        ];
    
        await new Promise((resolve, reject) => {
            connection.query(updateQuery, updatedData, (error, results) => {
                if (error) reject(error);
                else resolve(results);
                expect(results.affectedRows).toBe(1);
    
                const selectQuery = "SELECT * FROM testbooks WHERE id = ?";
                connection.query(selectQuery, [id], (error, results) => {
                    if (error) reject(error);
                    else resolve(results);
                    let entry = results[0];
                    expect(entry.title === updatedTitle).toBe(true);
                    expect(entry.publisher === updatedPublisher).toBe(true);
                    expect(entry.year === updatedYear).toBe(true);
                    expect(entry.authorId === updatedAuthorId).toBe(true);
                });
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
});
