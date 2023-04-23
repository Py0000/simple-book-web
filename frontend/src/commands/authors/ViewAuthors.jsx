import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Card from '../../ui/Card';
import '../../ui/View.css';

const ViewAuthors = () => {
    
    const [authors, displayAuthors] = useState([]);


    // Listing all books in database
    useEffect(() => {
        // Calling API, needs to be async
        // Allows streaming of data and sending of multiple request at the same time
        const getAuthors = async() => {
            try {
                // need to await as it is an async function
                const path = "http://localhost:9000/authors";
                const result = await axios.get(path);
                displayAuthors(result.data)
            }

            catch (error) {
                const errMsg = "[Frontend] Error retrieving data from backend. \n";
                console.log(errMsg + error)
            }
        };

        getAuthors();
    }, []);


    // Deleting book from database
    const handleDelete = async (id)=> {
        try {
            const path = "http://localhost:9000/authors/";
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
            <h1>Authors in Simple CRUD Book Application</h1>
            <button className='add-item__button'><Link to="/add_author">Add Authors</Link></button>
            <button className='view-others__button'><Link to="/">View All Books</Link></button>
            <Card className='item-view'>
                {authors.map(author => (
                    <div className='item-item' key={author.id}>
                        <div className='item-item__id'>{author.id}</div>
                        <div className="item-item__description">
                            <h1>{author.name}</h1>
                            <p>{author.biography}</p>
                        </div>
                        <button className='item-item__update'><Link to={`/update_author/${author.id}`}>Update</Link></button>
                        <button className='item-item__delete' onClick={()=>handleDelete(author.id)}>Delete</button>
                    </div>    
                ))}
            </Card>
        </div>
    )
}

export default ViewAuthors;