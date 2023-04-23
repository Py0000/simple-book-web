const mysql = require('mysql');

const HOST_NAME = "localhost";
const USER_NAME = "root";
const PASSWORD = "";
const DB_NAME = "simple-book-web";

describe("Authors Database Tests", () => {
    
    let connection;

    beforeAll(async () => {
        let createTable = "CREATE TABLE `simple-book-web`.`testauthors` ( `id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(45) NOT NULL, `biography` VARCHAR(200) NOT NULL, PRIMARY KEY (`id`));";

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
        let dropTableSQL = "DROP TABLE IF EXISTS `testauthors`";
        connection.query(dropTableSQL, (error, results) => {
            if (error) throw error;
            connection.end(() => {
                done();
            });
        });
    });    


    test('Retrieving all authors from test authors database', async () => {
        const query = 'SELECT * FROM testauthors';

        let results = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        
        const expected = 0;
        expect(results.length).toBe(expected); 
    });


    test("Adding author to testauthors database", async () => {
        let name = "test name";
        let biography = "test biography";

        const authorInfo = [name, biography];
        
        // add author to database
        const addQuery = "INSERT INTO testauthors (`name`, `biography`) VALUES (?, ?)";
        let insertResults = await new Promise((resolve, reject) => {
            connection.query(addQuery, authorInfo, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
      
        // check that the author was successfully added
        const selectQuery = "SELECT * FROM testauthors WHERE name = ? AND biography = ?";
        let selectResults = await new Promise((resolve, reject) => {
            connection.query(selectQuery, authorInfo, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

        // check that one row was added
        expect(insertResults.affectedRows).toBe(1);
        expect(selectResults.length).toBe(1);

        // check that added details are as expected
        expect(selectResults[0].name).toBe(name);
        expect(selectResults[0].biography).toBe(biography);
    });
      


    test("Deleting an author from database test", async () => {
        let name = "test name ";
        let biography = "test biography " + "i" * 185;

        const authorInfo = [name, biography];
      
        // add author to database first
        const addQuery = "INSERT INTO testauthors (`name`, `biography`) VALUES (?, ?)";
        const addResult = await new Promise((resolve, reject) => {
            connection.query(addQuery, authorInfo, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

        // get the inserted ID (incase it was added to a value that was unexpected)
        let id = addResult.insertId; 
      
        // delete author from database
        const removeQuery = "DELETE FROM testauthors WHERE id = ?";
        const removeResult = await new Promise((resolve, reject) => {
            connection.query(removeQuery, [id], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
      
        // check that author was deleted from database
        const selectQuery = "SELECT * FROM testauthors WHERE id = ?";
        const authorAfterDelete = await new Promise((resolve, reject) => {
            connection.query(selectQuery, [id], (error, results) => {
                if (error) reject(error);
                else resolve(results[0]);
            });
        });
        
        expect(removeResult.affectedRows).toBe(1); // check that one row was deleted
        expect(authorAfterDelete).toBeUndefined(); // ensure that author does not exist
    });


    test("Updating author entry in database test", async () => {
        let name = "test name";
        let biography = "test biography";
    
        const authorInfo = [name, biography];
      
        // add author to database first
        const addQuery = "INSERT INTO testauthors (`name`, `biography`) VALUES (?, ?)";
        const addResult = await new Promise((resolve, reject) => {
            connection.query(addQuery, authorInfo, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

        // get the inserted ID (incase it was added to a value that was unexpected)
        let id = addResult.insertId; 
    
        // Update
        let updatedName = "updated name";
        let updatedBiography = "updated biography";

        const updatedData = [
            updatedName, 
            updatedBiography, 
        ];
    
        const updateQuery = "UPDATE testauthors SET `name` = ?, `biography` = ? WHERE id = ?";
        const updateResults = await new Promise((resolve, reject) => {
            connection.query(updateQuery, [...updatedData, id], (error, results) => {
                if (error) reject(error);
                else resolve(results);
                expect(results.affectedRows).toBe(1);
            });
        });


        const selectQuery = "SELECT * FROM testauthors WHERE id = ?";
        let selectResults = await new Promise((resolve, reject) => {
            connection.query(selectQuery, [id], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        
        // check that one row was updated
        expect(updateResults.affectedRows).toBe(1);

        // check that updated details are as expected
        expect(selectResults[0].name).toBe(updatedName);
        expect(selectResults[0].biography).toBe(updatedBiography);
    });
    
});