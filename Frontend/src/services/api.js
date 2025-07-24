import axios from 'axios';

const API_URL = 'http://localhost:5000/api/bugs';

// Set up axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper function to handle errors
const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new Error(error.response.data.message || 'Something went wrong');
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response from server. Please try again.');
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error(error.message || 'Something went wrong');
  }
};

// Get all bugs
export const getBugs = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Create a new bug
export const createBug = async (bugData) => {
  try {
    const response = await api.post('/', bugData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Update a bug
export const updateBug = async (id, bugData) => {
  try {
    const response = await api.put(`/${id}`, bugData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Delete a bug
export const deleteBug = async (id) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    handleError(error);
  }
};