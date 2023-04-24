# simple-book-web

## How to start using?
<br>

**Step 1:** Clone this git repository into your local machine. 
  * Do the following on your terminal if you have git installed on your machine: git clone https://github.com/Py0000/simple-book-web.git

<br>

**Step 2:** Ensure that you have mySQL and npm (node.js) installed on your machine. 
  * Install these if you do not have them on your local machine. 

<br>

**Step 3:** After installing mySQL, import the database used for this application in your mySQL. 
  * The databases used can be found in: database_files.
  * Import everything in this folder. 

<br>

**Step 4:** Open a terminal of your choice, change your working directory to `backend`. 

<br>

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

<br>

![image](document_images\setup_step_5.JPG)

<br>

**Step 6:** Open another terminal, change your working directory to `frontend`.
  * ***Note: Make sure you do not close the one opened in step 5***

<br>

**Step 7:** Enter the following command: `npm start`
  * ***Note: If you see this line appearing on your terminal (`'react-scripts' is not recognized as an internal or external command`), do the following:***
    * `npm install react-scripts --save`
    * `npm start`

<br>

**Step 8:** You should see the web page similar to below running on your browser.

<br>

![image](document_images\setup_step_8.JPG)

<br>



  

