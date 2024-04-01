import React from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TodoItem = ({ item, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.author}</TableCell>
      <TableCell>{item.year}</TableCell>
      <TableCell>
        <Button onClick={() => onEdit(item)}>
          <FaEdit />
        </Button>
        <Button onClick={() => onDelete(item._id)}>
          <FaTrash />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TodoItem;
