import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from './BugForm';

describe('BugForm', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders the form with empty fields by default', () => {
    render(<BugForm onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Description')).toHaveValue('');
    expect(screen.getByLabelText('Status')).toHaveValue('open');
    expect(screen.getByLabelText('Priority')).toHaveValue('medium');
    expect(screen.getByText('Report New Bug')).toBeInTheDocument();
  });

  it('renders with initial data when provided', () => {
    const initialData = {
      title: 'Existing Bug',
      description: 'Existing description',
      status: 'in-progress',
      priority: 'high'
    };
    
    render(<BugForm onSubmit={mockSubmit} initialData={initialData} />);
    
    expect(screen.getByLabelText('Title')).toHaveValue(initialData.title);
    expect(screen.getByLabelText('Description')).toHaveValue(initialData.description);
    expect(screen.getByLabelText('Status')).toHaveValue(initialData.status);
    expect(screen.getByLabelText('Priority')).toHaveValue(initialData.priority);
    expect(screen.getByText('Update Bug')).toBeInTheDocument();
  });

  it('validates required fields', () => {
    render(<BugForm onSubmit={mockSubmit} />);
    
    fireEvent.click(screen.getByText('Submit Bug'));
    
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with form data when valid', () => {
    render(<BugForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Title'), { 
      target: { name: 'title', value: 'Test Bug' } 
    });
    fireEvent.change(screen.getByLabelText('Description'), { 
      target: { name: 'description', value: 'Test description' } 
    });
    fireEvent.change(screen.getByLabelText('Status'), { 
      target: { name: 'status', value: 'in-progress' } 
    });
    fireEvent.change(screen.getByLabelText('Priority'), { 
      target: { name: 'priority', value: 'high' } 
    });
    
    fireEvent.click(screen.getByText('Submit Bug'));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Test Bug',
      description: 'Test description',
      status: 'in-progress',
      priority: 'high'
    });
  });

  it('clears errors when user starts typing', () => {
    render(<BugForm onSubmit={mockSubmit} />);
    
    // Trigger validation errors
    fireEvent.click(screen.getByText('Submit Bug'));
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    
    // Start typing in title field
    fireEvent.change(screen.getByLabelText('Title'), { 
      target: { name: 'title', value: 'T' } 
    });
    
    expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
  });
});