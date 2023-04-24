import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import classes from '../../ui/Form.module.css';
import FormButton from '../../ui/FormButton';
import Modal from '../../ui/Modal';
import '../../ui/AddAuthor.css';
import '../../ui/AddBook.css';

const AddAuthor = () => {
    const path = "http://localhost:9000/authors";

    const [author, setAuthor] = useState({
        name: "",
        biography: ""
    });

    const [error, setError] = useState();
    
    const [status, setStatus] = useState();

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
                let res = await axios.post(path, author);
                
                setStatus({
                    title: "Added Author Status",
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
            <button className='add-back__button'><Link to="/view_authors">Back</Link></button>
            <div className={classes.input}>
                <h1>Add New Author</h1>
                <input type="text" placeholder='Enter name here' onChange={handleChange} name="name"></input>
                <input type="text" placeholder='Enter biography here' onChange={handleChange} name="biography"></input>
                <FormButton type="submit" onClick={handleClick}>Add Author</FormButton>
                <button className='add-other__button'><Link to="/addbook">Save Book's Details Here</Link></button>
            </div>
            <div className='add-author__remark'>
                <p>Note: If the author already exists in our database, you won't be able to add it in, hence no visible change will be noticed!</p>
            </div>
        </div>
    )
}

export default AddAuthor;