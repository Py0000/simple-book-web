import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import AddBook from '../commands/books/AddBook';
import * as frontendConstant from "../utils/BookUtils";
import * as testConstant from './TestUtils/TestUtils';

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
        
        const pageTitle = screen.getByText(frontendConstant.ADD_BOOK_PAGE_TTTLE);
        const titleInput = screen.getByPlaceholderText(frontendConstant.PLACEHOLDER_TITLE);
        const publisherInput = screen.getByPlaceholderText(frontendConstant.PLACEHOLDER_PUBLISHER);
        const yearInput = screen.getByPlaceholderText(frontendConstant.PLACEHOLDER_YEAR);
        const authorInput = screen.getByPlaceholderText(frontendConstant.PLACEHOLDER_AUTHORID);
        const submitButton = screen.getByText(frontendConstant.ADD_BOOK_BUTTON);
        const addAuthorButton = screen.getByText(frontendConstant.SAVE_AUTHOR_DETAILS);
        const backButton = screen.getByText(frontendConstant.BACK_BUTTON);
        
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
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_TITLE), { target: { value: testConstant.TEST_TEXT_45 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_PUBLISHER), { target: { value: testConstant.TEST_TEXT_45 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_YEAR), { target: { value: testConstant.TEST_BOOK_YEAR } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_AUTHORID), { target: { value: testConstant.TEST_TEXT_45 } });

        // Mock axios POST response
        // Should show success message
        axios.post.mockResolvedValue({ data: 'Book added successfully' });

        // Click add book button on the component 
        fireEvent.click(getByText(frontendConstant.ADD_BOOK_BUTTON));

        // Wait for the status modal to appear 
        // Should show success message
        await waitFor(() => expect(screen.getByText(frontendConstant.STATUS_MODAL_TITLE)).toBeInTheDocument());
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
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_TITLE), { target: { value: testConstant.TEST_TEXT_45 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_PUBLISHER), { target: { value: testConstant.TEST_TEXT_45 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_YEAR), { target: { value: testConstant.YEAR_ZERO } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_AUTHORID), { target: { value: testConstant.TEST_TEXT_45 } });

        // Click add book button on the component 
        fireEvent.click(getByText(frontendConstant.ADD_BOOK_BUTTON));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText(frontendConstant.ERROR_MODAL_TITLE)).toBeInTheDocument());
        expect(screen.getByText(frontendConstant.ERROR_MODAL_YEAR)).toBeInTheDocument();
    });

    test('Test error if input year is negative', async () => {
        // Renders "AddBook" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddBook />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_TITLE), { target: { value: testConstant.TEST_TEXT_45 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_PUBLISHER), { target: { value: testConstant.TEST_TEXT_45 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_YEAR), { target: { value: testConstant.YEAR_NEGATIVE} });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_AUTHORID), { target: { value: testConstant.TEST_TEXT_45 } });

        // Click add book button on the component 
        fireEvent.click(getByText(frontendConstant.ADD_BOOK_BUTTON));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText(frontendConstant.ERROR_MODAL_TITLE)).toBeInTheDocument());
        expect(screen.getByText(frontendConstant.ERROR_MODAL_YEAR)).toBeInTheDocument();
    });

    test('Test error if input year does not have 4 digits', async () => {
        // Renders "AddBook" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddBook />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_TITLE), { target: { value: testConstant.TEST_TEXT_45 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_PUBLISHER), { target: { value: testConstant.TEST_TEXT_45 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_YEAR), { target: { value: testConstant.YEAR_NON_FOUR } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_AUTHORID), { target: { value: testConstant.TEST_TEXT_45 } });

        // Click add book button on the component 
        fireEvent.click(getByText(frontendConstant.ADD_BOOK_BUTTON));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText(frontendConstant.ERROR_MODAL_TITLE)).toBeInTheDocument());
        expect(screen.getByText(frontendConstant.ERROR_MODAL_YEAR)).toBeInTheDocument();
    });

    test('Test error if text-based input is null', async () => {
        // Renders "AddBook" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddBook />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_TITLE), { target: { value: '' } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_PUBLISHER), { target: { value: testConstant.TEST_TEXT_45 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_YEAR), { target: { value: testConstant.TEST_BOOK_YEAR } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_AUTHORID), { target: { value: testConstant.TEST_TEXT_45 } });

        // Click add book button on the component 
        fireEvent.click(getByText(frontendConstant.ADD_BOOK_BUTTON));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText(frontendConstant.ERROR_MODAL_TITLE)).toBeInTheDocument());
        expect(screen.getByText(frontendConstant.ERROR_MODAL_BOOK)).toBeInTheDocument();
    });

    test('Test error if text-based input is exceeds limit', async () => {
        // Renders "AddBook" component within BrowserRouter to simulate navigation to this component
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <AddBook />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_TITLE), { target: { value: testConstant.TEST_TEXT_45 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_PUBLISHER), { target: { value: testConstant.TEST_TEXT_46 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_YEAR), { target: { value: testConstant.TEST_BOOK_YEAR } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_AUTHORID), { target: { value: testConstant.TEST_TEXT_45 } });

        // Click add book button on the component 
        fireEvent.click(getByText(frontendConstant.ADD_BOOK_BUTTON));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText(frontendConstant.ERROR_MODAL_TITLE)).toBeInTheDocument());
        expect(screen.getByText(frontendConstant.ERROR_MODAL_PUBLISHER)).toBeInTheDocument();
    });
});