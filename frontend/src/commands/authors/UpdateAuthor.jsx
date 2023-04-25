import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import {validateText, validateBiography} from '../../utils/ValidationLogic';

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


    const isValidInput = () => {
        let isNameEmpty = author.name.trim().length === 0;
        let isBiographyEmpty = author.biography.trim().length === 0;

        let isInputValid = !isNameEmpty && !isBiographyEmpty;
        return isInputValid;
    }


    const isTooLong = (desc, limit) => {
        let descLength = desc.trim().length;
        return descLength > limit;
    }


    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            try {
                // Simple Input validation
                if (!validateText(author.name)) {
                    setError({
                        title: "Invalid Input",
                        message: "Author name should not be empty and should not have more than 45 characters"
                    });
                    return;
                }

                if (!validateBiography(author.biography)) {
                    setError({
                        title: "Invalid Input",
                        message: "Author biography should not be empty and should not have more than 200 characters"
                    });
                    return;
                }
                
                const path = "http://localhost:9000/authors/";
                await axios.put(path + id, author);

                // Nagivate back to home page after adding
                const homepage = "/view_authors";
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
                <h1>Update Existing Author</h1>
                <input type="text" placeholder='Enter name here' onChange={handleChange} name="name"></input>
                <input type="text" placeholder='Enter biography here' onChange={handleChange} name="biography"></input>
                <FormButton type="submit" onClick={handleClick}>Update Author</FormButton>
            </div>
        </div>
    );
}

export default UpdateAuthor;