import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

import classes from '../components/Form.module.css';
import FormButton from '../components/FormButton';
import ErrorModal from '../components/ErrorModel';

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


    const isValidInput = () => {
        let isTitleEmpty = book.title.trim().length === 0;
        let isPublisherEmpty = book.publisher.trim().length === 0;
        let isAuthorIdEmpty = book.authorId.trim().length === 0;

        // Check that year is non-null, it is positve and has 4 digits
        let isYearValid = book.year != null && book.year > 0 && (Math.log(book.year) * Math.LOG10E + 1 | 0) === 4;

        let isInputValid = !isTitleEmpty && !isPublisherEmpty && !isAuthorIdEmpty && isYearValid;
        return isInputValid;
    }


    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            try {
                // Simple Input validation
                if (!isValidInput()) {
                    setError({
                        title: "Invalid Input",
                        message: "One or more input is empty / invalid!"
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
            {error && <ErrorModal title={error.title} message={error.message} handleError={errorHandler}></ErrorModal>}
            <div className={classes.input}>
                <h1>Update Book</h1>
                <input type="text" placeholder='title' onChange={handleChange} name="title"></input>
                <input type="text" placeholder='publisher' onChange={handleChange} name="publisher"></input>
                <input type="number" placeholder='year' onChange={handleChange} name="year"></input>
                <input type="text" placeholder='author' onChange={handleChange} name="authorId"></input>
                <FormButton type="submit" onClick={handleClick}>Update Book</FormButton>
            </div>
        </div>
    );
}

export default UpdateBook;