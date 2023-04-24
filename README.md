# simple-book-web

## How to start using?
<br>

**Step 1:** Clone this git repository into your local machine. 
  * Do the following on your terminal if you have git installed on your machine: git clone https://github.com/Py0000/simple-book-web.git

**Step 2:** Ensure that you have mySQL and npm (node.js) installed on your machine. 
  * Install these if you do not have them on your local machine. 

**Step 3:** After installing mySQL, import the database used for this application in your mySQL. 
  * The databases used can be found in: database_files.
  * Import everything in this folder. 

**Step 4:** Open a terminal of your choice, change your working directory to `backend`. 

**Step 5:** Enter the following command: `npm start` 
  * ***Note: If you cannot connect to the database:***
    * Go to `backend` folder.
    * Go to `database.js`.
    * Edit lines 3 to 5 such that it follows your database configuration. 
    * ``` 
      const HOST_NAME = "localhost";
      const USER_NAME = "root";
      const PASSWORD = "";
      ```

  * You should see the something similar to the following in your terminal at this point. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ![image](https://github.com/Py0000/simple-book-web/blob/doc/document_images/setup_step_5.JPG?raw=true)

**Step 6:** Open another terminal, change your working directory to `frontend`.
  * ***Note: Make sure you do not close the one opened in step 5***

**Step 7:** Enter the following command: `npm start`
  * ***Note: If you see this line appearing on your terminal (`'react-scripts' is not recognized as an internal or external command`), do the following:***
    * `npm install react-scripts --save`
    * `npm start`

**Step 8:** You should see the web page similar to below running on your browser.
<br>

![image](https://github.com/Py0000/simple-book-web/blob/doc/document_images/setup_step_8.JPG?raw=true)

<br>


## Tech Stack Used

1. React.js with express library for frontend.
2. Node.js with axios for calling REST APIs.
3. mySQL database for storing data.


## Design Decision / Trade Off

The main consideration when design this application was to keep it simple as this is meant to be a very simple CRUB web application. 

In the backend server, there are 2 classes: 
1. `database.js` class: Handles the setting up and connection with the database used in this application.
2. `main.js` class: Handles the main logic for the CRUD operations on the database. 
  * Create: `POST` request is used to store a new book / author into the database.
  * Read: `GET` request is used to get all the books and authors from the database. 
  * Update: `PUT` request is used to update an entry in the data base.
  * Delete: `DELETE` request is used to update an entry in database. 

Reason for having 2 seperate classes instead of combining every into one "god backend server class":
1. Single Responsibility Principle: Each class is only required to either handle the database or CRUD operations. 
2. Ensures Open-Closed Principle: 
  * If there is a need to modify/enhance the database, it could be easily extended without possibly affecting other classes.

Trade-offs: All the 4 CRUD operations are lumped into the `main.js` file, this is to prevent the creation of many different classes for each operation / table. Since the is a small and simple application, having a seperate file for each operation is necessary. However, if the application will be extended and the logic gets more complicated, then a possible design would be to have each class to handle each operation so that `main.js` would not be too complex. 


## How is it tested? 

For the frontend server, the react testing framework is used to do some simple testing of the frontend server. There is a test file for each page that is rendered in the application. In each test file, it ensures that most / majority (important ones) are being rendered on the page. In addition, it also tests the expected results of clicking some buttons on the page. It also tests for the expected behaviour when certain operations / invalid input are executed. 

For the backend server, the jest testing framework is used to test the backend server. There are 2 test files, `author.test.js` and `book.test.js`, that test each table in the database separately. In each file, all the 4 CRUD operations are tested. This is to ensure, all 4 CRUD operations will work as expected with our database. 

There are both positive and negative testcases that test the valid and invalid behaviour of the backend server. The input selected for each testcase, especially the negative testcase, is done by doing equivalence partitions on each input, followed by boundary value analysis. Hence, input values near the boundaries of each input is selected. 

Reason for doing equivalence partition is because the software do not treat each input in a unique way, all inputs within a certain range are treated in the same way, thus, this helps to improve efficiency and effective of the testcases. From instance, for biography input, the partitions are null input, input with 1 to 200 characters and input with more than 200 characters. 

Reason for using boundary value analysis is because input near the boundaries of an equivalence partition are more likely to be buggy. For instance, when testing the maximum limit of 200 characters for author biography, the a input with 200 characters and another one with 201 characters are used. 




  

