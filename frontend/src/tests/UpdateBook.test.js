import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UpdateBook from '../commands/books/UpdateBook';
import * as frontendConstant from "../utils/BookUtils";


jest.mock('axios');

describe('UpdateBook component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Test render Update Book form', () => {
        render(
            <BrowserRouter>
                <UpdateBook />
            </BrowserRouter>
        );
        
        const pageTitle = screen.getByText(frontendConstant.UPDATE_BOOK_PAGE_TITLE);
        const titleInput = screen.getByPlaceholderText(frontendConstant.PLACEHOLDER_TITLE);
        const publisherInput = screen.getByPlaceholderText(frontendConstant.PLACEHOLDER_PUBLISHER);
        const yearInput = screen.getByPlaceholderText(frontendConstant.PLACEHOLDER_YEAR);
        const authorInput = screen.getByPlaceholderText(frontendConstant.PLACEHOLDER_AUTHORID);
        const submitButton = screen.getByText(frontendConstant.UPDATE_BOOK_BUTTON);
        
        expect(pageTitle).toBeInTheDocument();
        expect(titleInput).toBeInTheDocument();
        expect(publisherInput).toBeInTheDocument();
        expect(yearInput).toBeInTheDocument();
        expect(authorInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('Test update book when form is submitted', async () => {

        axios.put.mockResolvedValueOnce({ data: {} });
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <UpdateBook />
            </BrowserRouter>
        );

        await act(async () => {
            // Set input values via the elements on the component
            fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_TITLE), { target: { value: 'Test Updated Title' } });
            fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_PUBLISHER), { target: { value: 'Test Updated Publisher' } });
            fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_YEAR), { target: { value: 2021 } });
            fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_AUTHORID), { target: { value: 'Test Updated Author Id' } });
            
            // Click update book button on the component
            fireEvent.click(getByText(frontendConstant.UPDATE_BOOK_BUTTON));
        });

        const path = frontendConstant.BOOK_PATH + "/undefined"
        expect(axios.put).toHaveBeenCalledWith(path, {
            title: 'Test Updated Title',
            publisher: 'Test Updated Publisher',
            year: "2021",
            authorId: 'Test Updated Author Id',
        });
    });

    test('Test error message if atleast one input is invalid', async () => {
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <UpdateBook />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_TITLE), { target: { value: 'Test Title' } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_PUBLISHER), { target: { value: 'Test Publisher' } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_YEAR), { target: { value: 2022 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_AUTHORID), { target: { value: '01234567890123456789012345678901234567890123456789' } });

        // Click update book button on the component 
        fireEvent.click(getByText(frontendConstant.UPDATE_BOOK_BUTTON));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText(frontendConstant.ERROR_MODAL_TITLE)).toBeInTheDocument());
        expect(screen.getByText(frontendConstant.ERROR_MODAL_AUTHORID)).toBeInTheDocument();
    });
});
