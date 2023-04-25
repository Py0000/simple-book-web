import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import {validateText, validateYear} from '../../utils/ValidationLogic';
import * as frontendConstant from "../../utils/BookUtils";
import * as linkConstant from '../../utils/LinkUtils';

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
            
            const path = frontendConstant.BOOK_PATH + linkConstant.PATH_DELIMITER
            await axios.put(path + id, book);

            // Nagivate back to home page after adding
            nagivateToPage(linkConstant.PATH_DELIMITER);
        } catch (error) {
            console.log(frontendConstant.ERROR_MSG + error);
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
                <h1>{frontendConstant.UPDATE_BOOK_PAGE_TITLE}</h1>
                <input type="text" placeholder={frontendConstant.PLACEHOLDER_TITLE} onChange={handleChange} name="title"></input>
                <input type="text" placeholder={frontendConstant.PLACEHOLDER_PUBLISHER} onChange={handleChange} name="publisher"></input>
                <input type="number" placeholder={frontendConstant.PLACEHOLDER_YEAR} onChange={handleChange} name="year"></input>
                <input type="text" placeholder={frontendConstant.PLACEHOLDER_AUTHORID} onChange={handleChange} name="authorId"></input>
                <FormButton type="submit" onClick={handleClick}>{frontendConstant.UPDATE_BOOK_BUTTON}</FormButton>
            </div>
        </div>
    );
}

export default UpdateBook;