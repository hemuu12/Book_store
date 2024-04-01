import React, { useState } from 'react';
import { DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress } from '@mui/material';

const TodoForm = ({ item, onSave, onCancel, isLoading }) => {
  const [newItem, setNewItem] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(newItem);
  };

  return (
    <>
      <DialogTitle>{item._id ? 'Edit Item' : 'Add New Book'}</DialogTitle>
      <DialogContent>
        <TextField
          name="title"
          label="Title"
          value={newItem.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Enter the Title"
        />
        <TextField
          name="author"
          label="Author"
          value={newItem.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="year"
          label="Year"
          value={newItem.year}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions style={{ marginRight: '10px' }}>
        <Button disabled={isLoading} onClick={handleSubmit} color="primary">
          {isLoading ? <CircularProgress size={24} /> : 'Save'}
        </Button>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default TodoForm;
