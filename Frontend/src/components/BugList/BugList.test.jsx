import React from 'react';
import { render, screen } from '@testing-library/react';
import BugList from './BugList';

describe('BugList', () => {
  const mockBugs = [
    {
      _id: '1',
      title: 'First Bug',
      description: 'First bug description',
      status: 'open',
      priority: 'medium',
      createdAt: '2023-01-01T00:00:00.000Z'
    },
    {
      _id: '2',
      title: 'Second Bug',
      description: 'Second bug description',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2023-01-02T00:00:00.000Z'
    }
  ];

  const mockEdit = jest.fn();
  const mockDelete = jest.fn();

  it('renders a message when no bugs are present', () => {
    render(<BugList bugs={[]} onEdit={mockEdit} onDelete={mockDelete} />);
    expect(screen.getByText('No bugs reported yet. Be the first to report one!')).toBeInTheDocument();
  });

  it('renders a list of bugs', () => {
    render(<BugList bugs={mockBugs} onEdit={mockEdit} onDelete={mockDelete} />);
    
    expect(screen.getByText('First Bug')).toBeInTheDocument();
    expect(screen.getByText('First bug description')).toBeInTheDocument();
    expect(screen.getByText('Second Bug')).toBeInTheDocument();
    expect(screen.getByText('Second bug description')).toBeInTheDocument();
    
    // Check status and priority chips
    expect(screen.getByText('open')).toBeInTheDocument();
    expect(screen.getByText('in-progress')).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
    
    // Check edit and delete buttons (2 bugs × 2 buttons each = 4 buttons)
    expect(screen.getAllByRole('button', { name: /edit|delete/i })).toHaveLength(4);
  });

  it('calls onEdit with the correct bug when edit button is clicked', () => {
    render(<BugList bugs={mockBugs} onEdit={mockEdit} onDelete={mockDelete} />);
    
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);
    
    expect(mockEdit).toHaveBeenCalledWith(mockBugs[0]);
  });

  it('calls onDelete with the correct id when delete button is clicked', () => {
    render(<BugList bugs={mockBugs} onEdit={mockEdit} onDelete={mockDelete} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[1]);
    
    expect(mockDelete).toHaveBeenCalledWith('2');
  });
});