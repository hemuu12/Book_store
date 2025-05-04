import React from 'react';
import { TableCell, TableRow, IconButton, Tooltip } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TodoItem = ({ item, onEdit, onDelete }) => {
  return (
    <TableRow hover sx={{ transition: '0.2s' }}>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.author}</TableCell>
      <TableCell>{item.year}</TableCell>
      <TableCell>
        <Tooltip title="Edit">
          <IconButton
            color="primary"
            onClick={() => onEdit(item)}
            size="small"
            sx={{ mr: 1 }}
          >
            <FaEdit size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => onDelete(item._id)}
            size="small"
          >
            <FaTrash size={16} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default TodoItem;
