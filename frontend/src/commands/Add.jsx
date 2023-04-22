import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const path = "http://localhost:9000/books";

    const [book, setBook] = useState({
        title: "",
        publisher: "",
        year: null,
        authorId: "",
    });
    
    const nagivateToPage = useNavigate();

    const handleChange = (e) => {
        setBook((prev) => (
                {...prev, [e.target.name]: e.target.value}
            )
        );
    };


    const handleClick = async (e) => {
        e.preventDefault();
        try {
            
            try {
                await axios.post(path, book);
                
                // Nagivate back to home page after adding
                const homepage = "/";
                nagivateToPage(homepage);
            } catch (error) {
                const errMsg = "[Frontend] Error adding data to backend. \n";
                console.log(errMsg + error);
            }
        }

        catch (error) {
            const errIdentifier = "[Frontend] ";
            console.log(errIdentifier +  error);
        }
    };

    return (
        <div className='addForm'>
            <h1>Add Book</h1>
            <input type="text" placeholder='title' onChange={handleChange} name="title"></input>
            <input type="text" placeholder='publisher' onChange={handleChange} name="publisher"></input>
            <input type="number" placeholder='year' onChange={handleChange} name="year"></input>
            <input type="text" placeholder='author' onChange={handleChange} name="authorId"></input>
            <button onClick={handleClick}>Add Book</button>
        </div>
    )
}

export default Add