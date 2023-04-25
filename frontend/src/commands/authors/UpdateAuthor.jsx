import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import {validateText, validateBiography} from '../../utils/ValidationLogic';
import * as frontendConstant from "../../utils/FrontendUtils";

import classes from '../../ui/page_styles/Form.module.css';
import FormButton from '../../ui/buttons/FormButton';
import Modal from '../../ui/Modal';

const UpdateAuthor = () => {
    const [author, setAuthor] = useState({
        name: "",
        biography: "",
    });

    const [error, setError] = useState();
    
    const nagivateToPage = useNavigate();

    const handleChange = (e) => {
        setAuthor((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const location = useLocation();
    const id = location.pathname.split(frontendConstant.PATH_DELIMITER)[2];

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
            
            const path = frontendConstant.AUTHOR_PATH + frontendConstant.PATH_DELIMITER;
            await axios.put(path + id, author);

            // Nagivate back to home page after adding
            nagivateToPage(frontendConstant.VIEW_AUTHOR_LINK);
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
                <h1>{frontendConstant.UPDATE_AUTHOR_PAGE_TTTLE}</h1>
                <input type="text" placeholder={frontendConstant.PLACEHOLDER_NAME} onChange={handleChange} name="name"></input>
                <input type="text" placeholder={frontendConstant.PLACEHOLDER_BIO} onChange={handleChange} name="biography"></input>
                <FormButton type="submit" onClick={handleClick}>{frontendConstant.UPDATE_AUTHOR_BUTTON}</FormButton>
            </div>
        </div>
    );
}

export default UpdateAuthor;