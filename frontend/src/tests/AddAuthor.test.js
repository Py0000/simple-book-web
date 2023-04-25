import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import AddAuthor from '../commands/authors/AddAuthor';
import * as frontendConstant from "../utils/AuthorUtils";

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
        
        const pageTitle = screen.getByText(frontendConstant.ADD_AUTHOR_PAGE_TTTLE);
        const nameInput = screen.getByPlaceholderText(frontendConstant.PLACEHOLDER_NAME);
        const biographyInput = screen.getByPlaceholderText(frontendConstant.PLACEHOLDER_BIO);
        const submitButton = screen.getByText(frontendConstant.ADD_AUTHOR_BUTTON);
        const addBookButton = screen.getByText(frontendConstant.SAVE_BOOK_DETAILS);
        const warningText = screen.getByText(frontendConstant.WARNING_MSG);
        const backButton = screen.getByText(frontendConstant.BACK_BUTTON);

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
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_NAME), { target: { value: 'Test Author Name' } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_BIO), { target: { value: 'Test Author Biography' } });

        // Mock axios POST response
        // Should show success message
        axios.post.mockResolvedValue({ data: 'Author added successfully' });

        // Click add author button on the component 
        fireEvent.click(getByText(frontendConstant.ADD_AUTHOR_BUTTON));

        // Wait for the status modal to appear
        await waitFor(() => expect(screen.getByText(frontendConstant.STATUS_MODAL_TITLE)).toBeInTheDocument());
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
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_NAME), { target: { value: '' } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_BIO), { target: { value: 'Test Author Biography' } });

        // Click add author button on the component 
        fireEvent.click(getByText(frontendConstant.ADD_AUTHOR_BUTTON));

        // Wait for error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText(frontendConstant.ERROR_MODAL_TITLE)).toBeInTheDocument());
        expect(screen.getByText(frontendConstant.ERROR_AUTHOR_NAME)).toBeInTheDocument();
    });

    test('Test error if input exceeds length limit', async () => {
        // Renders "AddAuthor" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddAuthor />
            </BrowserRouter>
        );

        // Set invalid input values
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_NAME), { target: { value: 'Test Author' } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_BIO), { target: { value: '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678902' } });

        // Click add author button on the component 
        fireEvent.click(getByText(frontendConstant.ADD_AUTHOR_BUTTON));

        // Wait for error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText(frontendConstant.ERROR_MODAL_TITLE)).toBeInTheDocument());
        expect(screen.getByText(frontendConstant.ERROR_AUTHOR_BIO)).toBeInTheDocument();
    }); 
});
