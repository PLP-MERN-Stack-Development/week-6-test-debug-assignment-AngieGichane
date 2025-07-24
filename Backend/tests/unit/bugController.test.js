const { 
  getBugs, 
  createBug, 
  updateBug, 
  deleteBug 
} = require('../../controllers/bugController');
const Bug = require('../../models/Bug');
const { validateBugInput } = require('../../utils/validation');

jest.mock('../../models/Bug');
jest.mock('../../utils/validation');

describe('Bug Controller Unit Tests', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = { 
      params: {}, 
      body: {} 
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBugs', () => {
    it('should return all bugs', async () => {
      const mockBugs = [
        { title: 'Bug 1', description: 'Description 1' },
        { title: 'Bug 2', description: 'Description 2' }
      ];
      Bug.find.mockResolvedValue(mockBugs);

      await getBugs(mockReq, mockRes, mockNext);

      expect(Bug.find).toHaveBeenCalledWith();
      expect(Bug.find).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockBugs);
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      Bug.find.mockRejectedValue(error);

      await getBugs(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('createBug', () => {
    it('should create a new bug with valid data', async () => {
      const mockBugData = {
        title: 'New Bug',
        description: 'Bug description',
        status: 'open',
        priority: 'medium'
      };
      const mockBug = { ...mockBugData, _id: '123', save: jest.fn().mockResolvedValue(true) };
      
      mockReq.body = mockBugData;
      validateBugInput.mockReturnValue({ errors: {}, isValid: true });
      Bug.mockImplementation(() => mockBug);

      await createBug(mockReq, mockRes, mockNext);

      expect(validateBugInput).toHaveBeenCalledWith(mockBugData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockBug);
    });

    it('should return validation errors for invalid data', async () => {
      const mockBugData = { title: '', description: '' };
      const validationErrors = {
        errors: { 
          title: 'Title is required',
          description: 'Description is required'
        },
        isValid: false
      };
      
      mockReq.body = mockBugData;
      validateBugInput.mockReturnValue(validationErrors);

      await createBug(mockReq, mockRes, mockNext);

      expect(validateBugInput).toHaveBeenCalledWith(mockBugData);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(validationErrors.errors);
    });
  });

  describe('updateBug', () => {
    it('should update an existing bug', async () => {
      const mockBugData = {
        title: 'Updated Bug',
        description: 'Updated description',
        status: 'in-progress'
      };
      const updatedBug = { ...mockBugData, _id: '123' };
      
      mockReq.params.id = '123';
      mockReq.body = mockBugData;
      validateBugInput.mockReturnValue({ errors: {}, isValid: true });
      Bug.findByIdAndUpdate.mockResolvedValue(updatedBug);

      await updateBug(mockReq, mockRes, mockNext);

      expect(validateBugInput).toHaveBeenCalledWith(mockBugData);
      expect(Bug.findByIdAndUpdate).toHaveBeenCalledWith(
        '123',
        mockBugData,
        { new: true, runValidators: true }
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(updatedBug);
    });

    it('should return 404 if bug not found', async () => {
      mockReq.params.id = 'nonexistent';
      mockReq.body = { title: 'Test' };
      validateBugInput.mockReturnValue({ errors: {}, isValid: true });
      Bug.findByIdAndUpdate.mockResolvedValue(null);

      await updateBug(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Bug not found' });
    });
  });

  describe('deleteBug', () => {
    it('should delete an existing bug', async () => {
      const mockBug = { _id: '123', title: 'Bug to delete' };
      
      mockReq.params.id = '123';
      Bug.findByIdAndDelete.mockResolvedValue(mockBug);

      await deleteBug(mockReq, mockRes, mockNext);

      expect(Bug.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Bug removed' });
    });

    it('should return 404 if bug not found', async () => {
      mockReq.params.id = 'nonexistent';
      Bug.findByIdAndDelete.mockResolvedValue(null);

      await deleteBug(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Bug not found' });
    });
  });
});