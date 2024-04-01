import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TodoList from '../components/todoList'
import RegisterForm from '../auth/signup'
import Login from '../auth/login'

const Allroutes = () => {
  return (
    <>
        <Routes>
            <Route path="/dashboard" element={<TodoList />}></Route>
            <Route path="/signup" element={<RegisterForm />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
    
    </>
  )
}

export default Allroutes