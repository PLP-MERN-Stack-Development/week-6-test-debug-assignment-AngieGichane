import { getBugs, createBug, updateBug, deleteBug } from './api';
import axios from 'axios';

jest.mock('axios');

describe('API Service', () => {
  const mockBug = {
    _id: '1',
    title: 'Test Bug',
    description: 'Test Description',
    status: 'open',
    priority: 'medium'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBugs', () => {
    it('should return bugs on successful request', async () => {
      axios.get.mockResolvedValue({ data: [mockBug] });
      
      const result = await getBugs();
      
      expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/bugs/');
      expect(result).toEqual([mockBug]);
    });

    it('should throw error on failed request', async () => {
      axios.get.mockRejectedValue({ 
        response: { data: { message: 'Failed to fetch bugs' } }
      });
      
      await expect(getBugs()).rejects.toThrow('Failed to fetch bugs');
    });
  });

  describe('createBug', () => {
    it('should create and return new bug', async () => {
      const newBug = {
        title: 'New Bug',
        description: 'New Description',
        status: 'open',
        priority: 'medium'
      };
      
      axios.post.mockResolvedValue({ data: mockBug });
      
      const result = await createBug(newBug);
      
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/bugs/',
        newBug
      );
      expect(result).toEqual(mockBug);
    });

    it('should throw error on failed creation', async () => {
      const newBug = { title: '', description: '' };
      axios.post.mockRejectedValue({ 
        response: { data: { message: 'Validation failed' } }
      });
      
      await expect(createBug(newBug)).rejects.toThrow('Validation failed');
    });
  });

  describe('updateBug', () => {
    it('should update and return updated bug', async () => {
      const updatedData = {
        title: 'Updated Bug',
        status: 'in-progress'
      };
      
      axios.put.mockResolvedValue({ 
        data: { ...mockBug, ...updatedData } 
      });
      
      const result = await updateBug('1', updatedData);
      
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:5000/api/bugs/1',
        updatedData
      );
      expect(result.title).toBe('Updated Bug');
      expect(result.status).toBe('in-progress');
    });

    it('should throw error on failed update', async () => {
      axios.put.mockRejectedValue({ 
        response: { data: { message: 'Bug not found' } }
      });
      
      await expect(updateBug('999', { title: 'Test' }))
        .rejects.toThrow('Bug not found');
    });
  });

  describe('deleteBug', () => {
    it('should delete bug successfully', async () => {
      axios.delete.mockResolvedValue({});
      
      await deleteBug('1');
      
      expect(axios.delete).toHaveBeenCalledWith(
        'http://localhost:5000/api/bugs/1'
      );
    });

    it('should throw error on failed deletion', async () => {
      axios.delete.mockRejectedValue({ 
        response: { data: { message: 'Bug not found' } }
      });
      
      await expect(deleteBug('999')).rejects.toThrow('Bug not found');
    });
  });
});