import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import * as frontendConstant from "../../utils/FrontendUtils";

import Card from '../../ui/Card';
import '../../ui/page_styles/View.css';
import ViewButton from '../../ui/buttons/ViewButton';

const ViewAuthors = () => {
    
    const [authors, displayAuthors] = useState([]);

    useEffect(() => {
        // Calling API, needs to be async
        // Allows streaming of data and sending of multiple request at the same time
        const getAuthors = async() => {
            try {
                // need to await as it is an async function
                const result = await axios.get(frontendConstant.AUTHOR_PATH);
                displayAuthors(result.data)
            }

            catch (error) {
                console.log(frontendConstant.ERROR_MSG + error)
            }
        };

        getAuthors();
    }, []);


    // Deleting book from database
    const handleDelete = async (id)=> {
        try {
            const path = frontendConstant.AUTHOR_PATH + frontendConstant.PATH_DELIMITER;
            await axios.delete(path + id);
            window.location.reload();
        }
        catch (err) {
            console.log(frontendConstant.ERROR_MSG + err);
        }
    }
    

    return (
        <div className='main-view'>
            <h1>{frontendConstant.VIEW_AUTHOR_PAGE_TITLE}</h1>
            <ViewButton><Link to={frontendConstant.ADD_AUTHOR_LINK}>{frontendConstant.ADD_AUTHOR_BUTTON_VIEW}</Link></ViewButton>
            <ViewButton><Link to={frontendConstant.PATH_DELIMITER}>{frontendConstant.VIEW_ALL_BOOKS_BUTTON}</Link></ViewButton>
            <Card className='item-view'>
                {authors.map(author => (
                    <div className='item-item' key={author.id}>
                        <div className='item-item__id'>{author.id}</div>
                        <div className="item-item__description">
                            <h1>{author.name}</h1>
                            <p>{author.biography}</p>
                        </div>
                        <button className='item-item__update'><Link to={`${frontendConstant.UPDATE_AUTHOR_LINK}/${author.id}`}>{frontendConstant.UPDATE_AUTHOR_BUTTON_VIEW}</Link></button>
                        <button className='item-item__delete' onClick={()=>handleDelete(author.id)}>{frontendConstant.DELETE_AUTHOR_BUTTON_VIEW}</button>
                    </div>    
                ))}
            </Card>
        </div>
    )
}

export default ViewAuthors;