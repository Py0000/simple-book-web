import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UpdateBook from '../commands/books/UpdateBook';

jest.mock('axios');

describe('UpdateBook component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Test render Update Book form', () => {
        render(
            <MemoryRouter>
                <UpdateBook />
            </MemoryRouter>
        );

        const titleInput = screen.getByPlaceholderText('Enter book title here');
        const publisherInput = screen.getByPlaceholderText('Enter book publisher here');
        const yearInput = screen.getByPlaceholderText('Enter published year here');
        const authorInput = screen.getByPlaceholderText('Enter book author here');
        const submitButton = screen.getByText('Update Book');

        expect(titleInput).toBeInTheDocument();
        expect(publisherInput).toBeInTheDocument();
        expect(yearInput).toBeInTheDocument();
        expect(authorInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('Test update book when form is submitted', async () => {

        axios.put.mockResolvedValueOnce({ data: {} });
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
                <UpdateBook />
            </MemoryRouter>
        );

        await act(async () => {
            // Set input values via the elements on the component
            fireEvent.change(getByPlaceholderText('Enter book title here'), { target: { value: 'Test Updated Title' } });
            fireEvent.change(getByPlaceholderText('Enter book publisher here'), { target: { value: 'Test Updated Publisher' } });
            fireEvent.change(getByPlaceholderText('Enter published year here'), { target: { value: 2021 } });
            fireEvent.change(getByPlaceholderText('Enter book author here'), { target: { value: 'Test Updated Author Id' } });
            
            // Click update book button on the component
            fireEvent.click(getByText('Update Book'));
        });

        expect(axios.put).toHaveBeenCalledWith(`http://localhost:9000/books/undefined`, {
            title: 'Test Updated Title',
            publisher: 'Test Updated Publisher',
            year: "2021",
            authorId: 'Test Updated Author Id',
        });
    });

    test('Test error message if atleast one input is invalid', async () => {
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
                <UpdateBook />
            </MemoryRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText('Enter book title here'), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText('Enter book publisher here'), { target: { value: 'Test Publisher' } });
        fireEvent.change(getByPlaceholderText('Enter published year here'), { target: { value: 2022 } });
        fireEvent.change(getByPlaceholderText('Enter book author here'), { target: { value: '01234567890123456789012345678901234567890123456789' } });

        // Click update book button on the component 
        fireEvent.click(getByText('Update Book'));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
        expect(screen.getByText('AuthorId cannot be more than 45 characters long!')).toBeInTheDocument();
    });
});
