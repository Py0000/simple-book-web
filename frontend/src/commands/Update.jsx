import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        publisher: "",
        year: null,
        authorId: "",
    });
    
    const nagivateToPage = useNavigate();

    const handleChange = (e) => {
        setBook((prev) => ({...prev, [e.target.name]: e.target.value}));
    };


    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            try {
                const path = "http://localhost:9000/books/";
                await axios.put(path + id, book);

                // Nagivate back to home page after adding
                const homepage = "/";
                nagivateToPage(homepage);
            } catch (error) {
                const errMsg = "[Frontend] Unable to update data: "
                console.log(errMsg + error);
            }
        }

        catch (error) {
            const errIdentifier = "[Frontend] ";
            console.log(errIdentifier + error)
        }
    };

    return (
        <div className='updateForm'>
            <h1>Update Book</h1>
            <input type="text" placeholder='title' onChange={handleChange} name="title"></input>
            <input type="text" placeholder='publisher' onChange={handleChange} name="publisher"></input>
            <input type="number" placeholder='year' onChange={handleChange} name="year"></input>
            <input type="text" placeholder='author' onChange={handleChange} name="authorId"></input>
            <button onClick={handleClick}>Update Book</button>
        </div>
    )
}

export default Update