import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';
import { getBugs, createBug, updateBug, deleteBug } from '../services/api';

// Mock the API functions
jest.mock('../services/api');

describe('HomePage', () => {
  const mockBugs = [
    {
      _id: '1',
      title: 'Test Bug 1',
      description: 'Description 1',
      status: 'open',
      priority: 'medium',
      createdAt: '2023-01-01T00:00:00.000Z'
    },
    {
      _id: '2',
      title: 'Test Bug 2',
      description: 'Description 2',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2023-01-02T00:00:00.000Z'
    }
  ];

  beforeEach(() => {
    getBugs.mockResolvedValue(mockBugs);
    createBug.mockResolvedValue({
      _id: '3',
      title: 'New Bug',
      description: 'New Description',
      status: 'open',
      priority: 'low'
    });
    updateBug.mockResolvedValue({
      ...mockBugs[0],
      title: 'Updated Bug',
      status: 'resolved'
    });
    deleteBug.mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state initially', async () => {
    render(<HomePage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    await waitFor(() => expect(getBugs).toHaveBeenCalledTimes(1));
  });

  it('displays bugs after loading', async () => {
    render(<HomePage />);
    await waitFor(() => expect(getBugs).toHaveBeenCalledTimes(1));
    
    expect(screen.getByText('Test Bug 1')).toBeInTheDocument();
    expect(screen.getByText('Test Bug 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('displays error message when fetching fails', async () => {
    getBugs.mockRejectedValue(new Error('Failed to fetch bugs'));
    render(<HomePage />);
    
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch bugs/i)).toBeInTheDocument();
    });
  });

  it('creates a new bug when form is submitted', async () => {
    render(<HomePage />);
    await waitFor(() => expect(getBugs).toHaveBeenCalledTimes(1));
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { name: 'title', value: 'New Bug' }
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { name: 'description', value: 'New Description' }
    });
    
    fireEvent.click(screen.getByText('Submit Bug'));
    
    await waitFor(() => expect(createBug).toHaveBeenCalledWith({
      title: 'New Bug',
      description: 'New Description',
      status: 'open',
      priority: 'medium'
    }));
    
    // Verify the new bug is added to the list
    await waitFor(() => {
      expect(screen.getByText('New Bug')).toBeInTheDocument();
    });
  });

  it('updates a bug when edit form is submitted', async () => {
    render(<HomePage />);
    await waitFor(() => expect(getBugs).toHaveBeenCalledTimes(1));
    
    // Click edit button on the first bug
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);
    
    // Verify form is in edit mode
    expect(screen.getByText('Update Bug')).toBeInTheDocument();
    
    // Change the title and status
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { name: 'title', value: 'Updated Bug' }
    });
    fireEvent.change(screen.getByLabelText('Status'), {
      target: { name: 'status', value: 'resolved' }
    });
    
    fireEvent.click(screen.getByText('Update Bug'));
    
    await waitFor(() => expect(updateBug).toHaveBeenCalledWith('1', {
      title: 'Updated Bug',
      description: 'Description 1',
      status: 'resolved',
      priority: 'medium'
    }));
    
    // Verify the bug is updated in the list
    await waitFor(() => {
      expect(screen.getByText('Updated Bug')).toBeInTheDocument();
      expect(screen.getByText('resolved')).toBeInTheDocument();
    });
  });

  it('deletes a bug when delete button is clicked', async () => {
    render(<HomePage />);
    await waitFor(() => expect(getBugs).toHaveBeenCalledTimes(1));
    
    // Click delete button on the second bug
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[1]);
    
    await waitFor(() => expect(deleteBug).toHaveBeenCalledWith('2'));
    
    // Verify the bug is removed from the list
    await waitFor(() => {
      expect(screen.queryByText('Test Bug 2')).not.toBeInTheDocument();
    });
  });
});