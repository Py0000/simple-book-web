import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ViewBook from '../commands/books/ViewBook';
import * as frontendConstant from "../utils/BookUtils";
import * as linkConstant from '../utils/LinkUtils';
import { TEST_MOCKED_BOOKS } from './TestUtils/TestUtils';

jest.mock('axios');

describe('ViewBook', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: TEST_MOCKED_BOOKS });
    });
  
    test('Test renders ViewBook component', async () => {
        render(
            <BrowserRouter>
                <ViewBook />
            </BrowserRouter>
        );

        expect(screen.getByText(frontendConstant.VIEW_BOOK_PAGE_TITLE)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: frontendConstant.ADD_BOOK_BUTTON })).toHaveAttribute('href', linkConstant.ADD_BOOK_LINK);
        expect(screen.getByRole('link', { name: frontendConstant.ALL_AUTHORS_BUTTON })).toHaveAttribute('href', linkConstant.VIEW_AUTHOR_LINK);
    });

    test('Test render a list of books', async () => {
        render(
            <BrowserRouter>
                <ViewBook />
            </BrowserRouter>
        );

        // Wait for the data to load and the component to update
        await waitFor(() => {
            expect(screen.getByText('Book 1')).toBeInTheDocument();
            expect(screen.getByText('Publisher 1')).toBeInTheDocument();
            expect(screen.getByText('2021')).toBeInTheDocument();
            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('Book 2')).toBeInTheDocument();
            expect(screen.getByText('2022')).toBeInTheDocument();
            expect(screen.getByText('Publisher 2')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
            expect(screen.getByText('Book 3')).toBeInTheDocument();
            expect(screen.getByText('Publisher 3')).toBeInTheDocument();
            expect(screen.getByText('2023')).toBeInTheDocument();
            expect(screen.getByText('3')).toBeInTheDocument();
            const updateButtons = screen.getAllByRole('button', {name: /Update/});
            expect(updateButtons).toHaveLength(3);
            const deleteButtons = screen.getAllByRole('button', {name: /Delete/});
            expect(deleteButtons).toHaveLength(3);
        });
    });
});
