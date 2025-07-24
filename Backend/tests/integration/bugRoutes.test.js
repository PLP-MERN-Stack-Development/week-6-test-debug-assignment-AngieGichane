const request = require('supertest');
const app = require('../../server');
const Bug = require('../../models/Bug');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

describe('Bug Routes Integration Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Bug.deleteMany({});
  });

  describe('GET /api/bugs', () => {
    it('should return all bugs', async () => {
      const testBugs = [
        { title: 'Bug 1', description: 'Description 1' },
        { title: 'Bug 2', description: 'Description 2' }
      ];
      await Bug.insertMany(testBugs);

      const response = await request(app).get('/api/bugs');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].title).toBe('Bug 1');
      expect(response.body[1].title).toBe('Bug 2');
    });

    it('should return empty array if no bugs', async () => {
      const response = await request(app).get('/api/bugs');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /api/bugs', () => {
    it('should create a new bug', async () => {
      const newBug = {
        title: 'New Bug',
        description: 'Bug description',
        status: 'open',
        priority: 'medium'
      };

      const response = await request(app)
        .post('/api/bugs')
        .send(newBug);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(newBug.title);
      expect(response.body.description).toBe(newBug.description);

      const bugs = await Bug.find();
      expect(bugs.length).toBe(1);
    });

    it('should return 400 for invalid data', async () => {
      const invalidBug = { title: '', description: '' };

      const response = await request(app)
        .post('/api/bugs')
        .send(invalidBug);

      expect(response.status).toBe(400);
      expect(response.body.title).toBe('Title is required');
      expect(response.body.description).toBe('Description is required');
    });
  });

  describe('PUT /api/bugs/:id', () => {
    it('should update an existing bug', async () => {
      const bug = await Bug.create({
        title: 'Original Bug',
        description: 'Original description',
        status: 'open'
      });

      const updatedData = {
        title: 'Updated Bug',
        description: 'Updated description',
        status: 'in-progress'
      };

      const response = await request(app)
        .put(`/api/bugs/${bug._id}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updatedData.title);
      expect(response.body.description).toBe(updatedData.description);
      expect(response.body.status).toBe(updatedData.status);
    });

    it('should return 404 for non-existent bug', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .put(`/api/bugs/${nonExistentId}`)
        .send({ title: 'Update Test' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Bug not found');
    });
  });

  describe('DELETE /api/bugs/:id', () => {
    it('should delete an existing bug', async () => {
      const bug = await Bug.create({
        title: 'Bug to delete',
        description: 'Will be deleted'
      });

      const response = await request(app)
        .delete(`/api/bugs/${bug._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Bug removed');

      const deletedBug = await Bug.findById(bug._id);
      expect(deletedBug).toBeNull();
    });

    it('should return 404 for non-existent bug', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/bugs/${nonExistentId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Bug not found');
    });
  });
});