import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import classes from '../components/Form.module.css';
import FormButton from '../components/FormButton';
import ErrorModal from '../components/ErrorModel';
import './AddAuthor.css';

const AddAuthor = () => {
    const path = "http://localhost:9000/authors";

    const [author, setAuthor] = useState({
        name: "",
        biography: ""
    });

    const [error, setError] = useState();
    
    const nagivateToPage = useNavigate();

    const isValidEmpty = () => {
        let isNameEmpty = author.name.trim().length === 0;
        let isBiographyEmpty = author.biography.trim().length === 0;

        let isInputValid = !isNameEmpty && !isBiographyEmpty;
        return isInputValid;
    }


    const isTooLong = (desc, limit) => {
        let descLength = desc.trim().length;
        return descLength > limit;
    }


    const handleChange = (e) => {
        setAuthor((prev) => (
                {...prev, [e.target.name]: e.target.value}
            )
        );
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            try {
                // Simple Input validation
                if (!isValidEmpty()) {
                    setError({
                        title: "Invalid Input",
                        message: "One or more input is empty / invalid!"
                    });
                    return;
                } 

                if (isTooLong(author.name, 45)) {
                    setError({
                        title: "Invalid Input",
                        message: "Name cannot be more than 45 characters long!"
                    });
                    return;
                } 

                if (isTooLong(author.biography, 200)) {
                    setError({
                        title: "Invalid Input",
                        message: "Biography cannot be more than 200 characters long!"
                    });
                    return;
                } 

                // Input valid, add to database
                await axios.post(path, author);
                
                // Nagivate back to home page after adding
                const homepage = "/view_authors";
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

    // Resets the error when user acknowlegdes
    const errorHandler = () => {
        setError(null);
    }

    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} handleError={errorHandler}></ErrorModal>}
            <div className={classes.input}>
                <h1>Add New Author</h1>
                <input type="text" placeholder='name' onChange={handleChange} name="name"></input>
                <input type="text" placeholder='biography' onChange={handleChange} name="biography"></input>
                <FormButton type="submit" onClick={handleClick}>Add</FormButton>
            </div>
            <div className='add-author__remark'>
                <p>Note: If the author already exists in our database, you won't be able to add it in, hence no visible change will be noticed!</p>
            </div>
        </div>
    )
}

export default AddAuthor;