import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog } from '@mui/material';
import TodoItem from './todoItem';
import TodoForm from './todoForm';
import { useAuth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchItems();
    }
  }, [token]);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:4000/data/');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditPopupOpen(true);
  };

  const handleDelete = async (uniqueId) => {
    try {
      await axios.delete(`http://localhost:4000/data/delete/${uniqueId}`);
      setItems(items.filter((item) => item._id !== uniqueId));
    } catch (error) {
      console.error('Error deleting item:', error);
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
        ? `http://localhost:4000/data/update/${item._id}`
        : 'http://localhost:4000/data/add';
      await axios[selectedItem ? 'put' : 'post'](url, item);
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
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
    <div className="container mx-auto p-4">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TodoItem key={item._id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <CircularProgress size={30} />
        </div>
      )}
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add New Books
      </Button>

      <Dialog open={isEditPopupOpen || selectedItem !== null} onClose={handleCancel}>
        <TodoForm item={selectedItem || { title: '', author: '', year: '' }} onSave={handleSave} onCancel={handleCancel} isLoading={isLoading} />
      </Dialog>
    </div>
  );
};

export default TodoList;
