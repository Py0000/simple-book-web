import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import * as frontendConstant from "../../utils/BookUtils";
import * as linkConstant from '../../utils/LinkUtils';

import Card from '../../ui/Card';
import '../../ui/page_styles/View.css';
import ViewButton from '../../ui/buttons/ViewButton';

const ViewBook = () => {
    
    const [books, displayBooks] = useState([]);


    // Listing all books in database
    useEffect(() => {
        // Calling API, needs to be async
        // Allows streaming of data and sending of multiple request at the same time
        const getBooks = async() => {
            try {
                // need to await as it is an async function
                
                const result = await axios.get(frontendConstant.BOOK_PATH);
                displayBooks(result.data)
            }

            catch (error) {
                console.log(frontendConstant.ERROR_MSG + error)
            }
        };

        getBooks();
    }, []);


    // Deleting book from database
    const handleDelete = async (id)=> {
        try {
            const path = frontendConstant.BOOK_PATH + linkConstant.PATH_DELIMITER;
            await axios.delete(path + id);
            window.location.reload();
        }
        catch (err) {
            console.log(frontendConstant.ERROR_MSG + err);
        }
    }
    

    return (
        <div className='main-view'>
            <h1>{frontendConstant.VIEW_BOOK_PAGE_TITLE}</h1>
            <ViewButton><Link to={linkConstant.ADD_BOOK_LINK}>{frontendConstant.ADD_BOOK_BUTTON}</Link></ViewButton>
            <ViewButton><Link to={linkConstant.VIEW_AUTHOR_LINK}>{frontendConstant.ALL_AUTHORS_BUTTON}</Link></ViewButton>
            <Card className='item-view'>
                {books.map(book => (
                    <div className='item-item' key={book.id}>
                        <div className='item-item__id'>{book.year}</div>
                        <div className="item-item__description">
                            <h1>{book.title}</h1>
                            <p>{book.publisher}</p>
                            <p>{book.authorId}</p>
                        </div>
                        <button className='item-item__update'><Link to={`${linkConstant.UPDATE_BOOK_LINK}/${book.id}`}>{frontendConstant.UPDATE_BUTTON_VIEW}</Link></button>
                        <button className='item-item__delete' onClick={()=>handleDelete(book.id)}>{frontendConstant.DELETE_BUTTON_VIEW}</button>  
                    </div>    
                ))}
            </Card>
        </div>
    )
}

export default ViewBook;