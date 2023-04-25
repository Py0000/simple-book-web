import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UpdateAuthor from '../commands/authors/UpdateAuthor';

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
        
        const pageTitle = screen.getByText("Update Existing Author");
        const nameInput = screen.getByPlaceholderText('Enter name here');
        const biographyInput = screen.getByPlaceholderText('Enter biography here');
        const submitButton = screen.getByText('Update Author');
        
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
            fireEvent.change(getByPlaceholderText('Enter name here'), { target: { value: 'Test Updated Name' } });
            fireEvent.change(getByPlaceholderText('Enter biography here'), { target: { value: 'Test Updated Biography' } });
            
            // Click update author button on the component
            fireEvent.click(getByText('Update Author'));
        });

        expect(axios.put).toHaveBeenCalledWith(`http://localhost:9000/authors/undefined`, {
            name: 'Test Updated Name',
            biography: 'Test Updated Biography',
        });
    });

    test('Test error message if atleast one input is invalid', async () => {
        const { getByPlaceholderText, getByText } = render(
            <BrowserRouter>
                <UpdateAuthor />
            </BrowserRouter>
        );

        // Set input values via the elements on the component
        fireEvent.change(getByPlaceholderText('Enter name here'), { target: { value: 'Test Updated Name' } });
        fireEvent.change(getByPlaceholderText('Enter biography here'), { target: { value: '' } });
            

        // Click update author button on the component 
        fireEvent.click(getByText('Update Author'));

        // Wait for the error modal to appear
        // Should show error message
        await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
        expect(screen.getByText('Author biography should not be empty and should not have more than 200 characters')).toBeInTheDocument();
    });
});