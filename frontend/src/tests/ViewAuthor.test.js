import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ViewAuthors from '../commands/authors/ViewAuthors';

jest.mock('axios');

describe('ViewAuthor', () => {
    const mockedAuthors = [
        {name: 'Author 1', biography: 'Biography 1'},
        {name: 'Author 2', biography: 'Biography 2'},
        {name: 'Author 3', biography: 'Biography 3'},
    ];

    beforeEach(() => {
        axios.get.mockResolvedValue({ data: mockedAuthors });
    });
  
    test('Test renders ViewAuthor component', async () => {
        render(
            <BrowserRouter>
                <ViewAuthors />
            </BrowserRouter>
        );

        expect(screen.getByText('Authors in Simple CRUD Book Application')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Add Authors' })).toHaveAttribute('href', '/add_author');
        expect(screen.getByRole('link', { name: 'View All Books' })).toHaveAttribute('href', '/');
    });

    test('Test render a list of authors', async () => {
        render(
            <BrowserRouter>
                <ViewAuthors />
            </BrowserRouter>
        );

        // Wait for the data to load and the component to update
        await waitFor(() => {
            expect(screen.getByText('Author 1')).toBeInTheDocument();
            expect(screen.getByText('Biography 1')).toBeInTheDocument();
            expect(screen.getByText('Author 2')).toBeInTheDocument();
            expect(screen.getByText('Biography 2')).toBeInTheDocument();
            expect(screen.getByText('Author 3')).toBeInTheDocument();
            expect(screen.getByText('Biography 3')).toBeInTheDocument();
            const updateButtons = screen.getAllByRole('button', {name: /Update/});
            expect(updateButtons).toHaveLength(3);
            const deleteButtons = screen.getAllByRole('button', {name: /Delete/});
            expect(deleteButtons).toHaveLength(3);
        });
    });
});