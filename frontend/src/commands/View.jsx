import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from '../components/Card';
import './View.css';

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
        <div className='main-view'>
            <h1>Simple CRUD Book Application</h1>
            <button className='add-book-button'><Link to="/add">Add Book</Link></button>
            <Card className='book-view'>
                {books.map(book => (
                    <div className='book-item' key={book.id}>
                        <div className='book-item__year'>{book.year}</div>
                        <div className="book-item__description">
                            <h1>{book.title}</h1>
                            <p>{book.publisher}</p>
                            <p>{book.authorId}</p>
                        </div>
                        <button className='book-item__delete' onClick={()=>handleDelete(book.id)}>Delete</button>
                        <button className='book-item__update'><Link to={`/update/${book.id}`}>Update</Link></button>
                    </div>    
                ))}
            </Card>
            
        </div>
    )
}

export default View