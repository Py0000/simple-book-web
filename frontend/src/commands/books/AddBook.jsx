import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {validateText, validateYear} from '../../utils/ValidationLogic';
import * as frontendConstant from "../../utils/BookUtils";
import * as linkConstant from '../../utils/LinkUtils';

import classes from '../../ui/page_styles/Form.module.css';
import BackButton from '../../ui/buttons/BackButton';
import FormButton from '../../ui/buttons/FormButton';
import Modal from '../../ui/Modal';

const AddBook = () => {
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
            // Simple Input validation
            if (!validateText(book.title)) {
                setError({
                    title: frontendConstant.ERROR_MODAL_TITLE,
                    message: frontendConstant.ERROR_MODAL_BOOK
                });
                return;
            } 

            if (!validateText(book.publisher)) {
                setError({
                    title: frontendConstant.ERROR_MODAL_TITLE,
                    message: frontendConstant.ERROR_MODAL_PUBLISHER
                });
                return;
            } 

            if (!validateYear(book.year)) {
                setError({
                    title: frontendConstant.ERROR_MODAL_TITLE,
                    message: frontendConstant.ERROR_MODAL_YEAR
                });
                return;
            } 

            if (!validateText(book.authorId)) {
                setError({
                    title: frontendConstant.ERROR_MODAL_TITLE,
                    message: frontendConstant.ERROR_MODAL_AUTHORID
                });
                return;
            } 

            // Input valid, add to database
            let res = await axios.post(frontendConstant.BOOK_PATH, book);
            
            setStatus({
                title: frontendConstant.STATUS_MODAL_TITLE,
                message: res.data
            });

        } catch (error) {
            console.log(frontendConstant.ERROR_MSG + error);
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
            <BackButton><Link to={linkConstant.PATH_DELIMITER}>{frontendConstant.BACK_BUTTON}</Link></BackButton>
            <div className={classes.input}>
                <h1>{frontendConstant.ADD_BOOK_PAGE_TTTLE}</h1>
                <input type="text" placeholder={frontendConstant.PLACEHOLDER_TITLE} onChange={handleChange} name="title"></input>
                <input type="text" placeholder={frontendConstant.PLACEHOLDER_PUBLISHER} onChange={handleChange} name="publisher"></input>
                <input type="number" placeholder={frontendConstant.PLACEHOLDER_YEAR} onChange={handleChange} name="year"></input>
                <input type="text" placeholder={frontendConstant.PLACEHOLDER_AUTHORID} onChange={handleChange} name="authorId"></input>
                <FormButton type="submit" onClick={handleClick}>{frontendConstant.ADD_BOOK_BUTTON}</FormButton>
                <FormButton><Link to={linkConstant.ADD_AUTHOR_LINK}>{frontendConstant.SAVE_AUTHOR_DETAILS}</Link></FormButton>
            </div>
            
        </div>
    )
}

export default AddBook;