const db = require("./database");
const TABLE_INDICATOR = "/";
const TABLE_ELEMENT_INDICATOR = "/:id";

const handleError = (operation, table, response) => {
    const errMsg = `Error ${operation} ${table.slice(0,-1)} data. \n`;
    return response.json(errMsg);
}

const handleSuccess = (operation, table, response) => {
    const successMsg = `Successfully ${operation} ${table.slice(0,-1)}.`;
    return response.json(successMsg);
}

// Get all the items in the table
const getAllEntries = (table, query, router) => {
    router.get(TABLE_INDICATOR, (request, response) => {
        db.query(query, (error, data) => {
            if (error) {
                return handleError("retrieving", table, response);
            }

            return response.json(data);
        });
    });
};


// Add an item into the table
const addEntry = (table, query, router) => {
    router.post(TABLE_INDICATOR, (request, response) => {
        const tableInfo = Object.values(request.body);
        db.query(query, [tableInfo], (error, data) => {
            if (error) {
                return handleError("adding", table, response);
            } 

            return handleSuccess("added", table, response);
        });
    });
}


// Delete an item from the table
const deleteEntry = (table, query, router) => {
    router.delete(TABLE_ELEMENT_INDICATOR, (request, response) => {
        const id = request.params.id;
        db.query(query, [id], (error, data) => {
            if (error) {
                return handleError("deleting", table, response);
            } 

            return handleSuccess("added", table, response);
        });
    });
}


// Update an item in the table
const updateEntry = (table, query, router) => {
    router.put(TABLE_ELEMENT_INDICATOR, (request, response) => {
        const id = request.params.id;
        const updatedData = Object.values(request.body);

        db.query(query, [...updatedData, id], (error, data) => {
            if (error) {
                return handleError("updating", table, response);
            } 

            return handleSuccess("added", table, response);
        });
    });
}

module.exports = {getAllEntries, addEntry, deleteEntry, updateEntry};