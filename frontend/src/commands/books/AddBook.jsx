import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {validateText, validateYear} from '../../utils/ValidationLogic';

import classes from '../../ui/page_styles/Form.module.css';
import BackButton from '../../ui/buttons/BackButton';
import FormButton from '../../ui/buttons/FormButton';
import Modal from '../../ui/Modal';

const AddBook = () => {
    const path = "http://localhost:9000/books";

    const [book, setBook] = useState({
        title: "",
        publisher: "",
        year: null,
        authorId: "",
    });

    const [error, setError] = useState();

    const [status, setStatus] = useState();
    

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

                // Input valid, add to database
                let res = await axios.post(path, book);
                
                setStatus({
                    title: "Added Book Status",
                    message: res.data
                });

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

    // Resets the error when user acknowlegdes
    const errorHandler = () => {
        setError(null);
    }

    const statusHandler = () => {
        setStatus(null);
    }

    return (
        <div>
            {error && <Modal title={error.title} message={error.message} handleAction={errorHandler}></Modal>}
            {status && <Modal title={status.title} message={status.message} handleAction={statusHandler}></Modal>}
            <BackButton><Link to="/">Back</Link></BackButton>
            <div className={classes.input}>
                <h1>Add a New Book</h1>
                <input type="text" placeholder='Enter book title here' onChange={handleChange} name="title"></input>
                <input type="text" placeholder='Enter book publisher here' onChange={handleChange} name="publisher"></input>
                <input type="number" placeholder='Enter published year here' onChange={handleChange} name="year"></input>
                <input type="text" placeholder='Enter book author here' onChange={handleChange} name="authorId"></input>
                <FormButton type="submit" onClick={handleClick}>Add Book</FormButton>
                <FormButton><Link to="/add_author">Save Author's Details Here</Link></FormButton>
            </div>
            
        </div>
    )
}

export default AddBook;