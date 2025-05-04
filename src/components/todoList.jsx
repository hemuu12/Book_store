import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  Skeleton,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import TodoItem from './todoItem';
import TodoForm from './todoForm';
import { useAuth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchItems();
    }
  }, [token,navigate]);

  const fetchItems = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/book`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to fetch books');
    } finally {
      setIsFetching(false);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditPopupOpen(true);
  };

  const handleDelete = async (uniqueId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/book/delete/${uniqueId}`);
      setItems(items.filter((item) => item._id !== uniqueId));
      toast.success('Book deleted');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete book');
    }
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setIsEditPopupOpen(true);
  };

  const handleSave = async (item) => {
    try {
      setIsLoading(true);
      const url = selectedItem
        ? `${process.env.REACT_APP_BASE_URL}/book/update/${item._id}`
        : `${process.env.REACT_APP_BASE_URL}/book/add`;
      await axios[selectedItem ? 'put' : 'post'](url, item);
      toast.success(`Book ${selectedItem ? 'updated' : 'added'}`);
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
      toast.error(`Failed to ${selectedItem ? 'update' : 'add'} book`);
    } finally {
      setIsEditPopupOpen(false);
      setSelectedItem(null);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setIsEditPopupOpen(false);
  };

  return (
    <Box className="container" sx={{ mx: 'auto', p: 4, maxWidth: 1000 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Books List</Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Author</strong></TableCell>
                <TableCell><strong>Year</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {isFetching
    ? [...Array(5)].map((_, i) => (
        <TableRow key={i}>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="rectangular" height={36} /></TableCell>
        </TableRow>
      ))
    : items.length === 0 ? (
        <TableRow>
          <TableCell colSpan={4} align="center">
            <Typography variant="body1" color="text.secondary">
              No books available.
            </Typography>
          </TableCell>
        </TableRow>
      ) : (
        items.map((item) => (
          <TodoItem key={item._id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
        ))
      )}
</TableBody>
          </Table>
        </TableContainer>
        {isLoading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress size={30} />
          </Box>
        )}
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            sx={{ textTransform: 'none', boxShadow: 3 }}
          >
            Add New Book
          </Button>
        </Box>
      </Paper>

      <Dialog open={isEditPopupOpen || selectedItem !== null} onClose={handleCancel} maxWidth="sm" fullWidth>
        <TodoForm
          item={selectedItem || { title: '', author: '', year: '' }}
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </Dialog>
    </Box>
  );
};

export default TodoList;