import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import AddBook from './AddBook';

// Mock the actual functionality of axios during testing
jest.mock('axios');

describe('AddBook', () => {
    
    test('Test functionality of adding new book', async () => {
        // Renders "AddBook" component within MemoryRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
                <AddBook />
            </MemoryRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText('Enter book title here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter book publisher here'), { target: { value: 'Test Publisher' } });
        fireEvent.change(getByPlaceholderText('Enter published year here'), { target: { value: '2020' } });
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

    test('should show an error if input year is zero', async () => {
        // Renders "AddBook" component within MemoryRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
            <AddBook />
            </MemoryRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText('Enter book title here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter book publisher here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter published year here'), { target: { value: '0000' } });
        fireEvent.change(getByPlaceholderText('Enter book author here'), { target: { value: 'Test Title' } });

        // Click add book button on the component 
        fireEvent.click(getByText('Add Book'));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
        expect(screen.getByText('One or more input is empty / invalid!')).toBeInTheDocument();
    });

    test('should show an error if input year is negative', async () => {
        // Renders "AddBook" component within MemoryRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
            <AddBook />
            </MemoryRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText('Enter book title here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter book publisher here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter published year here'), { target: { value: '-1000' } });
        fireEvent.change(getByPlaceholderText('Enter book author here'), { target: { value: 'Test Title' } });

        // Click add book button on the component 
        fireEvent.click(getByText('Add Book'));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
        expect(screen.getByText('One or more input is empty / invalid!')).toBeInTheDocument();
    });

    test('should show an error if input year does not have 4 digits', async () => {
        // Renders "AddBook" component within MemoryRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
            <AddBook />
            </MemoryRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText('Enter book title here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter book publisher here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter published year here'), { target: { value: '22' } });
        fireEvent.change(getByPlaceholderText('Enter book author here'), { target: { value: 'Test Title' } });

        // Click add book button on the component 
        fireEvent.click(getByText('Add Book'));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
        expect(screen.getByText('One or more input is empty / invalid!')).toBeInTheDocument();
    });

    test('should show an error if text-based input is invalid', async () => {
        // Renders "AddBook" component within MemoryRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
            <AddBook />
            </MemoryRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText('Enter book title here'), { target: { value: '' } });
        fireEvent.change(getByPlaceholderText('Enter book publisher here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter published year here'), { target: { value: '2022' } });
        fireEvent.change(getByPlaceholderText('Enter book author here'), { target: { value: 'Test Title' } });

        // Click add book button on the component 
        fireEvent.click(getByText('Add Book'));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
        expect(screen.getByText('One or more input is empty / invalid!')).toBeInTheDocument();
    });
});