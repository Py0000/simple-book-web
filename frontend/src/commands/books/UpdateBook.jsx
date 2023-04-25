import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import {validateText, validateYear} from '../../utils/ValidationLogic';

import classes from '../../ui/page_styles/Form.module.css';
import FormButton from '../../ui/buttons/FormButton';
import Modal from '../../ui/Modal';

const UpdateBook = () => {
    const [book, setBook] = useState({
        title: "",
        publisher: "",
        year: null,
        authorId: "",
    });

    const [error, setError] = useState();
    
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
                // Simple Input validation
                if (!validateText(book.title)) {
                    setError({
                        title: "Invalid Input",
                        message: "Book Title should not be empty and should not have more than 45 characters"
                    });
                    return;
                } 

                if (!validateText(book.publisher)) {
                    setError({
                        title: "Invalid Input",
                        message: "Book Publisher should not be empty and should not have more than 45 characters"
                    });
                    return;
                } 

                if (!validateYear(book.year)) {
                    setError({
                        title: "Invalid Input",
                        message: "Book Year should not be empty, should not be negative or zero and should have 4 digits."
                    });
                    return;
                } 

                if (!validateText(book.authorId)) {
                    setError({
                        title: "Invalid Input",
                        message: "Book Author Id should not be empty and should not have more than 45 characters"
                    });
                    return;
                } 
                
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


    // Resets the error when user acknowlegdes
    const errorHandler = () => {
        setError(null);
    }


    return (
        <div>
            {error && <Modal title={error.title} message={error.message} handleAction={errorHandler}></Modal>}
            <div className={classes.input}>
                <h1>Update Existing Book</h1>
                <input type="text" placeholder='Enter book title here' onChange={handleChange} name="title"></input>
                <input type="text" placeholder='Enter book publisher here' onChange={handleChange} name="publisher"></input>
                <input type="number" placeholder='Enter published year here' onChange={handleChange} name="year"></input>
                <input type="text" placeholder='Enter book author here' onChange={handleChange} name="authorId"></input>
                <FormButton type="submit" onClick={handleClick}>Update Book</FormButton>
            </div>
        </div>
    );
}

export default UpdateBook;