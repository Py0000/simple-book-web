import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const View = () => {
    
    const [books, displayBooks] = useState([]);


    // Listing all books in database
    useEffect(() => {
        // Calling API, needs to be async
        // Allows streaming of data and sending of multiple request at the same time
        const getBooks = async() => {
            try {
                // need to await as it is an async function
                const path = "http://localhost:9000/books";
                const result = await axios.get(path);
                displayBooks(result.data)
            }

            catch (error) {
                const errMsg = "[Frontend] Error retrieving data from backend. \n";
                console.log(errMsg + error)
            }
        };

        getBooks();
    }, []);


    // Deleting book from database
    const handleDelete = async (id)=> {
        try {
            const path = "http://localhost:9000/books/";
            await axios.delete(path + id);
            window.location.reload();
        }
        catch (err) {
            const errIdentifier = "[Frontend] ";
            console.log(errIdentifier + err);
        }
    }
    

    return (
        <div>
            <h1>Book Application</h1>
            <div className='booksView'>
                {books.map(book => (
                    <div className='bookElement' key={book.id}>
                        <h2>{book.title}</h2>
                        <p>{book.publisher}</p>
                        <p>{book.year}</p>
                        <p>{book.authorId}</p>
                        <button className='deleteButton' onClick={()=>handleDelete(book.id)}>Delete</button>
                        <button className='updateButton'><Link to={`/update/${book.id}`}>Update</Link></button>
                    </div>    
                ))}
            </div>
            <button><Link to="/add">Add Book</Link></button>
        </div>
    )
}

export default View