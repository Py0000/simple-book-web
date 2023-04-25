import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {validateText, validateBiography} from '../../utils/ValidationLogic';
import * as frontendConstant from '../../utils/AuthorUtils';
import * as linkConstant from '../../utils/LinkUtils';

import classes from '../../ui/page_styles/Form.module.css';
import BackButton from '../../ui/buttons/BackButton';
import FormButton from '../../ui/buttons/FormButton';
import Modal from '../../ui/Modal';
import '../../ui/page_styles/AddAuthor.css';


const AddAuthor = () => {
    const [author, setAuthor] = useState({
        name: "",
        biography: ""
    });

    const [error, setError] = useState();
    
    const [status, setStatus] = useState();

    const handleChange = (e) => {
        setAuthor((prev) => (
                {...prev, [e.target.name]: e.target.value}
            )
        );
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            // Simple Input validation
            if (!validateText(author.name)) {
                setError({
                    title: frontendConstant.ERROR_MODAL_TITLE,
                    message: frontendConstant.ERROR_AUTHOR_NAME
                });
                return;
            }

            if (!validateBiography(author.biography)) {
                setError({
                    title: frontendConstant.ERROR_MODAL_TITLE,
                    message: frontendConstant.ERROR_AUTHOR_BIO
                });
                return;
            }

            // Input valid, add to database
            let res = await axios.post(frontendConstant.AUTHOR_PATH, author);
            
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
            <BackButton><Link to={linkConstant.VIEW_AUTHOR_LINK}>{frontendConstant.BACK_BUTTON}</Link></BackButton>
            <div className={classes.input}>
                <h1>{frontendConstant.ADD_AUTHOR_PAGE_TTTLE}</h1>
                <input type="text" placeholder={frontendConstant.PLACEHOLDER_NAME} onChange={handleChange} name="name"></input>
                <input type="text" placeholder={frontendConstant.PLACEHOLDER_BIO} onChange={handleChange} name="biography"></input>
                <FormButton type="submit" onClick={handleClick}>{frontendConstant.ADD_AUTHOR_BUTTON}</FormButton>
                <FormButton><Link to={linkConstant.ADD_BOOK_LINK}>{frontendConstant.SAVE_BOOK_DETAILS}</Link></FormButton>
            </div>
            <div className='add-author__remark'>
                <p>{frontendConstant.WARNING_MSG}</p>
            </div>
        </div>
    )
}

export default AddAuthor;