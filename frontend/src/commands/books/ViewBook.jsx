import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Card from '../../ui/Card';
import '../../ui/View.css';

const ViewBook = () => {
    
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
            <button className='add-item-button'><Link to="/addbook">Add Book</Link></button>
            <button className='view-others-button'><Link to="/view_authors">View All Authors</Link></button>
            <Card className='item-view'>
                {books.map(book => (
                    <div className='item-item' key={book.id}>
                        <div className='item-item__id'>{book.year}</div>
                        <div className="item-item__description">
                            <h1>{book.title}</h1>
                            <p>{book.publisher}</p>
                            <p>{book.authorId}</p>
                        </div>
                        <button className='item-item__update'><Link to={`/updatebook/${book.id}`}>Update</Link></button>
                        <button className='item-item__delete' onClick={()=>handleDelete(book.id)}>Delete</button>  
                    </div>    
                ))}
            </Card>
            
        </div>
    )
}

export default ViewBook;