import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Chip, 
  IconButton, 
  Paper,
  Box,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const statusColors = {
  open: 'default',
  'in-progress': 'primary',
  resolved: 'success'
};

const priorityColors = {
  low: 'success',
  medium: 'warning',
  high: 'error'
};

const BugList = ({ bugs, onEdit, onDelete }) => {
  if (bugs.length === 0) {
    return (
      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
        No bugs reported yet. Be the first to report one!
      </Typography>
    );
  }

  return (
    <Paper elevation={2} sx={{ mt: 4 }}>
      <List>
        {bugs.map((bug, index) => (
          <React.Fragment key={bug._id}>
            <ListItem
              secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => onEdit(bug)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => onDelete(bug._id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" component="span">
                      {bug.title}
                    </Typography>
                    <Chip 
                      label={bug.status} 
                      size="small" 
                      color={statusColors[bug.status]} 
                      sx={{ ml: 1 }} 
                    />
                    <Chip 
                      label={bug.priority} 
                      size="small" 
                      color={priorityColors[bug.priority]} 
                      sx={{ ml: 1 }} 
                    />
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.primary">
                      {bug.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Created: {new Date(bug.createdAt).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < bugs.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default BugList;