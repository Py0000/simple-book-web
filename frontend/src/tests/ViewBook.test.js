import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ViewBook from '../commands/books/ViewBook';

jest.mock('axios');

describe('ViewBook', () => {
    const mockedBooks = [
        {title: 'Book 1', publisher: 'Publisher 1', year: 2021, authorId: "1" },
        {title: 'Book 2', publisher: 'Publisher 2', year: 2022, authorId: "2" },
        {title: 'Book 3', publisher: 'Publisher 3', year: 2023, authorId: "3" },
    ];

    beforeEach(() => {
        axios.get.mockResolvedValue({ data: mockedBooks });
    });
  
    test('Test renders ViewBook component', async () => {
        render(
            <BrowserRouter>
                <ViewBook />
            </BrowserRouter>
        );

        expect(screen.getByText('Simple CRUD Book Application')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Add Book' })).toHaveAttribute('href', '/addbook');
        expect(screen.getByRole('link', { name: 'View All Authors' })).toHaveAttribute('href', '/view_authors');
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
