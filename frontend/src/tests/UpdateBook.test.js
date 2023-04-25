import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UpdateBook from '../commands/books/UpdateBook';
import * as frontendConstant from "../utils/BookUtils";
import * as testConstant from './TestUtils/TestUtils';


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
            fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_TITLE), { target: { value: testConstant.TEST_TEXT_45 } });
            fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_PUBLISHER), { target: { value: testConstant.TEST_TEXT_45 } });
            fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_YEAR), { target: { value: testConstant.TEST_BOOK_YEAR } });
            fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_AUTHORID), { target: { value: testConstant.TEST_TEXT_45 } });
            
            // Click update book button on the component
            fireEvent.click(getByText(frontendConstant.UPDATE_BOOK_BUTTON));
        });

        const path = frontendConstant.BOOK_PATH + "/undefined"
        expect(axios.put).toHaveBeenCalledWith(path, {
            title: testConstant.TEST_TEXT_45,
            publisher: testConstant.TEST_TEXT_45,
            year: testConstant.TEST_BOOK_YEAR.toString(),
            authorId: testConstant.TEST_TEXT_45,
        });
    });

    test('Test error message if atleast one input is invalid', async () => {
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <UpdateBook />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_TITLE), { target: { value: testConstant.TEST_TEXT_45 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_PUBLISHER), { target: { value: testConstant.TEST_TEXT_45 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_YEAR), { target: { value: testConstant.TEST_BOOK_YEAR } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_AUTHORID), { target: { value: testConstant.TEST_TEXT_46 } });

        // Click update book button on the component 
        fireEvent.click(getByText(frontendConstant.UPDATE_BOOK_BUTTON));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText(frontendConstant.ERROR_MODAL_TITLE)).toBeInTheDocument());
        expect(screen.getByText(frontendConstant.ERROR_MODAL_AUTHORID)).toBeInTheDocument();
    });
});
