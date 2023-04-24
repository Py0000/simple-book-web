import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import AddBook from '../commands/books/AddBook';

// Mock the actual functionality of axios during testing
jest.mock('axios');

describe('AddBook', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Test render Add Book form', () => {
        render(
            <BrowserRouter>
            <   AddBook />
            </BrowserRouter>
        );
        
        const pageTitle = screen.getByText("Add a New Book");
        const titleInput = screen.getByPlaceholderText('Enter book title here');
        const publisherInput = screen.getByPlaceholderText('Enter book publisher here');
        const yearInput = screen.getByPlaceholderText('Enter published year here');
        const authorInput = screen.getByPlaceholderText('Enter book author here');
        const submitButton = screen.getByText('Add Book');
        const addAuthorButton = screen.getByText("Save Author's Details Here");
        const backButton = screen.getByText("Back");
        
        expect(pageTitle).toBeInTheDocument();
        expect(titleInput).toBeInTheDocument();
        expect(publisherInput).toBeInTheDocument();
        expect(yearInput).toBeInTheDocument();
        expect(authorInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(addAuthorButton).toBeInTheDocument();
        expect(backButton).toBeInTheDocument();
    });

    test('Test functionality of adding new book on button click', async () => {
        // Renders "AddBook" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddBook />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText('Enter book title here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter book publisher here'), { target: { value: 'Test Publisher' } });
        fireEvent.change(getByPlaceholderText('Enter published year here'), { target: { value: 2020 } });
        fireEvent.change(getByPlaceholderText('Enter book author here'), { target: { value: 'Test Author Id' } });

        // Mock axios POST response
        // Should show success message
        axios.post.mockResolvedValue({ data: 'Book added successfully' });

        // Click add book button on the component 
        fireEvent.click(getByText('Add Book'));

        // Wait for the status modal to appear 
        // Should show success message
        await waitFor(() => expect(screen.getByText('Added Book Status')).toBeInTheDocument());
        expect(screen.getByText('Book added successfully')).toBeInTheDocument();
    });

    test('Test error if input year is zero', async () => {
        // Renders "AddBook" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddBook />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText('Enter book title here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter book publisher here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter published year here'), { target: { value: `0b0000` } });
        fireEvent.change(getByPlaceholderText('Enter book author here'), { target: { value: 'Test Title' } });

        // Click add book button on the component 
        fireEvent.click(getByText('Add Book'));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
        expect(screen.getByText('One or more input is empty / invalid!')).toBeInTheDocument();
    });

    test('Test error if input year is negative', async () => {
        // Renders "AddBook" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddBook />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText('Enter book title here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter book publisher here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter published year here'), { target: { value: -1000 } });
        fireEvent.change(getByPlaceholderText('Enter book author here'), { target: { value: 'Test Title' } });

        // Click add book button on the component 
        fireEvent.click(getByText('Add Book'));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
        expect(screen.getByText('One or more input is empty / invalid!')).toBeInTheDocument();
    });

    test('Test error if input year does not have 4 digits', async () => {
        // Renders "AddBook" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddBook />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText('Enter book title here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter book publisher here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter published year here'), { target: { value: 22 } });
        fireEvent.change(getByPlaceholderText('Enter book author here'), { target: { value: 'Test Title' } });

        // Click add book button on the component 
        fireEvent.click(getByText('Add Book'));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
        expect(screen.getByText('One or more input is empty / invalid!')).toBeInTheDocument();
    });

    test('Test error if text-based input is null', async () => {
        // Renders "AddBook" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddBook />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText('Enter book title here'), { target: { value: '' } });
        fireEvent.change(getByPlaceholderText('Enter book publisher here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter published year here'), { target: { value: 2022 } });
        fireEvent.change(getByPlaceholderText('Enter book author here'), { target: { value: 'Test Title' } });

        // Click add book button on the component 
        fireEvent.click(getByText('Add Book'));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
        expect(screen.getByText('One or more input is empty / invalid!')).toBeInTheDocument();
    });

    test('Test error if text-based input is exceeds limit', async () => {
        // Renders "AddBook" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddBook />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText('Enter book title here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter book publisher here'), { target: { value: '01234567890123456789012345678901234567890123456789' } });
        fireEvent.change(getByPlaceholderText('Enter published year here'), { target: { value: 2022 } });
        fireEvent.change(getByPlaceholderText('Enter book author here'), { target: { value: 'Test Title' } });

        // Click add book button on the component 
        fireEvent.click(getByText('Add Book'));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
        expect(screen.getByText('Publisher cannot be more than 45 characters long!')).toBeInTheDocument();
    });
});