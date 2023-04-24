import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import AddAuthor from './AddAuthor';

jest.mock('axios');

describe('AddAuthor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Test add a new author on button click', async () => {
    // Renders "AddAuthor" component within MemoryRouter to simulate navigation to this component
    const { getByPlaceholderText, getByText } = render(
        <MemoryRouter>
            <AddAuthor />
        </MemoryRouter>
    );

    // Set input values
    fireEvent.change(getByPlaceholderText('Enter name here'), { target: { value: 'Test Author Name' } });
    fireEvent.change(getByPlaceholderText('Enter biography here'), { target: { value: 'Test Author Biography' } });

    // Mock axios POST response
    // Should show success message
    axios.post.mockResolvedValue({ data: 'Author added successfully' });

    // Click add author button on the component 
    fireEvent.click(getByText('Add Author'));

    // Wait for the status modal to appear
    await waitFor(() => expect(screen.getByText('Added Author Status')).toBeInTheDocument());
    expect(screen.getByText('Author added successfully')).toBeInTheDocument();
  });

  test('Test error if input is null', async () => {
    // Renders "AddAuthor" component within MemoryRouter to simulate navigation to this component
    const { getByPlaceholderText, getByText } = render(
        <MemoryRouter>
            <AddAuthor />
        </MemoryRouter>
    );

    // Set invalid input values
    fireEvent.change(getByPlaceholderText('Enter name here'), { target: { value: '' } });
    fireEvent.change(getByPlaceholderText('Enter biography here'), { target: { value: 'Test Author Biography' } });

    // Click add author button on the component 
    fireEvent.click(getByText('Add Author'));

    // Wait for error modal to appear
    // Should show error message
    await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
    expect(screen.getByText('One or more input is empty / invalid!')).toBeInTheDocument();
  });

  test('Test error if input exceeds length limit', async () => {
    // Renders "AddAuthor" component within MemoryRouter to simulate navigation to this component
    const { getByPlaceholderText, getByText } = render(
        <MemoryRouter>
            <AddAuthor />
        </MemoryRouter>
    );

    // Set invalid input values
    fireEvent.change(getByPlaceholderText('Enter name here'), { target: { value: 'Test Author' } });
    fireEvent.change(getByPlaceholderText('Enter biography here'), { target: { value: '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678902' } });

    // Click add author button on the component 
    fireEvent.click(getByText('Add Author'));

    // Wait for error modal to appear
    // Should show error message
    await waitFor(() => expect(screen.getByText('Invalid Input')).toBeInTheDocument());
    expect(screen.getByText('Biography cannot be more than 200 characters long!')).toBeInTheDocument();
  });
});
