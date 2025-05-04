import React, { useState, useEffect } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography
} from '@mui/material';

const TodoForm = ({ item, onSave, onCancel, isLoading }) => {
  const [newItem, setNewItem] = useState({ title: '', author: '', year: '' });

  useEffect(() => {
    setNewItem(item || { title: '', author: '', year: '' });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!newItem.title || !newItem.author || !newItem.year) return;
    onSave(newItem);
  };

  return (
    <>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {item?._id ? 'Edit Book' : 'Add New Book'}
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ px: 4, py: 2 }}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            name="title"
            label="Title"
            value={newItem.title}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            placeholder="Enter the title"
          />
          <TextField
            name="author"
            label="Author"
            value={newItem.author}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            placeholder="Enter the author"
          />
          <TextField
            name="year"
            label="Year"
            value={newItem.year}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            placeholder="Enter the year"
            type="number"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3 }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{
            minWidth: 100,
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          {isLoading ? <CircularProgress size={22} /> : 'Save'}
        </Button>
        <Button
          onClick={onCancel}
          variant="outlined"
          color="secondary"
          sx={{ textTransform: 'none' }}
        >
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default TodoForm;
