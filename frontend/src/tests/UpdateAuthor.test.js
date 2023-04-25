import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UpdateAuthor from '../commands/authors/UpdateAuthor';
import * as frontendConstant from "../utils/AuthorUtils";
import { TEST_TEXT_200, TEST_TEXT_45 } from './TestUtils/TestUtils';

jest.mock('axios');


describe('UpdateAuthor component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Test render Update Author form', () => {
        render(
            <BrowserRouter>
                <UpdateAuthor />
            </BrowserRouter>
        );
        
        const pageTitle = screen.getByText(frontendConstant.UPDATE_AUTHOR_PAGE_TTTLE);
        const nameInput = screen.getByPlaceholderText(frontendConstant.PLACEHOLDER_NAME);
        const biographyInput = screen.getByPlaceholderText(frontendConstant.PLACEHOLDER_BIO);
        const submitButton = screen.getByText(frontendConstant.UPDATE_AUTHOR_BUTTON);
        
        expect(pageTitle).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(biographyInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('Test update author when form is submitted', async () => {

        axios.put.mockResolvedValueOnce({ data: {} });
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <UpdateAuthor />
            </BrowserRouter>
        );

        await act(async () => {
            // Set input values via the elements on the component
            fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_NAME), { target: { value: TEST_TEXT_45 } });
            fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_BIO), { target: { value: TEST_TEXT_200 } });
            
            // Click update author button on the component
            fireEvent.click(getByText(frontendConstant.UPDATE_AUTHOR_BUTTON));
        });

        const path = frontendConstant.AUTHOR_PATH + frontendConstant.PATH_DELIMITER + `undefined`;
        expect(axios.put).toHaveBeenCalledWith(path , {
            name: TEST_TEXT_45,
            biography: TEST_TEXT_200,
        });
    });

    test('Test error message if atleast one input is invalid', async () => {
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <UpdateAuthor />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_NAME), { target: { value: TEST_TEXT_45 } });
        fireEvent.change(getByPlaceholderText(frontendConstant.PLACEHOLDER_BIO), { target: { value: '' } });
            

        // Click update author button on the component 
        fireEvent.click(getByText(frontendConstant.UPDATE_AUTHOR_BUTTON));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText(frontendConstant.ERROR_MODAL_TITLE)).toBeInTheDocument());
        expect(screen.getByText(frontendConstant.ERROR_AUTHOR_BIO)).toBeInTheDocument();
    });
});