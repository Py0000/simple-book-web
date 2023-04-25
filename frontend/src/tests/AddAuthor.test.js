import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import AddAuthor from '../commands/authors/AddAuthor';

jest.mock('axios');

describe('AddAuthor', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Test render Add Author form', () => {
        render(
            <BrowserRouter>
                <AddAuthor />
            </BrowserRouter>
        );
        
        const pageTitle = screen.getByText("Add New Author");
        const nameInput = screen.getByPlaceholderText('Enter name here');
        const biographyInput = screen.getByPlaceholderText('Enter biography here');
        const submitButton = screen.getByText('Add Author');
        const addBookButton = screen.getByText("Save Book's Details Here");
        const warningText = screen.getByText("Note: If the author already exists in our database, you won't be able to add it in, hence no visible change will be noticed!");
        const backButton = screen.getByText("Back");

        expect(pageTitle).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(biographyInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(addBookButton).toBeInTheDocument();
        expect(warningText).toBeInTheDocument();
        expect(backButton).toBeInTheDocument();
    });

    test('Test add a new author on button click', async () => {
        // Renders "AddAuthor" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddAuthor />
            </BrowserRouter>
        );

        // Set input values
        fireEvent.change(getByPlaceholderText('Enter name here'), { target: { value: 'Test Author Name' } });
        fireEvent.change(getByPlaceholderText('Enter biography here'), { target: { value: 'Test Author Biography' } });

        // Mock axios POST response
        // Should show success message
        axios.post.mockResolvedValue({ data: 'Author added successfully' });

        // Click add author button on the component 
        fireEvent.click(getByText('Add Author'));

        // Wait for the status modal to appear
        await waitFor(() => expect(screen.getByText('Added Author Status')).toBeInTheDocument());
        expect(screen.getByText('Author added successfully')).toBeInTheDocument();
    });

    test('Test error if input is null', async () => {
        // Renders "AddAuthor" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddAuthor />
            </BrowserRouter>
        );

        // Set invalid input values
        fireEvent.change(getByPlaceholderText('Enter name here'), { target: { value: '' } });
        fireEvent.change(getByPlaceholderText('Enter biography here'), { target: { value: 'Test Author Biography' } });

        // Click add author button on the component 
        fireEvent.click(getByText('Add Author'));

        // Wait for error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
        expect(screen.getByText('Author name should not be empty and should not have more than 45 characters')).toBeInTheDocument();
    });

    test('Test error if input exceeds length limit', async () => {
        // Renders "AddAuthor" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddAuthor />
            </BrowserRouter>
        );

        // Set invalid input values
        fireEvent.change(getByPlaceholderText('Enter name here'), { target: { value: 'Test Author' } });
        fireEvent.change(getByPlaceholderText('Enter biography here'), { target: { value: '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678902' } });

        // Click add author button on the component 
        fireEvent.click(getByText('Add Author'));

        // Wait for error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
        expect(screen.getByText('Author biography should not be empty and should not have more than 200 characters')).toBeInTheDocument();
    }); 
});
