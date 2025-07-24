import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  CircularProgress,
  Alert,
  Snackbar 
} from '@mui/material';
import BugForm from '../components/BugForm/BugForm';
import BugList from '../components/BugList/BugList';
import { getBugs, createBug, updateBug, deleteBug } from '../services/api';

const HomePage = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBug, setEditingBug] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        setLoading(true);
        const data = await getBugs();
        setBugs(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching bugs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  const handleCreateBug = async (bugData) => {
    try {
      const newBug = await createBug(bugData);
      setBugs(prev => [newBug, ...prev]);
      setEditingBug(null);
      setSnackbarMessage('Bug created successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      console.error('Error creating bug:', err);
    }
  };

  const handleUpdateBug = async (bugData) => {
    try {
      const updatedBug = await updateBug(editingBug._id, bugData);
      setBugs(prev => 
        prev.map(bug => bug._id === updatedBug._id ? updatedBug : bug)
      );
      setEditingBug(null);
      setSnackbarMessage('Bug updated successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      console.error('Error updating bug:', err);
    }
  };

  const handleDeleteBug = async (bugId) => {
    try {
      await deleteBug(bugId);
      setBugs(prev => prev.filter(bug => bug._id !== bugId));
      setSnackbarMessage('Bug deleted successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting bug:', err);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Bug Tracker
      </Typography>
      
      <BugForm 
        onSubmit={editingBug ? handleUpdateBug : handleCreateBug}
        initialData={editingBug}
      />
      
      <BugList 
        bugs={bugs} 
        onEdit={setEditingBug}
        onDelete={handleDeleteBug}
      />
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default HomePage;